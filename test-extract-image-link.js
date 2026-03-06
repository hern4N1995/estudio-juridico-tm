/**
 * Script para probar extracción de imágenes de un URL
 * Prueba el Open Graph metadata
 */

const https = require('https');
const http = require('http');
const { URL } = require('url');

async function extractImageFromUrl(urlString) {
  return new Promise((resolve, reject) => {
    try {
      const url = new URL(urlString);
      const protocol = url.protocol === 'https:' ? https : http;

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        timeout: 10000
      };

      const req = protocol.request(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
          // Limitar a 500KB para evitar descargar la página completa
          if (data.length > 500000) {
            req.abort();
          }
        });

        res.on('end', () => {
          try {
            // Buscar Open Graph meta tags
            const ogImageMatch = data.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
            const twitterImageMatch = data.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
            const imageMatch = data.match(/<img[^>]+src=["']([^"']+)["']/i);

            const results = {
              url: urlString,
              ogImage: ogImageMatch ? ogImageMatch[1] : null,
              twitterImage: twitterImageMatch ? twitterImageMatch[1] : null,
              firstImage: imageMatch ? imageMatch[1] : null,
              selectedImage: null
            };

            // Prioridad: og:image > twitter:image > primera imagen
            results.selectedImage = results.ogImage || results.twitterImage || results.firstImage;

            resolve(results);
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('timeout', () => {
        req.abort();
        reject(new Error('Request timeout'));
      });

      req.on('error', (error) => {
        reject(error);
      });

    } catch (error) {
      reject(error);
    }
  });
}

// Prueba con el link proporcionado
const testUrl = 'https://www.radiosudamericana.com/nota/politica/341407-El-Concejo-Deliberante-realizo-su-primera-sesion-ordinaria-del-2026.htm';

console.log('🔍 Extrayendo imagen de:', testUrl);
console.log('━'.repeat(80));

extractImageFromUrl(testUrl)
  .then((result) => {
    console.log('\n✅ RESULTADOS:\n');
    console.log('📌 Open Graph Image (og:image):', result.ogImage || '❌ No encontrado');
    console.log('🐦 Twitter Image (twitter:image):', result.twitterImage || '❌ No encontrado');
    console.log('🖼️  Primera imagen (<img>):', result.firstImage || '❌ No encontrado');
    console.log('\n🎯 IMAGEN SELECCIONADA:', result.selectedImage || '❌ No se encontró imagen');
    console.log('\n━'.repeat(80));
    console.log('\n💡 Detalles técnicos:');
    console.log('- Se busca primero en Open Graph metadata (og:image)');
    console.log('- Si no existe, busca en Twitter Card metadata');
    console.log('- Si no existe, usa la primera imagen encontrada en el HTML');
    console.log('- Esto asegura obtener la imagen más relevante del artículo');
  })
  .catch((error) => {
    console.error('❌ Error:', error.message);
  });

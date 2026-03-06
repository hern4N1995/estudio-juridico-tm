/**
 * Utilidad para extraer imágenes de URLs usando Open Graph metadata
 */

import https from 'https';
import http from 'http';
import { URL } from 'url';

// Función para decodificar entidades HTML
function decodeHtmlEntities(text: string): string {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&apos;': "'",
  };

  let decoded = text;
  for (const [entity, char] of Object.entries(entities)) {
    decoded = decoded.replace(new RegExp(entity, 'g'), char);
  }
  return decoded;
}

export async function extractImageFromUrl(urlString: string): Promise<string | null> {
  return new Promise((resolve) => {
    try {
      const url = new URL(urlString);
      const protocol = url.protocol === 'https:' ? https : http;

      const options = {
        hostname: url.hostname,
        path: url.pathname + url.search,
        method: 'GET',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        timeout: 15000,
      };

      const req = protocol.request(options, (res) => {
        let data = '';
        let size = 0;
        const maxSize = 1000000; // 1MB max

        res.on('data', (chunk) => {
          size += chunk.length;
          if (size > maxSize) {
            req.abort();
            return;
          }
          data += chunk;
        });        res.on('end', () => {
          try {
            console.log(`[extract-image] Procesando ${urlString}, tamaño: ${data.length} bytes`);

            // Primero intenta con og:image (Open Graph) - variante 1
            let match = data.match(/<meta\s+property=["']og:image["']\s+(?:itemProp="image"\s+)?content=["']([^"']+)["']/i);
            if (match && match[1]) {
              const imageUrl = decodeHtmlEntities(match[1].trim());
              if (imageUrl && imageUrl.length > 10) {
                console.log(`[extract-image] ✓ og:image encontrado: ${imageUrl}`);
                resolve(imageUrl);
                return;
              }
            }

            // Intenta variante con content primero
            match = data.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
            if (match && match[1]) {
              const imageUrl = decodeHtmlEntities(match[1].trim());
              if (imageUrl && imageUrl.length > 10) {
                console.log(`[extract-image] ✓ og:image (content primero) encontrado: ${imageUrl}`);
                resolve(imageUrl);
                return;
              }
            }

            // Buscar twitter:image - variante 1
            match = data.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
            if (match && match[1]) {
              const imageUrl = decodeHtmlEntities(match[1].trim());
              if (imageUrl && imageUrl.length > 10) {
                console.log(`[extract-image] ✓ twitter:image encontrado: ${imageUrl}`);
                resolve(imageUrl);
                return;
              }
            }

            // Variante twitter:image - content primero
            match = data.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
            if (match && match[1]) {
              const imageUrl = decodeHtmlEntities(match[1].trim());
              if (imageUrl && imageUrl.length > 10) {
                console.log(`[extract-image] ✓ twitter:image (content primero) encontrado: ${imageUrl}`);
                resolve(imageUrl);
                return;
              }
            }

            // Buscar image:src (algunas plataformas usan esto)
            match = data.match(/<meta\s+property=["']image:src["']\s+content=["']([^"']+)["']/i);
            if (match && match[1]) {
              const imageUrl = decodeHtmlEntities(match[1].trim());
              if (imageUrl && imageUrl.length > 10) {
                console.log(`[extract-image] ✓ image:src encontrado: ${imageUrl}`);
                resolve(imageUrl);
                return;
              }
            }            // Buscar la primera imagen importante (no favicon, no logo pequeño)
            const imgMatches = data.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
            if (imgMatches && imgMatches.length > 0) {
              for (const imgTag of imgMatches) {
                const srcMatch = imgTag.match(/src=["']([^"']+)["']/i);
                if (srcMatch && srcMatch[1]) {
                  const imgUrl = decodeHtmlEntities(srcMatch[1].trim());
                  // Evitar favicons y logos pequeños
                  if (!imgUrl.includes('favicon') && !imgUrl.includes('logo') && imgUrl.length > 20) {
                    console.log(`[extract-image] ✓ primera imagen encontrada: ${imgUrl}`);
                    resolve(imgUrl);
                    return;
                  }
                }
              }
            }

            console.log(`[extract-image] ✗ No se encontró imagen en: ${urlString}`);
            resolve(null);
          } catch (error) {
            console.error('[extract-image] Error parsing HTML:', error);
            resolve(null);
          }
        });
      });

      req.on('timeout', () => {
        console.warn(`[extract-image] ✗ Timeout al obtener: ${urlString}`);
        req.abort();
        resolve(null);
      });

      req.on('error', (error) => {
        console.error(`[extract-image] ✗ Error de conexión: ${error.message}`);
        resolve(null);
      });

      req.end();
    } catch (error) {
      console.error('[extract-image] Error en extractImageFromUrl:', error);
      resolve(null);
    }
  });
}

const https = require('https');
const { URL } = require('url');

const url = 'https://www.infobae.com/politica/2026/03/06/el-gobierno-reacomoda-su-esquema-de-poder-el-rol-de-karina-milei-y-el-impacto-en-el-gabinete/';
const urlObj = new URL(url);

const options = {
  hostname: urlObj.hostname,
  path: urlObj.pathname + urlObj.search,
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
  },
  timeout: 10000
};

console.log('[TEST] Conectando a:', url);

const req = https.request(options, (res) => {
  let data = '';
  
  res.on('data', chunk => { 
    data += chunk; 
  });
  
  res.on('end', () => {
    console.log('\n=== RESULTADOS ===');
    console.log('Tamaño HTML:', data.length, 'bytes');
    
    // Test 1: og:image estándar
    let match = data.match(/<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']/i);
    console.log('\n[1] og:image (property primero):', match ? match[1] : 'NO ENCONTRADO');
    
    // Test 2: og:image variante
    match = data.match(/<meta\s+content=["']([^"']+)["']\s+property=["']og:image["']/i);
    console.log('[2] og:image (content primero):', match ? match[1] : 'NO ENCONTRADO');
    
    // Test 3: twitter:image
    match = data.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    console.log('[3] twitter:image (name primero):', match ? match[1] : 'NO ENCONTRADO');
    
    // Test 4: twitter:image variante
    match = data.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
    console.log('[4] twitter:image (content primero):', match ? match[1] : 'NO ENCONTRADO');
    
    // Test 5: Buscar todas las meta tags de imagen
    const allMetaTags = data.match(/<meta[^>]*>/gi) || [];
    const imageMetas = allMetaTags.filter(tag => 
      /og:image|twitter:image|image:src|image\[/i.test(tag)
    );
    
    console.log('\n[5] Meta tags relacionados a imágenes encontrados:', imageMetas.length);
    imageMetas.slice(0, 5).forEach((tag, i) => {
      console.log(`    ${i+1}. ${tag.substring(0, 150)}`);
    });
    
    // Test 6: Buscar img tags
    const imgTags = data.match(/<img[^>]+src=["']([^"']+)["']/gi) || [];
    console.log('\n[6] Etiquetas <img> encontradas:', imgTags.length);
    imgTags.slice(0, 5).forEach((tag, i) => {
      console.log(`    ${i+1}. ${tag.substring(0, 150)}`);
    });
    
    // Test 7: Buscar patrones de imagen en atributos
    const srcSetMatches = data.match(/srcset=[^>]*\n/gi) || [];
    console.log('\n[7] srcset atributos encontrados:', srcSetMatches.length);
    
    // Test 8: Buscar URLs de imagen en general
    const imageUrls = data.match(/https?:\/\/[^"\s>]*\.(?:jpg|jpeg|png|gif|webp)/gi) || [];
    console.log('\n[8] URLs de imagen encontradas:', imageUrls.length);
    imageUrls.slice(0, 5).forEach((url, i) => {
      console.log(`    ${i+1}. ${url}`);
    });
  });
});

req.on('error', (e) => {
  console.error('[ERROR]', e.message);
});

req.on('timeout', () => {
  console.error('[TIMEOUT] Conexión expirada');
  req.abort();
});

req.end();

const https = require('https');

// Función para decodificar entidades HTML
function decodeHtmlEntities(text) {
  const entities = {
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

const url = 'https://www.infobae.com/politica/2026/03/06/el-gobierno-reacomoda-su-esquema-de-poder-el-rol-de-karina-milei-y-el-impacto-en-el-gabinete/';

console.log('[TEST] Conectando a:', url.substring(0, 100) + '...\n');

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let data = '';

  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    console.log('=== RESULTADOS CON FIX ===\n');

    // Test 1: og:image
    let match = data.match(/<meta\s+property=["']og:image["']\s+(?:itemProp="image"\s+)?content=["']([^"']+)["']/i);
    if (match && match[1]) {
      const raw = match[1];
      const decoded = decodeHtmlEntities(raw);
      console.log('[1] og:image ENCONTRADO');
      console.log('    Raw:', raw.substring(0, 80) + '...');
      console.log('    Decoded:', decoded.substring(0, 80) + '...\n');
    } else {
      console.log('[1] og:image: NO encontrado\n');
    }

    // Test 2: twitter:image (name primero)
    match = data.match(/<meta\s+name=["']twitter:image["']\s+content=["']([^"']+)["']/i);
    if (match && match[1]) {
      const raw = match[1];
      const decoded = decodeHtmlEntities(raw);
      console.log('[2] twitter:image (name primero) ENCONTRADO');
      console.log('    Raw:', raw.substring(0, 80) + '...');
      console.log('    Decoded:', decoded.substring(0, 80) + '...');
      console.log('    URL válida:', decoded.startsWith('https') && decoded.length > 10 ? '✓' : '✗');
      console.log();
    } else {
      console.log('[2] twitter:image: NO encontrado\n');
    }

    // Test 3: twitter:image (content primero)
    match = data.match(/<meta\s+content=["']([^"']+)["']\s+name=["']twitter:image["']/i);
    if (match && match[1]) {
      const raw = match[1];
      const decoded = decodeHtmlEntities(raw);
      console.log('[3] twitter:image (content primero) ENCONTRADO');
      console.log('    Raw:', raw.substring(0, 80) + '...');
      console.log('    Decoded:', decoded.substring(0, 80) + '...\n');
    } else {
      console.log('[3] twitter:image (content primero): NO encontrado\n');
    }
  });
}).on('error', err => {
  console.error('Error:', err.message);
});

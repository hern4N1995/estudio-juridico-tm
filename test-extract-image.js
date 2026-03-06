const cheerio = require('cheerio');
const fetch = require('node-fetch');

async function extractImageFromArticle(url) {
  try {
    console.log(`\n📰 Extrayendo imagen de: ${url}\n`);
    
    const response = await fetch(url);
    const html = await response.text();
    
    const $ = cheerio.load(html);
    
    // Buscar diferentes tipos de imágenes (en orden de preferencia)
    let imageUrl = null;
    
    // 1. Meta Open Graph Image (og:image)
    imageUrl = $('meta[property="og:image"]').attr('content');
    if (imageUrl) {
      console.log('✅ Imagen encontrada en og:image (Open Graph)');
      console.log(`   URL: ${imageUrl}\n`);
      return imageUrl;
    }
    
    // 2. Meta Twitter Image
    imageUrl = $('meta[name="twitter:image"]').attr('content');
    if (imageUrl) {
      console.log('✅ Imagen encontrada en twitter:image');
      console.log(`   URL: ${imageUrl}\n`);
      return imageUrl;
    }
    
    // 3. Meta Image
    imageUrl = $('meta[name="image"]').attr('content');
    if (imageUrl) {
      console.log('✅ Imagen encontrada en meta image');
      console.log(`   URL: ${imageUrl}\n`);
      return imageUrl;
    }
    
    // 4. Primera imagen en el artículo (article/post)
    imageUrl = $('article img, .article img, .post img, .content img').first().attr('src');
    if (imageUrl) {
      console.log('✅ Imagen encontrada en el contenido del artículo');
      console.log(`   URL: ${imageUrl}\n`);
      return imageUrl;
    }
    
    // 5. Primera imagen general
    imageUrl = $('img').first().attr('src');
    if (imageUrl) {
      console.log('✅ Imagen encontrada (primera imagen de la página)');
      console.log(`   URL: ${imageUrl}\n`);
      return imageUrl;
    }
    
    console.log('❌ No se encontró imagen en la página');
    return null;
    
  } catch (error) {
    console.error('❌ Error al extraer imagen:', error.message);
    return null;
  }
}

// Prueba con el link proporcionado
const testUrl = 'https://www.radiosudamericana.com/nota/politica/341407-El-Concejo-Deliberante-realizo-su-primera-sesion-ordinaria-del-2026.htm';

extractImageFromArticle(testUrl).then(image => {
  if (image) {
    console.log('🎯 Resultado: Se puede usar esta imagen automáticamente');
  } else {
    console.log('🎯 Resultado: Será necesario que el usuario proporcione una imagen manualmente');
  }
});

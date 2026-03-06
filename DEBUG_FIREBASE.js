/**
 * Script para debuggear y diagnosticar problemas con Firebase
 * Ejecutar en la consola del navegador (F12 → Console)
 */

// 1. Verificar si Firebase está conectado
console.log('=== VERIFICACIÓN DE FIREBASE ===');

if (typeof firebase === 'undefined') {
  console.error('❌ Firebase NO está cargado');
} else {
  console.log('✅ Firebase está cargado');
}

// 2. Verificar autenticación
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log('✅ Usuario autenticado:', user.email);
  } else {
    console.log('⚠️ Usuario NO autenticado');
  }
});

// 3. Verificar testimonios
console.log('\n=== VERIFICACIÓN DE TESTIMONIOS ===');
firebase.database().ref('testimonios').once('value')
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log('✅ Testimonios encontrados:', snapshot.val());
    } else {
      console.log('⚠️ NO hay testimonios en la base de datos');
    }
  })
  .catch((error) => {
    console.error('❌ Error al leer testimonios:', error.message);
  });

// 4. Verificar noticias
console.log('\n=== VERIFICACIÓN DE NOTICIAS ===');
firebase.database().ref('noticias').once('value')
  .then((snapshot) => {
    if (snapshot.exists()) {
      console.log('✅ Noticias encontradas:', snapshot.val());
    } else {
      console.log('⚠️ NO hay noticias en la base de datos');
    }
  })
  .catch((error) => {
    console.error('❌ Error al leer noticias:', error.message);
  });

// 5. Verificar toda la base de datos
console.log('\n=== CONTENIDO COMPLETO DE BASE DE DATOS ===');
firebase.database().ref().once('value')
  .then((snapshot) => {
    console.log('Base de datos completa:', snapshot.val());
  })
  .catch((error) => {
    console.error('❌ Error al leer base de datos:', error.message);
  });

// 6. Función para agregar un testimonio de prueba
window.agregarTestimonioTest = function() {
  const testimonioTest = {
    id: 'test-' + Date.now(),
    usuario: {
      id: 'test-user',
      email: 'test@ejemplo.com',
      displayName: 'Usuario Test',
      photoURL: null,
      provider: 'google',
      createdAt: new Date().toISOString()
    },
    contenido: 'Este es un testimonio de prueba',
    calificacion: 5,
    fecha: new Date().toLocaleDateString('es-AR'),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  firebase.database().ref('testimonios').child(testimonioTest.id).set(testimonioTest)
    .then(() => {
      console.log('✅ Testimonio de prueba agregado exitosamente');
      location.reload();
    })
    .catch((error) => {
      console.error('❌ Error al agregar testimonio:', error.message);
    });
};

console.log('\n💡 Ejecuta esto para agregar un testimonio de prueba:');
console.log('agregarTestimonioTest()');

// 7. Monitoreo en tiempo real
console.log('\n=== MONITOREO EN TIEMPO REAL ===');
firebase.database().ref('testimonios').on('value', (snapshot) => {
  console.log('Testimonios actualizados:', snapshot.val());
});

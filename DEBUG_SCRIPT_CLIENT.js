/**
 * FIREBASE DIAGNOSTICS SCRIPT
 * 
 * Copia y pega este código en la consola del navegador (F12 > Console)
 * para diagnosticar problemas con Firebase
 * 
 * Verifica:
 * 1. Conexión a Firebase
 * 2. Disponibilidad de datos
 * 3. Errores de acceso
 * 4. Estructura de datos en la consola
 */

(async function firebaseDiagnostics() {
  const log = (title, data) => {
    console.log(`%c${title}`, 'color: #4CAF50; font-weight: bold; font-size: 14px;');
    console.log(data);
  };

  const error = (title, data) => {
    console.error(`%c${title}`, 'color: #F44336; font-weight: bold; font-size: 14px;');
    console.error(data);
  };

  try {
    log('🔍 INICIANDO DIAGNOSTICO DE FIREBASE', '');

    // 1. Check API endpoint
    log('1️⃣  Verificando endpoint de debug del servidor...', '');
    const apiResponse = await fetch('/api/debug-firebase');
    const apiData = await apiResponse.json();

    if (apiResponse.ok) {
      log('✅ Servidor respondiendo correctamente', apiData);
    } else {
      log('⚠️  Respuesta parcial del servidor', apiData);
    }

    // 2. Check client-side Firebase connection
    log('2️⃣  Verificando conexión de Firebase en el cliente...', '');

    // Obtener referencias a Firebase globales
    if (window.firebase) {
      log('✅ Firebase SDK disponible', {
        version: window.firebase.SDK_VERSION,
        apps: window.firebase.apps?.length || 0,
      });

      // Intentar acceder a la base de datos
      const db = window.firebase.database?.();
      if (db) {
        log('✅ Firebase Realtime Database disponible', {
          refPath: db.ref().toString(),
        });
      }
    } else {
      error('❌ Firebase SDK no disponible en window', 'Verifica que Firebase esté correctamente inicializado');
    }

    // 3. Check testimonios endpoint directly
    log('3️⃣  Cargando testimonios directamente...', '');
    try {
      const testResponse = await fetch('/api/testimonios');
      if (testResponse.ok) {
        const testimonios = await testResponse.json();
        log(`✅ Testimonios cargados (${testimonios.length} items)`, testimonios);
      } else {
        error('❌ Error al cargar testimonios', {
          status: testResponse.status,
          statusText: testResponse.statusText,
        });
      }
    } catch (e) {
      error('❌ No se pudo conectar al endpoint de testimonios', e.message);
    }

    // 4. Check noticias endpoint
    log('4️⃣  Cargando noticias directamente...', '');
    try {
      const newsResponse = await fetch('/api/noticias');
      if (newsResponse.ok) {
        const noticias = await newsResponse.json();
        log(`✅ Noticias cargadas (${noticias.length} items)`, noticias);
      } else {
        error('❌ Error al cargar noticias', {
          status: newsResponse.status,
          statusText: newsResponse.statusText,
        });
      }
    } catch (e) {
      error('❌ No se pudo conectar al endpoint de noticias', e.message);
    }

    // 5. Summary
    log('📊 RESUMEN DEL DIAGNOSTICO', {
      apiEndpoint: apiResponse.ok ? '✅ Working' : '⚠️ Issue',
      serverData: {
        testimonios: apiData.data?.testimonios?.count || 0,
        noticias: apiData.data?.noticias?.count || 0,
      },
      environment: apiData.environment,
      timestamp: apiData.timestamp,
      errors: apiData.errors || [],
      recommendation: apiData.recommendation,
    });

  } catch (err) {
    error('❌ ERROR EN DIAGNOSTICO', err);
  }

  console.log('%c=== FIN DEL DIAGNOSTICO ===', 'color: #2196F3; font-weight: bold; font-size: 14px;');
})();

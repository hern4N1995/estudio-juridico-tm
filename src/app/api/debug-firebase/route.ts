import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get, query, orderByChild, limitToLast } from 'firebase/database';

/**
 * DEBUG ENDPOINT - Diagnosticar problemas de Firebase
 * GET /api/debug-firebase
 * 
 * Verifica:
 * 1. Conexión a Firebase
 * 2. Datos en la base de datos (testimonios y noticias)
 * 3. Reglas de acceso
 * 4. Estructura de datos
 */

export async function GET() {
  try {
    const diagnostics = {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      firebaseConfig: {
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
      },
      data: {
        testimonios: null as any,
        noticias: null as any,
      },
      errors: [] as string[],
    };

    try {
      // 1. Intentar leer testimonios
      const testimoniosRef = ref(database, 'testimonios');
      const testimoniosSnapshot = await get(testimoniosRef);
      
      diagnostics.data.testimonios = {
        exists: testimoniosSnapshot.exists(),
        count: testimoniosSnapshot.exists() 
          ? Object.keys(testimoniosSnapshot.val() || {}).length 
          : 0,
        sample: testimoniosSnapshot.exists() 
          ? Object.entries(testimoniosSnapshot.val() || {}).slice(0, 2)
          : null,
      };
    } catch (error: any) {
      diagnostics.errors.push(`Error reading testimonios: ${error.message}`);
      diagnostics.data.testimonios = { error: error.message };
    }

    try {
      // 2. Intentar leer noticias
      const noticiasRef = ref(database, 'noticias');
      const noticiasSnapshot = await get(noticiasRef);
      
      diagnostics.data.noticias = {
        exists: noticiasSnapshot.exists(),
        count: noticiasSnapshot.exists() 
          ? Object.keys(noticiasSnapshot.val() || {}).length 
          : 0,
        sample: noticiasSnapshot.exists() 
          ? Object.entries(noticiasSnapshot.val() || {}).slice(0, 2)
          : null,
      };
    } catch (error: any) {
      diagnostics.errors.push(`Error reading noticias: ${error.message}`);
      diagnostics.data.noticias = { error: error.message };
    }

    // 3. Verificar si hay datos pero están vacíos
    if (
      diagnostics.data.testimonios?.count === 0 &&
      diagnostics.data.noticias?.count === 0
    ) {
      diagnostics.errors.push(
        'NO DATA: Both testimonios and noticias are empty. Check if data was properly saved to Firebase.'
      );
    }

    // 4. Status general
    const hasErrors = diagnostics.errors.length > 0;
    const hasData = 
      (diagnostics.data.testimonios?.count ?? 0) > 0 || 
      (diagnostics.data.noticias?.count ?? 0) > 0;

    return NextResponse.json(
      {
        status: hasData && !hasErrors ? 'OK' : 'ISSUE_DETECTED',
        ...diagnostics,
        recommendation: getRecommendation(diagnostics, hasData, hasErrors),
      },
      { status: hasData && !hasErrors ? 200 : 206 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'ERROR',
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}

function getRecommendation(diagnostics: any, hasData: boolean, hasErrors: boolean): string {
  if (!hasData) {
    return 'URGENT: No data found in Firebase. Check:\n1. Data was saved to the correct database\n2. Firebase Rules allow .read access\n3. Use Firebase Console to verify data exists';
  }

  if (hasErrors && hasData) {
    return 'PARTIAL: Some data loaded but errors occurred. Check Firebase Rules and ensure all required fields are present.';
  }

  if (hasErrors) {
    return 'WARNINGS: Some issues detected. Review the errors array above.';
  }

  return 'OK: Firebase connection and data access working correctly.';
}

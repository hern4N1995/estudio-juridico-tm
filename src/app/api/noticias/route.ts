import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

/**
 * GET /api/noticias
 * 
 * Endpoint público para obtener noticias desde el servidor
 * Evita problemas de CORS y autenticación del lado del cliente
 */

export async function GET() {
  try {
    const noticiasRef = ref(database, 'noticias');
    const snapshot = await get(noticiasRef);

    if (!snapshot.exists()) {
      return NextResponse.json([], { status: 200 });
    }

    const noticias: any[] = [];
    snapshot.forEach((child) => {
      noticias.push(child.val());
    });

    // Ordenar por createdAt descendente (más recientes primero)
    noticias.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(noticias, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    console.error('Error fetching noticias:', error);
    return NextResponse.json(
      { error: 'Failed to fetch noticias', details: error.message },
      { status: 500 }
    );
  }
}

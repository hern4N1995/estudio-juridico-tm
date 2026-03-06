import { NextResponse } from 'next/server';
import { database } from '@/lib/firebase';
import { ref, get } from 'firebase/database';

/**
 * GET /api/testimonios
 * 
 * Endpoint público para obtener testimonios desde el servidor
 * Evita problemas de CORS y autenticación del lado del cliente
 */

export async function GET() {
  try {
    const testimoniosRef = ref(database, 'testimonios');
    const snapshot = await get(testimoniosRef);

    if (!snapshot.exists()) {
      return NextResponse.json([], { status: 200 });
    }

    const testimonios: any[] = [];
    snapshot.forEach((child) => {
      testimonios.push(child.val());
    });

    // Ordenar por createdAt descendente (más recientes primero)
    testimonios.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(testimonios, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
      },
    });
  } catch (error: any) {
    console.error('Error fetching testimonios:', error);
    return NextResponse.json(
      { error: 'Failed to fetch testimonios', details: error.message },
      { status: 500 }
    );
  }
}

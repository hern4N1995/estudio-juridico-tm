import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Esta es una respuesta de ejemplo - en producción conectaría a Firebase
    return NextResponse.json({
      status: 'ok',
      message: 'Firebase backend is configured. Use Firebase SDK for direct operations.',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

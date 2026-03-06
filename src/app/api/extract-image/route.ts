/**
 * POST /api/extract-image
 * 
 * Endpoint para extraer la imagen de un URL
 * Usado cuando se agrega una noticia con link referido
 * 
 * Request body:
 * {
 *   "url": "https://ejemplo.com/articulo"
 * }
 * 
 * Response:
 * {
 *   "imageUrl": "https://ejemplo.com/imagen.jpg" | null,
 *   "success": boolean
 * }
 */

import { NextResponse } from 'next/server';
import { extractImageFromUrl } from '@/lib/extract-image';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== 'string') {
      return NextResponse.json(
        { error: 'URL is required and must be a string', imageUrl: null, success: false },
        { status: 400 }
      );
    }

    // Validar que es un URL válido
    try {
      new URL(url);
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format', imageUrl: null, success: false },
        { status: 400 }
      );
    }

    console.log(`[API extract-image] Solicitud para extraer imagen de: ${url}`);

    // Timeout de 12 segundos para la extracción
    const extractionPromise = extractImageFromUrl(url);
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => {
        console.warn(`[API extract-image] ⏱️ Timeout extrayendo imagen (>12s)`);
        resolve(null);
      }, 12000);
    });

    const imageUrl = await Promise.race([extractionPromise, timeoutPromise]);

    if (!imageUrl) {
      console.log(`[API extract-image] ❌ No se encontró imagen en: ${url}`);
      return NextResponse.json(
        { imageUrl: null, success: false, message: 'No image found in URL' },
        { status: 200 }
      );
    }

    console.log(`[API extract-image] ✅ Imagen extraída con éxito: ${imageUrl}`);

    return NextResponse.json(
      {
        imageUrl,
        success: true,
        message: 'Image extracted successfully',
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('[API extract-image] ❌ Error:', error);
    return NextResponse.json(
      { error: 'Failed to extract image', imageUrl: null, success: false, details: error.message },
      { status: 500 }
    );
  }
}

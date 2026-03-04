'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Star, X } from 'lucide-react';
import { User, Testimonio } from '@/lib/types';

interface TestimonialFormProps {
  user: User | null;
  onSubmit: (contenido: string, calificacion: number) => Promise<void>;
  onCancel: () => void;
  initialTestimonio?: Testimonio | null;
  isEditing?: boolean;
}

export function TestimonialForm({
  user,
  onSubmit,
  onCancel,
  initialTestimonio,
  isEditing = false,
}: TestimonialFormProps) {  const [contenido, setContenido] = useState('');
  const [calificacion, setCalificacion] = useState(5);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Cargar datos iniciales si está editando
  useEffect(() => {
    if (isEditing && initialTestimonio) {
      setContenido(initialTestimonio.contenido);
      setCalificacion(initialTestimonio.calificacion);
    }
  }, [isEditing, initialTestimonio]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
      if (!contenido.trim()) {
      setError('Por favor escribe tu comentario');
      return;
    }

    if (!user) {
      setError('Debes iniciar sesión para comentar');
      return;
    }

    setLoading(true);
    try {
      await onSubmit(contenido, calificacion);
      setContenido('');
      setCalificacion(5);
      setError('');
    } catch (err) {
      setError('Error al enviar el comentario. Intenta de nuevo.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Card className="border-border bg-background">
      <CardContent className="p-6">        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">
            {isEditing ? 'Edita tu comentario' : 'Comparte tu comentario'}
          </h3>
          <button
            onClick={onCancel}
            className="text-foreground/50 hover:text-foreground transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Calificación
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setCalificacion(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-6 w-6 ${
                      star <= calificacion
                        ? 'fill-primary text-primary'
                        : 'text-foreground/30'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Tu comentario
            </label>
            <textarea
              value={contenido}
              onChange={(e) => setContenido(e.target.value)}
              placeholder="Cuéntanos tu experiencia con nuestros servicios..."
              className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={4}
            />
            <p className="text-xs text-foreground/50 mt-1">
              {contenido.length}/500 caracteres
            </p>
          </div>

          {error && (
            <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
            >
              Cancelar
            </Button>            <Button
              type="submit"
              disabled={loading || !contenido.trim()}
            >
              {loading ? 'Guardando...' : isEditing ? 'Actualizar comentario' : 'Enviar comentario'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Star, X, Trash2, Eye, EyeOff } from 'lucide-react';
import { Testimonio } from '@/lib/types';
import { deleteTestimonio, updateTestimonio } from '@/lib/firebase-db';
import { useToast } from '@/hooks/use-toast';

interface TestimonialsCarouselProps {
  testimonios: Testimonio[];
  userTestimonio: Testimonio | null;
  user: any;
  isAdmin?: boolean;
  onDelete?: (id: string) => Promise<void>;
}

export function TestimonialsCarousel({
  testimonios,
  userTestimonio,
  user,
  isAdmin = false,
  onDelete,
}: TestimonialsCarouselProps) {
  const [showModal, setShowModal] = useState(false);
  const { toast: carouselToast } = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteTestimonio = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar este comentario?")) return;
    
    setIsDeleting(true);
    try {
      await deleteTestimonio(id);
      carouselToast({
        title: "Éxito",
        description: "Comentario eliminado exitosamente",
      });
      if (onDelete) {
        await onDelete(id);
      }
    } catch (error) {
      console.error("Error deleting testimonio:", error);
      carouselToast({
        title: "Error",
        description: "Error al eliminar comentario",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  // Filtrar testimonios (excluir el del usuario actual)
  const filteredTestimonios = testimonios.filter(
    (testimonio) => !user || testimonio.usuario.id !== user.id
  );

  // Mostrar solo 4
  const displayedTestimonios = filteredTestimonios.slice(0, 4);

  if (filteredTestimonios.length === 0) {
    return null;
  }

  return (
    <div className="w-full">      {/* Grid de 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-4">
        {displayedTestimonios.map((testimonio) => (
          <Card
            key={testimonio.id}
            className="flex flex-col justify-between border-[#D4AF37]/20 bg-background hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg"
          >
            <CardContent className="p-6">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonio.calificacion
                        ? 'fill-primary text-primary'
                        : 'text-foreground/20'
                    }`}
                  />
                ))}
              </div>
              <Quote className="h-6 w-6 text-primary mb-2" />
              <p className="mt-3 text-foreground line-clamp-3">
                {testimonio.contenido}
              </p>
            </CardContent>
            <div className="flex items-center gap-3 border-t border-[#D4AF37]/20 p-6">
              {testimonio.usuario.photoURL ? (
                <img
                  src={testimonio.usuario.photoURL}
                  alt={testimonio.usuario.displayName}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary">
                  {testimonio.usuario.displayName.charAt(0).toUpperCase()}
                </div>
              )}
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">
                  {testimonio.usuario.displayName}
                </p>
                <p className="text-xs text-foreground/50">{testimonio.fecha}</p>
              </div>              {isAdmin && (
                <button
                  onClick={() => handleDeleteTestimonio(testimonio.id)}
                  disabled={isDeleting}
                  className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                  title="Eliminar comentario"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </Card>
        ))}
      </div>{/* Botón "Ver más" si hay más testimonios */}
      {filteredTestimonios.length > 4 && (
        <div className="flex justify-center mb-20">
          <Button
            variant="outline"
            onClick={() => setShowModal(true)}
            className="gap-2"
          >
            Ver todos los comentarios ({filteredTestimonios.length})
          </Button>
        </div>
      )}

      {/* Modal con todos los testimonios */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[80vh] flex flex-col border-[#D4AF37]/20 bg-card">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#D4AF37]/20 p-6">
              <h3 className="text-xl font-bold text-foreground">
                Todos los comentarios ({filteredTestimonios.length})
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="space-y-4 p-6">
                {filteredTestimonios.map((testimonio) => (
                  <Card
                    key={testimonio.id}
                    className="border-[#D4AF37]/20 bg-background p-4"
                  >
                    <div className="flex gap-4">
                      {/* Avatar */}
                      {testimonio.usuario.photoURL ? (
                        <img
                          src={testimonio.usuario.photoURL}
                          alt={testimonio.usuario.displayName}
                          className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                        />
                      ) : (
                        <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-sm font-semibold text-primary flex-shrink-0">
                          {testimonio.usuario.displayName.charAt(0).toUpperCase()}
                        </div>
                      )}                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="font-semibold text-foreground">
                              {testimonio.usuario.displayName}
                            </p>
                            <p className="text-xs text-foreground/50">
                              {testimonio.fecha}
                            </p>
                          </div>                          {isAdmin && (
                            <button
                              onClick={() => handleDeleteTestimonio(testimonio.id)}
                              disabled={isDeleting}
                              className="p-1 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50"
                              title="Eliminar comentario"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>

                        {/* Stars */}
                        <div className="flex gap-1 mt-2 mb-3">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < testimonio.calificacion
                                  ? 'fill-primary text-primary'
                                  : 'text-foreground/20'
                              }`}
                            />
                          ))}
                        </div>

                        {/* Text */}
                        <p className="text-sm text-foreground">
                          {testimonio.contenido}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, X, Trash2, Edit2 } from 'lucide-react';
import { Noticia } from '@/lib/types';

interface NewsGridProps {
  news: Noticia[];
  onEdit?: (noticia: Noticia) => void;
  onDelete?: (id: string) => void;
  isAdmin?: boolean;
}

export function NewsGrid({ news, onEdit, onDelete, isAdmin }: NewsGridProps) {
  const [showModal, setShowModal] = useState(false);

  if (news.length === 0) {
    return null;
  }

  // Mostrar solo 4 noticias
  const displayedNews = news.slice(0, 4);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Ayer';
    } else {
      return date.toLocaleDateString('es-AR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
  };
  const NewsCard = ({ newsItem }: { newsItem: Noticia }) => (
    <Card className="flex flex-col justify-between border-[#D4AF37]/20 bg-background hover:border-[#D4AF37]/50 transition-all duration-300 hover:shadow-lg">
      <div className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-foreground line-clamp-2 text-lg">
              {newsItem.titulo}
            </h3>
            <p className="text-xs text-foreground/70 mt-2">
              {formatDate(newsItem.createdAt)}
            </p>
          </div>

          <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">
            {newsItem.contenido}
          </p>
        </div>
      </div>

      {newsItem.imagen && (
        <div className="flex-shrink-0 border-t border-[#D4AF37]/20 p-6">
          <a
            href={
              newsItem.imagen.startsWith('http://') || newsItem.imagen.startsWith('https://')
                ? newsItem.imagen
                : `https://${newsItem.imagen}`
            }
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#D4AF37] hover:text-[#E5C158] font-semibold transition-colors text-sm"
          >
            Ver noticia
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {isAdmin && (
        <div className="flex-shrink-0 border-t border-[#D4AF37]/20 p-6 flex gap-3">
          <button
            onClick={() => onEdit?.(newsItem)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-semibold"
          >
            <Edit2 className="w-4 h-4" />
            Editar
          </button>
          <button
            onClick={() => onDelete?.(newsItem.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold"
          >
            <Trash2 className="w-4 h-4" />
            Eliminar
          </button>
        </div>
      )}
    </Card>
  );

  return (
    <div className="w-full">
      {/* Grid de 4 tarjetas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {displayedNews.map((newsItem) => (
          <NewsCard key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>      {/* Botón "Ver más" si hay más de 4 noticias */}
      {news.length > 4 && (
        <div className="flex justify-center mb-2">
          <Button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 rounded-lg bg-[#D4AF37] text-[#1A1A1A] font-semibold hover:bg-[#E5C158] transition-colors"
          >
            Ver todas las noticias
          </Button>
        </div>
      )}

      {/* Modal con todas las noticias */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <Card className="bg-card border-[#D4AF37]/30 rounded-xl w-full max-w-4xl max-h-[80vh] overflow-y-auto p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">Todas las Noticias</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-background rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>            <div className="space-y-4">
              {news.map((newsItem) => (
                <div
                  key={newsItem.id}
                  className="p-4 border border-[#D4AF37]/20 rounded-lg hover:bg-background/50 transition-colors"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-foreground text-lg">
                        {newsItem.titulo}
                      </h3>
                      <p className="text-xs text-foreground/70 mt-1">
                        {formatDate(newsItem.createdAt)}
                      </p>
                      <p className="text-sm text-foreground/80 mt-3 leading-relaxed">
                        {newsItem.contenido}
                      </p>
                      {isAdmin && (
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => {
                              onEdit?.(newsItem);
                              setShowModal(false);
                            }}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-colors text-sm font-semibold"
                          >
                            <Edit2 className="w-4 h-4" />
                            Editar
                          </button>
                          <button
                            onClick={() => onDelete?.(newsItem.id)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors text-sm font-semibold"
                          >
                            <Trash2 className="w-4 h-4" />
                            Eliminar
                          </button>
                        </div>
                      )}
                    </div>
                    {newsItem.imagen && (
                      <a
                        href={
                          newsItem.imagen.startsWith('http://') || newsItem.imagen.startsWith('https://')
                            ? newsItem.imagen
                            : `https://${newsItem.imagen}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 p-2 text-[#D4AF37] hover:text-[#E5C158] transition-colors"
                        title="Ver noticia"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

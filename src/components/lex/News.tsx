"use client";

import { useState, useEffect } from "react";
import { newsData } from "@/lib/data";
import { Card } from "@/components/ui/card";
import { X, ExternalLink, Plus, Lock, LockOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getNoticias, addNoticia, deleteNoticia, updateNoticia } from "@/lib/firebase-db";
import { Noticia } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";
import { NewsGrid } from "@/components/news-grid";
import { GoldenDivider } from "./GoldenDivider";

interface NewsItem {
  id: string;
  titulo: string;
  contenido: string;
  link?: string;
  createdAt: string;
}

const ADMIN_PASSWORD = "Martinez.26";

export function News() {
  const { toast } = useToast();
  const [news, setNews] = useState<Noticia[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    link: "",
    autor: "Sistema Jurídico",
  });
  const [extractedImagePreview, setExtractedImagePreview] = useState<string | null>(null);

  // Cargar noticias desde Firebase al montar
  useEffect(() => {
    loadNews();

    // Verificar si ya está autenticado en esta sesión
    const isAuth = sessionStorage.getItem("newsAuthenticatedSession");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);  const loadNews = async () => {
    try {
      console.log('[loadNews] Iniciando carga...');
      
      // Intentar primero desde Firebase (más rápido y confiable para cambios inmediatos)
      const noticias = await getNoticias(5);
      console.log('[loadNews] ✅ Cargadas desde Firebase:', noticias.length, 'noticias');
      setNews(noticias);
      return;
    } catch (error) {
      console.error("[loadNews] ❌ Error crítico:", error);
      setNews([]); // Set empty array to prevent UI errors
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");

    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      sessionStorage.setItem("newsAuthenticatedSession", "true");
      setPasswordInput("");
      setShowForm(true);
    } else {
      setPasswordError("Contraseña incorrecta");
      setPasswordInput("");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowForm(false);
    setPasswordInput("");
    sessionStorage.removeItem("newsAuthenticatedSession");
  };  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.titulo.trim() || !formData.contenido.trim()) {
      alert("Por favor complete título y contenido");
      return;
    }

    setLoading(true);
    try {
      // Usar el link original como imagen por defecto
      let imageUrl = formData.link || undefined;
      console.log("[News] Iniciando publicación de noticia...");
      console.log("[News] Link ingresado:", formData.link);

      let newNoticiaId: string | undefined;

      // Guardar la noticia inmediatamente con o sin imagen extraída
      if (editingId) {
        await updateNoticia(editingId, {
          titulo: formData.titulo,
          contenido: formData.contenido,
          autor: formData.autor,
          ...(imageUrl ? { imagen: imageUrl } : {}),
          ...(formData.link ? { link: formData.link } : {}),
        });
        newNoticiaId = editingId;
      } else {
        const noticia = await addNoticia({
          titulo: formData.titulo,
          contenido: formData.contenido,
          autor: formData.autor,
          ...(imageUrl ? { imagen: imageUrl } : {}),
          ...(formData.link ? { link: formData.link } : {}),
        });
        newNoticiaId = noticia.id;
      }      // Mostrar toast inmediatamente (sin esperar a que carguen las noticias)
      toast({
        title: "✅ Éxito",
        description: editingId ? "Noticia actualizada exitosamente" : "Noticia agregada exitosamente",
      });      // Guardar link antes de resetear formulario
      const linkToExtract = formData.link;

      // Resetear formulario inmediatamente
      setFormData({ titulo: "", contenido: "", link: "", autor: "Sistema Jurídico" });
      setExtractedImagePreview(null);
      setShowForm(false);
      setEditingId(null);

      // Recargar noticias después de un pequeño delay para asegurar que Firebase sincronice
      console.log("[News] Recargando noticias después de publicar...");
      setTimeout(async () => {
        try {
          await loadNews();
          console.log("[News] Noticias recargadas exitosamente");
        } catch (error) {
          console.error("[News] Error recargar noticias:", error);
        }
      }, 300);

      // Extraer imagen en segundo plano (sin bloquear)
      if (linkToExtract && !linkToExtract.match(/\.(jpg|jpeg|png|gif|webp)$/i) && newNoticiaId) {
        extractImageInBackground(newNoticiaId, linkToExtract);
      }
    } catch (error) {
      console.error("Error adding/updating news:", error);
      toast({
        title: "❌ Error",
        description: "Error al guardar noticia. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };  // Función para extraer imagen en segundo plano
  const extractImageInBackground = async (noticiaId: string, linkUrl: string) => {
    try {
      let urlToProcess = linkUrl.trim();
      if (!urlToProcess.startsWith('http://') && !urlToProcess.startsWith('https://')) {
        urlToProcess = 'https://' + urlToProcess;
      }

      console.log("[News-BG] Extrayendo imagen en segundo plano para:", urlToProcess);

      // Crear un AbortController con timeout de 10 segundos
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      try {
        const response = await fetch("/api/extract-image", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: urlToProcess }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          console.warn("[News-BG] API retornó error:", response.status);
          return;
        }

        const data = await response.json();
        console.log("[News-BG] Respuesta API extract-image:", data);

        if (data.success && data.imageUrl) {
          // Actualizar solo la imagen si se extrajo correctamente
          console.log("[News-BG] ✅ Imagen extraída. Actualizando noticia...");
          await updateNoticia(noticiaId, {
            imagen: data.imageUrl,
          } as Partial<Noticia>);
          
          // Recargar noticias para mostrar la imagen actualizada
          await loadNews();
          console.log("[News-BG] Noticias recargadas con imagen extraída");
        }
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          console.warn("[News-BG] ⏱️ Timeout extrayendo imagen (>10s)");
        } else {
          console.error("[News-BG] Error en fetch:", fetchError.message);
        }
      }
    } catch (error) {
      console.error("[News-BG] Error extrayendo imagen en segundo plano:", error);
      // No mostrar error al usuario, ya que la noticia ya se publicó
    }  };  const handleDeleteNews = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;

    try {
      console.log("[News] Eliminando noticia:", id);
      
      // 1. Eliminar de Firebase (esperar a que se complete)
      await deleteNoticia(id);
      console.log("[News] Noticia eliminada exitosamente de Firebase");
      
      // 2. Mostrar toast de éxito INMEDIATAMENTE
      toast({
        title: "✅ Éxito",
        description: "Noticia eliminada correctamente",
      });
      
      // 3. Esperar 500ms para que Firebase sincronice completamente
      console.log("[News] Esperando sincronización de Firebase...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // 4. Recargar noticias (AHORA forzar recarga)
      console.log("[News] Recargando noticias después de eliminar...");
      try {
        await loadNews();
        console.log("[News] ✅ Noticias recargadas correctamente");
      } catch (error) {
        console.error("[News] Error recargando:", error);
      }
    } catch (error) {
      console.error("[News] Error eliminando noticia:", error);
      toast({
        title: "❌ Error",
        description: "No se pudo eliminar la noticia",
        variant: "destructive",
      });
    }
  };
  const handleEditNews = (noticia: Noticia) => {
    setEditingId(noticia.id);
    setFormData({
      titulo: noticia.titulo,
      contenido: noticia.contenido,
      link: noticia.imagen || "",
      autor: noticia.autor || "Sistema Jurídico",
    });
    setExtractedImagePreview(noticia.imagen || null);
    setShowForm(true);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ titulo: "", contenido: "", link: "", autor: "Sistema Jurídico" });
    setExtractedImagePreview(null);
    setShowForm(false);
  };
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString("es-AR", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
  };  return (
    <>        <section id="news" className="bg-background py-12 md:py-12 pb-12 relative">
        <GoldenDivider backgroundColor="bg-background" />
        <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-8">
          <div className="mb-12 text-center">
            <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
              {newsData.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
              {newsData.subtitle}
            </p>
          </div>          {/* Botón para agregar noticia o usuario autenticado */}
          <div className="mb-8 flex justify-center gap-4">
            {!isAuthenticated ? (
              <button
                onClick={() => setShowForm(!showForm)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: "#D4AF37",
                  color: "#1A1A1A",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#E5C158";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#D4AF37";
                }}
              >
                <Lock className="w-5 h-5" />
                <span className="font-semibold">
                  {showForm ? "Cancelar" : "Agregar Noticia"}
                </span>
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all duration-300"
                  style={{
                    backgroundColor: "#D4AF37",
                    color: "#1A1A1A",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#E5C158";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#D4AF37";
                  }}
                >
                  <Plus className="w-5 h-5" />
                  <span className="font-semibold">
                    {showForm ? "Cancelar" : "Agregar Noticia"}
                  </span>
                </button>                <button
                  onClick={handleLogout}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D4AF37] text-foreground font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300"
                >
                  <LockOpen className="w-5 h-5" />
                  <span>Cerrar Sesión</span>
                </button>
              </>
            )}
          </div>

          {/* Modal de autenticación */}
          {!isAuthenticated && showForm && (
            <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
              <Card className="bg-card border-[#D4AF37]/30 rounded-xl w-full max-w-md p-8 shadow-2xl">
                <div className="text-center mb-6">
                  <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: "#D4AF37" }} />
                  <h2 className="text-2xl font-bold text-foreground">Acceso Restringido</h2>
                  <p className="text-foreground/70 text-sm mt-2">
                    Ingrese la contraseña para agregar noticias
                  </p>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setPasswordError("");
                      }}
                      placeholder="Contraseña"
                      className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                      autoFocus
                    />
                  </div>

                  {passwordError && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                      <p className="text-sm text-red-500 font-semibold">{passwordError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowForm(false);
                        setPasswordInput("");
                        setPasswordError("");
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-[#D4AF37] text-foreground font-semibold hover:bg-[#D4AF37]/10 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 rounded-lg bg-[#D4AF37] text-[#1A1A1A] font-semibold hover:bg-[#E5C158] transition-colors"
                    >
                      Ingresar
                    </button>
                  </div>
                </form>
              </Card>
            </div>
          )}          {/* Formulario para agregar noticia */}
          {showForm && isAuthenticated && (
            <Card className="mb-12 p-8 bg-card border-[#D4AF37]/30 rounded-xl">
              <h3 className="text-2xl font-bold text-foreground mb-6">
                {editingId ? "Editar Noticia" : "Agregar Nueva Noticia"}
              </h3>
              <form onSubmit={handleAddNews} className="space-y-6">                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Título de la Noticia *
                  </label>
                  <input
                    type="text"
                    value={formData.titulo}
                    onChange={(e) =>
                      setFormData({ ...formData, titulo: e.target.value })
                    }
                    placeholder="Ej: Nuevo fallo sobre responsabilidad civil"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Contenido *
                  </label>
                  <textarea
                    value={formData.contenido}
                    onChange={(e) =>
                      setFormData({ ...formData, contenido: e.target.value })
                    }
                    placeholder="Contenido detallado de la noticia o fallo"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all resize-none"
                  />
                </div>                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Link del Artículo/Noticia (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) => {
                      setFormData({ ...formData, link: e.target.value });
                      setExtractedImagePreview(null);
                    }}
                    placeholder="https://www.radiodos.com.ar/205051-articulo... o https://ejemplo.com/noticia"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  />
                  <p className="text-xs text-foreground/60 mt-2">
                    💡 Si pegas un link a un artículo, la imagen se extraerá automáticamente al publicar
                  </p>
                </div>

                <div className="flex gap-4 justify-end">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-6 py-2 rounded-lg border border-[#D4AF37]/50 text-foreground font-semibold hover:bg-[#D4AF37]/10 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-2 rounded-lg bg-[#D4AF37] text-[#1A1A1A] font-semibold hover:bg-[#E5C158] transition-colors disabled:opacity-50"
                  >
                    {editingId ? "Actualizar Noticia" : "Publicar Noticia"}
                  </button>
                </div>
              </form>
            </Card>          )}          {/* Grid de noticias */}
          <NewsGrid 
            news={news} 
            onEdit={handleEditNews}
            onDelete={handleDeleteNews}
            isAdmin={isAuthenticated}
          />

          <div className="pt-20"></div>
        </div>
      </section>
    </>
  );
}

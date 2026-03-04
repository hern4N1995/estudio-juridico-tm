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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    titulo: "",
    contenido: "",
    link: "",
    autor: "Sistema Jurídico",
  });

  // Cargar noticias desde Firebase al montar
  useEffect(() => {
    loadNews();

    // Verificar si ya está autenticado en esta sesión
    const isAuth = sessionStorage.getItem("newsAuthenticatedSession");
    if (isAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const loadNews = async () => {
    setLoading(true);
    try {
      const noticias = await getNoticias(5);
      setNews(noticias);
    } catch (error) {
      console.error("Error loading news:", error);
      // Fallback a localStorage si Firebase no está disponible
      const storedNews = localStorage.getItem("siteLegalNews");
      if (storedNews) {
        try {
          const parsed = JSON.parse(storedNews);
          setNews(parsed.map((item: any) => ({
            id: item.id,
            titulo: item.title,
            contenido: item.summary,
            link: item.link,
            createdAt: new Date(item.createdAt).toISOString(),
          })));
        } catch (e) {
          console.error("Error parsing stored news:", e);
        }
      }
    } finally {
      setLoading(false);
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
      if (editingId) {
        // Editar noticia existente
        await updateNoticia(editingId, {
          titulo: formData.titulo,
          contenido: formData.contenido,
          autor: formData.autor,
          imagen: formData.link || undefined,
        });
        toast({
          title: "Éxito",
          description: "Noticia actualizada exitosamente",
        });
      } else {
        // Agregar nueva noticia
        await addNoticia({
          titulo: formData.titulo,
          contenido: formData.contenido,
          autor: formData.autor,
          imagen: formData.link || undefined,
        });
        toast({
          title: "Éxito",
          description: "Noticia agregada exitosamente",
        });
      }

      // Recargar noticias
      await loadNews();
      // Resetear formulario
      setFormData({ titulo: "", contenido: "", link: "", autor: "Sistema Jurídico" });
      setShowForm(false);
      setEditingId(null);
    } catch (error) {
      console.error("Error adding/updating news:", error);
      toast({
        title: "Error",
        description: "Error al guardar noticia. Intenta de nuevo.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleDeleteNews = async (id: string) => {
    if (!confirm("¿Estás seguro de que quieres eliminar esta noticia?")) return;

    setLoading(true);
    try {
      await deleteNoticia(id);
      await loadNews();
      toast({
        title: "Éxito",
        description: "Noticia eliminada exitosamente",
      });
    } catch (error) {
      console.error("Error deleting news:", error);
      toast({
        title: "Error",
        description: "Error al eliminar noticia",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
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
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({ titulo: "", contenido: "", link: "", autor: "Sistema Jurídico" });
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
  };

  return (
    <>
      <div id="news" className="flex items-center justify-center py-12 bg-background">
        <div className="flex items-center justify-center gap-8 w-full max-w-5xl px-4">
          <div
            className="flex-1"
            style={{
              height: "4px",
              backgroundColor: "#d4af37",
              borderRadius: "2px",
              opacity: 0.6,
            }}
          />
          <div className="flex items-center gap-6 shrink-0">
            <div
              className="rounded-full"
              style={{ width: "96px", height: "4px", backgroundColor: "#d4af37" }}
            />
            <span className="text-4xl font-bold whitespace-nowrap" style={{ color: "#d4af37" }}>
              ✦
            </span>
            <div
              className="rounded-full"
              style={{ width: "96px", height: "4px", backgroundColor: "#d4af37" }}
            />
          </div>
          <div
            className="flex-1"
            style={{
              height: "4px",
              backgroundColor: "#d4af37",
              borderRadius: "2px",
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      <section className="bg-background py-2 md:py-4 pb-24 relative">
        <div className="container mx-auto max-w-7xl px-4 md:px-6">
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
                </button>
                <button
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
                    Link a Imagen (Opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="www.ejemplo.com/imagen.jpg o https://ejemplo.com/imagen.jpg"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                  />
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

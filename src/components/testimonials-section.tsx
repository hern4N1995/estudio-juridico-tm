'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Quote, Star, Lock, LockOpen } from 'lucide-react';
import { Testimonio, User } from '@/lib/types';
import { getTestimonios, addTestimonio, getUserTestimonio, updateTestimonio } from '@/lib/firebase-db';
import { AuthButton } from './auth-button';
import { TestimonialForm } from './testimonial-form';
import { TestimonialsCarousel } from './testimonials-carousel';
import { testimonialsData } from '@/lib/data';
import { useAuth } from '@/hooks/use-auth';
import { GoldenDivider } from './lex/GoldenDivider';

const ADMIN_PASSWORD = "Martinez.26";

export function TestimonialsSection() {  const [testimonios, setTestimonios] = useState<Testimonio[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [userTestimonio, setUserTestimonio] = useState<Testimonio | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showAdminPassword, setShowAdminPassword] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState("");
  const [adminPasswordError, setAdminPasswordError] = useState("");
  const { user: authUser } = useAuth();  // Sincronizar user de auth hook
  useEffect(() => {
    setUser(authUser);
    // Abrir formulario automáticamente cuando el usuario inicia sesión
    if (authUser) {
      setShowForm(true);
      // Cargar el testimonio del usuario si existe
      loadUserTestimonio(authUser.id);
      // Verificar si es admin (basado en email específico)
      setIsAdmin(authUser.email === 'transito412@gmail.com');
    } else {
      setShowForm(false);
      setUserTestimonio(null);
      setIsEditing(false);
      setIsAdmin(false);
      setIsAdminAuthenticated(false);
    }
  }, [authUser]);

  const handleAdminPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAdminPasswordError("");

    if (adminPasswordInput === ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem("testimonialsAdminSession", "true");
      setAdminPasswordInput("");
      setShowAdminPassword(false);
    } else {
      setAdminPasswordError("Contraseña incorrecta");
      setAdminPasswordInput("");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    setAdminPasswordInput("");
    sessionStorage.removeItem("testimonialsAdminSession");
  };

  const loadUserTestimonio = async (userId: string) => {
    try {
      const testimonio = await getUserTestimonio(userId);
      setUserTestimonio(testimonio);
    } catch (error) {
      console.error('Error loading user testimonio:', error);
    }
  };
  // Cargar testimonios al montar el componente
  useEffect(() => {
    loadTestimonios();

    // Verificar si ya está autenticado en esta sesión
    const isAuth = sessionStorage.getItem("testimonialsAdminSession");
    if (isAuth === "true") {
      setIsAdminAuthenticated(true);
    }
  }, []);
  const loadTestimonios = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log('Cargando testimonios desde API...');
      // Intentar primero desde el endpoint de API (más confiable)
      try {
        const response = await fetch('/api/testimonios');
        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        console.log('Testimonios cargados desde API:', data);
        setTestimonios(data);
      } catch (apiError) {
        console.warn('API call failed, trying direct Firebase:', apiError);
        // Fallback: intentar acceso directo a Firebase
        const data = await getTestimonios(15);
        console.log('Testimonios cargados desde Firebase:', data);
        setTestimonios(data);
      }
    } catch (error) {
      console.error('Error loading testimonios:', error);
      setError('Error al cargar comentarios');
      setTestimonios([]); // Set empty array to prevent UI errors
    } finally {
      setLoading(false);
    }
  };const handleAddTestimonio = async (contenido: string, calificacion: number) => {
    if (!user) {
      setError('Debes iniciar sesión para comentar');
      return;
    }

    try {
      console.log('Agregando/Editando testimonio...');
      
      if (isEditing && userTestimonio) {
        // Editar testimonio existente
        await updateTestimonio(userTestimonio.id, { contenido, calificacion });
        console.log('Testimonio actualizado');
      } else {
        // Agregar nuevo testimonio
        await addTestimonio(user, { contenido, calificacion });
        console.log('Testimonio agregado');
      }
      
      setShowForm(false);
      setIsEditing(false);
      setError(null);
      // Esperar un poco antes de recargar para que Firebase guarde
      setTimeout(() => {
        loadTestimonios();
        loadUserTestimonio(user.id);
      }, 500);
    } catch (error) {
      console.error('Error adding/updating testimonio:', error);
      setError('Error al guardar comentario');
      throw error;    }
  };
  const handleDeleteTestimonio = async (id: string) => {
    // Recargar testimonios después de eliminar
    await new Promise(resolve => setTimeout(resolve, 500));
    await loadTestimonios();  };  return (    <>
      <section id="testimonials" className="bg-card py-12 md:py-12 pb-12 relative">
        <GoldenDivider backgroundColor="bg-card" />
        <div className="container mx-auto max-w-7xl px-4 md:px-6 pt-8">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {testimonialsData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {testimonialsData.subtitle}
          </p>          <div className="mt-8 flex justify-center gap-4 flex-wrap">
            <AuthButton
              user={user}
              onUserChange={setUser}
              variant="default"
              showText={true}
              loginText="Agregar opinión"
            />            <a
              href="https://www.google.com.ar/search?sxsrf=ACYBGNQDnuW-Kry7m1tnKC4DdZxXvFFy2A%3A1571524101231&source=hp&ei=BY6rXcuIDJO95OUP6-6YKA&q=estudio+quatro&oq=estudio+quatro&gs_l=psy-ab.3..35i39j0i22i30j0i22i10i30j38.1557.4302..4748...0.0..0.98.1301.14......0....1..gws-wiz.......0j0i131j0i67j0i20i263j0i10.ph4UaGhHjag&ved=0ahUKEwiLn7u-r6nlAhWTHrkGHWs3BgUQ4dUDCAY&uact=5#lrd=0x94456c783f70041d:0xd24a2d1dada87c4f,1,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-9 px-4 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Ver opiniones en Google
            </a>
            <button
              onClick={() => setShowAdminPassword(!showAdminPassword)}
              className="inline-flex items-center justify-center rounded-md h-9 w-9 text-sm font-medium transition-all duration-300"
              style={{
                backgroundColor: isAdminAuthenticated ? "#E5C158" : "#D4AF37",
                color: "#1A1A1A",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E5C158";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = isAdminAuthenticated ? "#E5C158" : "#D4AF37";
              }}
              title={isAdminAuthenticated ? "Gestor de Comentarios" : "Acceso Admin"}
            >
              {isAdminAuthenticated ? (
                <LockOpen className="w-4 h-4" />
              ) : (
                <Lock className="w-4 h-4" />
              )}            </button>
          </div>
        </div>{/* Modal de contraseña de admin */}
        {showAdminPassword && !isAdminAuthenticated && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="bg-card border-[#D4AF37]/30 rounded-xl w-full max-w-md p-8 shadow-2xl">
              <div className="text-center mb-6">
                <Lock className="w-12 h-12 mx-auto mb-4" style={{ color: "#D4AF37" }} />
                <h2 className="text-2xl font-bold text-foreground">Acceso Restringido</h2>
                <p className="text-foreground/70 text-sm mt-2">
                  Ingrese la contraseña para gestionar comentarios
                </p>
              </div>

              <form onSubmit={handleAdminPasswordSubmit} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={adminPasswordInput}
                    onChange={(e) => {
                      setAdminPasswordInput(e.target.value);
                      setAdminPasswordError("");
                    }}
                    placeholder="Contraseña"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-[#D4AF37]/30 text-foreground placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all"
                    autoFocus
                  />
                </div>

                {adminPasswordError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30">
                    <p className="text-sm text-red-500 font-semibold">{adminPasswordError}</p>
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAdminPassword(false);
                      setAdminPasswordInput("");
                      setAdminPasswordError("");
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
        )}

        {/* Botones de admin cuando está autenticado */}
        {isAdminAuthenticated && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={handleAdminLogout}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-[#D4AF37] text-foreground font-semibold hover:bg-[#D4AF37]/10 transition-all duration-300"
            >
              <LockOpen className="w-5 h-5" />
              <span>Cerrar Sesión Admin</span>
            </button>
          </div>
        )}

        {/* Testimonial Form */}
        {user && showForm && (
          <div className="mb-8">
            <TestimonialForm
              user={user}
              onSubmit={handleAddTestimonio}
              onCancel={() => {
                setShowForm(false);
                setIsEditing(false);
              }}
              initialTestimonio={userTestimonio}
              isEditing={isEditing}
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-8 p-4 bg-destructive/10 border border-destructive rounded-lg">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        )}

        {/* User Action Buttons */}
        {user && !showForm && (
          <div className="mb-8 flex gap-2">
            {userTestimonio ? (
              <>
                <Button
                  onClick={() => {
                    setShowForm(true);
                    setIsEditing(true);
                  }}
                  variant="default"
                >
                  ✏️ Editar mi comentario
                </Button>
              </>
            ) : (
              <Button
                onClick={() => {
                  setShowForm(true);
                  setIsEditing(false);
                }}
                variant="default"
                className="w-full md:w-auto"
              >
                + Agregar comentario
              </Button>
            )}          </div>
        )}

        {/* User's Own Testimonial Display */}
        {user && userTestimonio && !showForm && (
          <div className="mb-8 p-6 bg-primary/5 border-2 border-primary/30 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-foreground mb-2">Tu comentario</h3>
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < userTestimonio.calificacion
                          ? 'fill-primary text-primary'
                          : 'text-foreground/20'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground">{userTestimonio.contenido}</p>
                <p className="text-xs text-foreground/50 mt-3">
                  Publicado: {userTestimonio.fecha}
                </p>
              </div>
            </div>
          </div>
        )}        {/* Testimonios Carousel */}
        {testimonios.length > 0 && (
          <TestimonialsCarousel
            testimonios={testimonios}
            userTestimonio={userTestimonio}
            user={user}
            isAdmin={isAdminAuthenticated}
            onDelete={handleDeleteTestimonio}
          />
        )}

        {testimonios.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-foreground/50">No hay comentarios aún. ¡Sé el primero!</p>
          </div>
        )}      </div>
    </section>
    </>
  );
}

'use client';

import { contactData } from "@/lib/data";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "./icons";
import { GoldenDivider } from "./GoldenDivider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export function Contact() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    provincia: "",
    mensaje: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProvinceChange = (value: string) => {
    setFormData(prev => ({ ...prev, provincia: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: "success", text: "¡Consulta enviada exitosamente! Nos pondremos en contacto pronto." });
        setFormData({ nombre: "", email: "", telefono: "", provincia: "", mensaje: "" });
      } else {
        setMessage({ type: "error", text: data.error || "Error al enviar la consulta" });
      }
    } catch (error) {
      setMessage({ type: "error", text: "Error al enviar la consulta. Intenta de nuevo." });
    } finally {
      setLoading(false);
    }
  };
  return (
    <section id="contact" className="bg-card py-2 md:py-4 pb-24 md:pb-24 relative">
      <GoldenDivider />
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="font-headline text-3xl font-bold text-foreground md:text-4xl">
            {contactData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {contactData.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <Card className="border-border bg-background p-8">
            <h3 className="font-headline text-2xl font-bold text-foreground">Enviar Mensaje</h3>
            <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
              <Input 
                type="text" 
                name="nombre"
                placeholder="Nombre Completo" 
                className="bg-input text-foreground" 
                value={formData.nombre}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="email" 
                name="email"
                placeholder="Email" 
                className="bg-input text-foreground"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              <Input 
                type="tel" 
                name="telefono"
                placeholder="Teléfono" 
                className="bg-input text-foreground"
                value={formData.telefono}
                onChange={handleInputChange}
                required
              />
              <Select value={formData.provincia} onValueChange={handleProvinceChange}>
                <SelectTrigger className="bg-input text-foreground border-input">
                  <SelectValue placeholder="Seleccionar Provincia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="buenos-aires">Buenos Aires</SelectItem>
                  <SelectItem value="catamarca">Catamarca</SelectItem>
                  <SelectItem value="chaco">Chaco</SelectItem>
                  <SelectItem value="chubut">Chubut</SelectItem>
                  <SelectItem value="cordoba">Córdoba</SelectItem>
                  <SelectItem value="corrientes">Corrientes</SelectItem>
                  <SelectItem value="entre-rios">Entre Ríos</SelectItem>
                  <SelectItem value="formosa">Formosa</SelectItem>
                  <SelectItem value="jujuy">Jujuy</SelectItem>
                  <SelectItem value="la-pampa">La Pampa</SelectItem>
                  <SelectItem value="la-rioja">La Rioja</SelectItem>
                  <SelectItem value="mendoza">Mendoza</SelectItem>
                  <SelectItem value="misiones">Misiones</SelectItem>
                  <SelectItem value="neuquen">Neuquén</SelectItem>
                  <SelectItem value="rio-negro">Río Negro</SelectItem>
                  <SelectItem value="salta">Salta</SelectItem>
                  <SelectItem value="san-juan">San Juan</SelectItem>
                  <SelectItem value="san-luis">San Luis</SelectItem>
                  <SelectItem value="santa-cruz">Santa Cruz</SelectItem>
                  <SelectItem value="santa-fe">Santa Fe</SelectItem>
                  <SelectItem value="santiago-del-estero">Santiago del Estero</SelectItem>
                  <SelectItem value="tierra-del-fuego">Tierra del Fuego</SelectItem>
                  <SelectItem value="tucuman">Tucumán</SelectItem>
                </SelectContent>
              </Select>
              <Textarea 
                name="mensaje"
                placeholder="Su mensaje..." 
                className="bg-input text-foreground"
                value={formData.mensaje}
                onChange={handleInputChange}
                required
              />
              {message && (
                <div className={`p-3 rounded-lg text-sm font-semibold ${
                  message.type === "success" 
                    ? "bg-green-500/10 border border-green-500/30 text-green-600" 
                    : "bg-red-500/10 border border-red-500/30 text-red-600"
                }`}>
                  {message.text}
                </div>
              )}
              <Button 
                type="submit" 
                className="w-full mt-12"
                disabled={loading}
              >
                {loading ? "Enviando..." : "Enviar Consulta"}
              </Button>
            </form>
          </Card>

          <div className="space-y-8">
            <div>
              <h3 className="font-headline text-2xl font-bold text-foreground">Horarios de Atención</h3>
              <div className="mt-6 space-y-3 text-lg">
                <div className="flex items-center gap-4">
                  <span className="font-semibold" style={{ color: '#D4AF37' }}>Lunes a Viernes:</span>
                  <span className="text-foreground/80">08:30 a 13:00 & 18:00 a 20:30</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold" style={{ color: '#D4AF37' }}>Sábados & Domingos:</span>
                  <span className="text-foreground/80">CERRADO</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-foreground">Información de Contacto</h3>
              <div className="mt-6 space-y-4 text-lg">
                <a href={`https://wa.me/${contactData.phone.replace(/\s|-|\+/g, "")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 transition-colors hover:text-primary">
                  <WhatsAppIcon className="h-6 w-6 text-primary" />
                  <span className="text-foreground">{contactData.phone}</span>
                </a>
                <a href={`mailto:${contactData.email}`} className="flex items-center gap-4 transition-colors hover:text-primary">
                  <Mail className="h-6 w-6 text-primary" />
                  <span className="text-foreground">{contactData.email}</span>
                </a>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 flex-shrink-0 text-primary mt-1" />
                  <span className="text-foreground">{contactData.address}</span>
                </div>
              </div>
            </div>
            <div className="h-64 w-full overflow-hidden rounded-lg border border-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.1234567890!2d-58.4206!3d-27.4898!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94456c7d1b8c0001%3A0x2965ba48dc7396a5!2sLa%20Rioja%20763%2C%20Corrientes%2C%20Argentina!5e0!3m2!1ses!2sar!4v1689104192534!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

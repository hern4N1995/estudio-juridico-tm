"use client";

import { useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { getSummary } from "@/app/actions";
import { aiSummarizerData } from "@/lib/data";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Bot, FileText, Loader, Sparkles } from "lucide-react";

const initialState = null;

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? (
        <>
          <Loader className="mr-2 h-4 w-4 animate-spin" />
          Analizando...
        </>
      ) : (
        <>
          <Sparkles className="mr-2 h-4 w-4" />
          Generar Resumen
        </>
      )}
    </Button>
  );
}

export function AiSummarizer() {
  const [state, formAction] = useFormState(getSummary, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state?.error) {
      toast({
        variant: "destructive",
        title: "Error de validación",
        description: state.error,
      });
    }
  }, [state, toast]);

  return (
    <section id="ai-summarizer" className="py-16 md:py-24">
      <div className="container mx-auto max-w-4xl px-4 md:px-6">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-block rounded-full bg-primary/10 p-3">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-headline text-3xl font-bold text-white md:text-4xl">
            {aiSummarizerData.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground">
            {aiSummarizerData.subtitle}
          </p>
        </div>

        <Card className="bg-card">
          <form action={formAction}>
            <CardHeader>
              <CardTitle className="text-white">Ingrese su Documento</CardTitle>
              <CardDescription>
                El análisis puede tardar unos segundos. Asegúrese de que el texto tenga al menos 50 caracteres.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                name="documentText"
                placeholder="Pegue aquí el contenido completo del documento legal..."
                className="min-h-[200px] bg-input text-white"
                required
              />
            </CardContent>
            <CardFooter>
              <SubmitButton />
            </CardFooter>
          </form>
        </Card>

        {state && !state.error && (
          <Card key={state.timestamp} className="mt-8 bg-card animate-in fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <FileText className="text-primary" />
                Análisis Completado
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-headline text-lg font-bold text-white">Resumen</h3>
                <p className="mt-2 text-foreground">{state.summary}</p>
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-white">Puntos Clave</h3>
                <p className="mt-2 text-foreground whitespace-pre-wrap">{state.keyPoints}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </section>
  );
}

"use server";

import { summarizeLegalDocument } from "@/ai/flows/summarize-legal-insights";
import { z } from "zod";

const DocumentSchema = z.string().min(50, { message: "El texto del documento debe tener al menos 50 caracteres." });

export type FormState = {
  summary: string;
  keyPoints: string;
  error?: string;
  timestamp: number;
} | null;

export async function getSummary(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const documentText = formData.get("documentText");

  const validatedFields = DocumentSchema.safeParse(documentText);

  if (!validatedFields.success) {
    return {
      summary: "",
      keyPoints: "",
      error: validatedFields.error.errors[0].message,
      timestamp: Date.now(),
    };
  }
  
  try {
    const result = await summarizeLegalDocument({ documentText: validatedFields.data });
    return {
      summary: result.summary,
      keyPoints: result.keyPoints,
      timestamp: Date.now(),
    };
  } catch (e) {
    return {
      summary: "",
      keyPoints: "",
      error: "Ocurrió un error al procesar el documento. Por favor, intente de nuevo.",
      timestamp: Date.now(),
    };
  }
}

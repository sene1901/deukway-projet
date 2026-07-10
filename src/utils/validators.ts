import { z } from "zod";

/**
 * Numéros sénégalais
 * Formats acceptés :
 * - +221771234567
 * - 221771234567
 * - 771234567
 * - 77 123 45 67
 */
const SN_PHONE_REGEX = /^(?:\+?221)?(?:7[05678])\d{7}$/;

/**
 * Vérifie si un numéro de téléphone sénégalais est valide.
 */
export function isValidSenegalPhone(value: string): boolean {
  const cleaned = value.replace(/\s+/g, "");
  return SN_PHONE_REGEX.test(cleaned);
}

/**
 * Normalise un numéro vers le format +221XXXXXXXXX.
 */
export function normalizeSenegalPhone(value: string): string {
  const cleaned = value
    .replace(/\s+/g, "")
    .replace(/^\+?221/, "");

  return `+221${cleaned}`;
}

/**
 * Schémas Zod
 */
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Le numéro de téléphone est requis")
  .refine(isValidSenegalPhone, {
    message: "Numéro de téléphone sénégalais invalide",
  });

export const emailSchema = z
  .string()
  .trim()
  .email("Adresse email invalide");

export const passwordSchema = z
  .string()
  .min(6, "Le mot de passe doit contenir au moins 6 caractères");

export const otpSchema = z
  .string()
  .length(6, "Le code doit contenir 6 chiffres")
  .regex(/^\d{6}$/, "Le code ne doit contenir que des chiffres");
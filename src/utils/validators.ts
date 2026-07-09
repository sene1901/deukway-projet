import { z } from "zod";

/**
 * Numéros sénégalais: +221 suivi de 9 chiffres, ou format local 7X XXX XX XX.
 * Accepte: +221771234567, 221771234567, 771234567, 77 123 45 67
 */
const SN_PHONE_REGEX = /^(?:\+?221)?[- ]?(7[05678])\d{7}$/;

export function isValidSenegalPhone(value: string): boolean {
  const cleaned = value.replace(/\s/g, "");
  return SN_PHONE_REGEX.test(cleaned);
}

export const phoneSchema = z
  .string()
  .min(1, "Le numéro de téléphone est requis")
  .refine(isValidSenegalPhone, "Numéro de téléphone sénégalais invalide");

export const emailSchema = z.string().email("Adresse email invalide");

export const passwordSchema = z
  .string()
  .min(6, "6 caractères minimum");

export const otpSchema = z
  .string()
  .length(6, "Le code doit contenir 6 chiffres")
  .regex(/^\d+$/, "Le code ne doit contenir que des chiffres");

/** Normalise un numéro saisi vers le format international +221XXXXXXXXX. */
export function normalizeSenegalPhone(value: string): string {
  const cleaned = value.replace(/\s/g, "").replace(/^\+?221/, "");
  return `+221${cleaned}`;
}
import { z } from "zod";

/**
 * Numéros sénégalais: +221 suivi de 9 chiffres, ou format local 7X XXX XX XX.
 * Accepte: +221771234567, 221771234567, 771234567, 77 123 45 67
 */
const SN_PHONE_REGEX = /^(?:\+?221)?[- ]?(7[05678])\d{7}$/;

export function isValidSenegalPhone(value: string): boolean {
  const cleaned = value.replace(/\s/g, "");
  return SN_PHONE_REGEX.test(cleaned);
}

export const phoneSchema = z
  .string()
  .min(1, "Le numéro de téléphone est requis")
  .refine(isValidSenegalPhone, "Numéro de téléphone sénégalais invalide");

export const emailSchema = z.string().email("Adresse email invalide");

export const passwordSchema = z
  .string()
  .min(6, "6 caractères minimum");

export const otpSchema = z
  .string()
  .length(6, "Le code doit contenir 6 chiffres")
  .regex(/^\d+$/, "Le code ne doit contenir que des chiffres");

/** Normalise un numéro saisi vers le format international +221XXXXXXXXX. */
export function normalizeSenegalPhone(value: string): string {
  const cleaned = value.replace(/\s/g, "").replace(/^\+?221/, "");
  return `+221${cleaned}`;
}

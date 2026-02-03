/**
 * Utilitários de validação para campos do formulário
 */

import { z } from "zod";

/**
 * Valida CPF usando o algoritmo de dígitos verificadores
 * @param cpf - CPF com ou sem formatação
 * @returns true se o CPF é válido
 */
export function validateCPF(cpf: string): boolean {
  // Remove formatação
  const cleanCPF = cpf.replace(/\D/g, "");

  // Exceção para CPF do administrador
  if (cleanCPF === "00000000000") return true;

  // Verifica se tem 11 dígitos
  if (cleanCPF.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Valida primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;

  // Valida segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
}

/**
 * Valida placa de veículo (formato antigo ou Mercosul)
 * @param plate - Placa com ou sem formatação
 * @returns true se a placa é válida
 */
export function validatePlate(plate: string): boolean {
  const cleanPlate = plate.replace(/[^A-Z0-9]/g, "").toUpperCase();

  // Formato antigo: ABC1234
  const oldFormat = /^[A-Z]{3}\d{4}$/;
  // Formato Mercosul: ABC1D23
  const mercosulFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;

  return oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate);
}

/**
 * Formata placa adicionando traço
 * @param plate - Placa para formatar
 * @returns Placa formatada
 */
export function formatPlate(plate: string): string {
  const clean = plate.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  if (clean.length <= 3) return clean;
  if (clean.length <= 7) return `${clean.slice(0, 3)}-${clean.slice(3)}`;
  return `${clean.slice(0, 3)}-${clean.slice(3, 7)}`;
}

// ============================================
// Schemas de Validação com Zod
// ============================================

/**
 * Schema para validação de dados pessoais do usuário
 */
export const userSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  militaryId: z
    .string()
    .min(5, "ID Militar deve ter pelo menos 5 caracteres")
    .max(20, "ID Militar muito longo"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
});

/**
 * Schema para validação de dados do veículo
 */
export const vehicleSchema = z.object({
  type: z.enum(["Carro", "Moto"], {
    message: "Tipo de veículo inválido",
  }),
  model: z
    .string()
    .min(2, "Modelo deve ter pelo menos 2 caracteres")
    .max(50, "Modelo muito longo"),
  color: z
    .string()
    .min(3, "Cor deve ter pelo menos 3 caracteres")
    .max(30, "Cor muito longa"),
  plate: z.string().refine(validatePlate, "Placa inválida"),
});

/**
 * Schema para validação de registro (usuário + veículo)
 */
export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  militaryId: z
    .string()
    .min(5, "ID Militar deve ter pelo menos 5 caracteres")
    .max(20, "ID Militar muito longo"),
  password: z
    .string()
    .min(6, "Senha deve ter pelo menos 6 caracteres")
    .max(50, "Senha muito longa"),
  vehicle: z.object({
    type: z.enum(["Carro", "Moto"], {
      message: "Tipo de veículo inválido",
    }),
    model: z
      .string()
      .min(2, "Modelo deve ter pelo menos 2 caracteres")
      .max(50, "Modelo muito longo"),
    color: z
      .string()
      .min(3, "Cor deve ter pelo menos 3 caracteres")
      .max(30, "Cor muito longa"),
    plate: z.string().refine(validatePlate, "Placa inválida"),
  }),
});

/**
 * Schema para validação de login
 */
export const loginSchema = z.object({
  cpf: z.string().refine(validateCPF, "CPF inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

/**
 * Tipos inferidos dos schemas
 */
export type UserInput = z.infer<typeof userSchema>;
export type VehicleInput = z.infer<typeof vehicleSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

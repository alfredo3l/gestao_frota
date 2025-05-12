import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classes CSS com condicionais
 * Usa clsx para processar condicionais e twMerge para combinar classes Tailwind 
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 
/**
 * TypeScript Types and Interfaces
 * Shared type definitions for the modular utility application
 */

export interface CalculationResult {
  result: number;
  operation: string;
  expression: string;
  timestamp: Date;
}

export interface FormatResult {
  original: string;
  formatted: string;
  operation: string;
  metadata?: {
    wordCount?: number;
    characterCount?: number;
    truncated?: boolean;
  };
}

export interface CalculatorConfig {
  precision?: number;
}

export interface FormatterConfig {
  truncateSuffix?: string;
}

export type CalculatorOperation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'power'
  | 'sqrt'
  | 'percentage'
  | 'average';

export type FormatterOperation =
  | 'titleCase'
  | 'camelCase'
  | 'kebabCase'
  | 'snakeCase'
  | 'uppercase'
  | 'lowercase'
  | 'truncate'
  | 'reverse'
  | 'wordCount'
  | 'removeSpaces';

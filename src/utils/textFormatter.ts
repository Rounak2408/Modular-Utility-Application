/**
 * Text Formatter Utility Module
 * Browser-compatible text formatting with ES6+ syntax
 */

import type { FormatResult, FormatterOperation, FormatterConfig } from '../types.js';

export class TextFormatter {
  private truncateSuffix: string;

  constructor(config: FormatterConfig = {}) {
    this.truncateSuffix = config.truncateSuffix ?? '...';
  }

  /**
   * Format string with title case
   */
  toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  /**
   * Format string with camel case
   */
  toCamelCase = (str: string): string => {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());
  };

  /**
   * Format string with kebab case
   */
  toKebabCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  };

  /**
   * Format string with snake case
   */
  toSnakeCase = (str: string): string => {
    return str
      .replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  };

  /**
   * Convert to uppercase
   */
  toUppercase = (str: string): string => {
    return str.toUpperCase();
  };

  /**
   * Convert to lowercase
   */
  toLowercase = (str: string): string => {
    return str.toLowerCase();
  };

  /**
   * Truncate string with ellipsis
   */
  truncate = (str: string, maxLength: number): string => {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength - this.truncateSuffix.length) + this.truncateSuffix;
  };

  /**
   * Reverse string
   */
  reverse = (str: string): string => {
    return str.split('').reverse().join('');
  };

  /**
   * Count words in string
   */
  wordCount = (str: string): number => {
    return str.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  /**
   * Remove all spaces
   */
  removeSpaces = (str: string): string => {
    return str.replace(/\s+/g, '');
  };

  /**
   * Count characters
   */
  characterCount = (str: string): number => {
    return str.length;
  };

  /**
   * Format text based on operation
   */
  format = (
    operation: FormatterOperation,
    input: string,
    options?: { maxLength?: number }
  ): FormatResult => {
    let formatted: string;
    const metadata: FormatResult['metadata'] = {
      characterCount: this.characterCount(input),
      wordCount: this.wordCount(input),
    };

    switch (operation) {
      case 'titleCase':
        formatted = this.toTitleCase(input);
        break;
      case 'camelCase':
        formatted = this.toCamelCase(input);
        break;
      case 'kebabCase':
        formatted = this.toKebabCase(input);
        break;
      case 'snakeCase':
        formatted = this.toSnakeCase(input);
        break;
      case 'uppercase':
        formatted = this.toUppercase(input);
        break;
      case 'lowercase':
        formatted = this.toLowercase(input);
        break;
      case 'truncate':
        const maxLength = options?.maxLength ?? 50;
        formatted = this.truncate(input, maxLength);
        metadata.truncated = input.length > maxLength;
        break;
      case 'reverse':
        formatted = this.reverse(input);
        break;
      case 'wordCount':
        formatted = `Word Count: ${metadata.wordCount}`;
        break;
      case 'removeSpaces':
        formatted = this.removeSpaces(input);
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    return {
      original: input,
      formatted,
      operation,
      metadata,
    };
  };
}

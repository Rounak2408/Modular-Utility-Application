/**
 * Calculator Utility Module
 * Browser-compatible calculator with ES6+ syntax
 */

import type { CalculationResult, CalculatorOperation, CalculatorConfig } from '../types.js';

export class Calculator {
  private precision: number;

  constructor(config: CalculatorConfig = {}) {
    this.precision = config.precision ?? 2;
  }

  /**
   * Basic addition operation
   */
  add = (...numbers: number[]): number => {
    const result = numbers.reduce((sum, num) => sum + num, 0);
    return this.round(result);
  };

  /**
   * Basic subtraction operation
   */
  subtract = (a: number, b: number): number => {
    const result = a - b;
    return this.round(result);
  };

  /**
   * Basic multiplication operation
   */
  multiply = (...numbers: number[]): number => {
    const result = numbers.reduce((product, num) => product * num, 1);
    return this.round(result);
  };

  /**
   * Basic division operation with error handling
   */
  divide = (a: number, b: number): number => {
    if (b === 0) {
      throw new Error('Division by zero is not allowed');
    }
    const result = a / b;
    return this.round(result);
  };

  /**
   * Power operation
   */
  power = (base: number, exponent: number): number => {
    const result = Math.pow(base, exponent);
    return this.round(result);
  };

  /**
   * Square root operation
   */
  sqrt = (number: number): number => {
    if (number < 0) {
      throw new Error('Square root of negative number is not allowed');
    }
    const result = Math.sqrt(number);
    return this.round(result);
  };

  /**
   * Calculate percentage
   */
  percentage = (value: number, total: number): number => {
    if (total === 0) {
      throw new Error('Total cannot be zero for percentage calculation');
    }
    const result = (value / total) * 100;
    return this.round(result);
  };

  /**
   * Calculate average of numbers
   */
  average = (...numbers: number[]): number => {
    if (numbers.length === 0) {
      throw new Error('Cannot calculate average of empty array');
    }
    const sum = this.add(...numbers);
    const result = sum / numbers.length;
    return this.round(result);
  };

  /**
   * Perform calculation with operation tracking
   */
  calculate = (
    operation: CalculatorOperation,
    ...args: number[]
  ): CalculationResult => {
    let result: number;
    let expression: string;

    switch (operation.toLowerCase()) {
      case 'add':
        result = this.add(...args);
        expression = `${args.join(' + ')} = ${result}`;
        break;
      case 'subtract':
        result = this.subtract(args[0], args[1]);
        expression = `${args[0]} - ${args[1]} = ${result}`;
        break;
      case 'multiply':
        result = this.multiply(...args);
        expression = `${args.join(' × ')} = ${result}`;
        break;
      case 'divide':
        result = this.divide(args[0], args[1]);
        expression = `${args[0]} ÷ ${args[1]} = ${result}`;
        break;
      case 'power':
        result = this.power(args[0], args[1]);
        expression = `${args[0]}^${args[1]} = ${result}`;
        break;
      case 'sqrt':
        result = this.sqrt(args[0]);
        expression = `√${args[0]} = ${result}`;
        break;
      case 'percentage':
        result = this.percentage(args[0], args[1]);
        expression = `${args[0]} is ${result}% of ${args[1]}`;
        break;
      case 'average':
        result = this.average(...args);
        expression = `Average of [${args.join(', ')}] = ${result}`;
        break;
      default:
        throw new Error(`Unknown operation: ${operation}`);
    }

    return {
      result,
      operation,
      expression,
      timestamp: new Date(),
    };
  };

  /**
   * Round number to specified precision
   */
  private round = (number: number): number => {
    const factor = Math.pow(10, this.precision);
    return Math.round(number * factor) / factor;
  };
}

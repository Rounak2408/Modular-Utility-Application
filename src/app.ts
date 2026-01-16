/**
 * Main Application Entry Point
 * Handles DOM events and UI rendering for the browser-based utility application
 */

import { Calculator } from './utils/calculator.js';
import { TextFormatter } from './utils/textFormatter.js';
import type { CalculationResult, FormatResult } from './types.js';

// Initialize utilities
const calculator = new Calculator({ precision: 2 });
const formatter = new TextFormatter();

// DOM Elements
const calculatorBtn = document.getElementById('calculator-btn') as HTMLButtonElement;
const formatterBtn = document.getElementById('formatter-btn') as HTMLButtonElement;
const calculatorPanel = document.getElementById('calculator-panel') as HTMLDivElement;
const formatterPanel = document.getElementById('formatter-panel') as HTMLDivElement;
const calculatorForm = document.getElementById('calculator-form') as HTMLFormElement;
const formatterForm = document.getElementById('formatter-form') as HTMLFormElement;
const resultCard = document.getElementById('result-card') as HTMLDivElement;
const resultContent = document.getElementById('result-content') as HTMLDivElement;
const clearResultBtn = document.getElementById('clear-result') as HTMLButtonElement;

// Form elements
const calcOperation = document.getElementById('calc-operation') as HTMLSelectElement;
const calcValue1 = document.getElementById('calc-value1') as HTMLInputElement;
const calcValue2 = document.getElementById('calc-value2') as HTMLInputElement;
const calcValue2Group = document.getElementById('calc-value2-group') as HTMLDivElement;
const calcMultipleGroup = document.getElementById('calc-multiple-group') as HTMLDivElement;
const calcMultiple = document.getElementById('calc-multiple') as HTMLInputElement;

const formatOperation = document.getElementById('format-operation') as HTMLSelectElement;
const formatInput = document.getElementById('format-input') as HTMLTextAreaElement;
const truncateLengthGroup = document.getElementById('truncate-length-group') as HTMLDivElement;
const truncateLength = document.getElementById('truncate-length') as HTMLInputElement;

/**
 * Switch between utility panels
 */
function switchUtility(utility: 'calculator' | 'formatter'): void {
  // Update button states
  calculatorBtn.classList.toggle('active', utility === 'calculator');
  formatterBtn.classList.toggle('active', utility === 'formatter');

  // Update panel visibility
  calculatorPanel.classList.toggle('active', utility === 'calculator');
  formatterPanel.classList.toggle('active', utility === 'formatter');

  // Hide result card when switching
  resultCard.classList.add('hidden');
}

/**
 * Handle calculator operation change
 */
function handleCalcOperationChange(): void {
  const operation = calcOperation.value;
  const singleValueOps = ['sqrt'];
  const twoValueOps = ['subtract', 'divide', 'power', 'percentage'];
  const multipleValueOps = ['add', 'multiply', 'average'];

  if (singleValueOps.includes(operation)) {
    calcValue2Group.classList.add('hidden');
    calcMultipleGroup.classList.add('hidden');
    calcValue2.required = false;
  } else if (twoValueOps.includes(operation)) {
    calcValue2Group.classList.remove('hidden');
    calcMultipleGroup.classList.add('hidden');
    calcValue2.required = true;
  } else if (multipleValueOps.includes(operation)) {
    calcValue2Group.classList.remove('hidden');
    calcMultipleGroup.classList.remove('hidden');
    calcValue2.required = false;
  }
}

/**
 * Handle formatter operation change
 */
function handleFormatOperationChange(): void {
  const operation = formatOperation.value;
  if (operation === 'truncate') {
    truncateLengthGroup.classList.remove('hidden');
  } else {
    truncateLengthGroup.classList.add('hidden');
  }
}

/**
 * Display calculation result
 */
function displayCalculationResult(result: CalculationResult): void {
  resultContent.innerHTML = `
    <div class="result-label">Calculation Result</div>
    <div class="result-value">${result.result}</div>
    <div class="result-details">
      <strong>Operation:</strong> ${result.operation}<br>
      <strong>Expression:</strong> ${result.expression}<br>
      <strong>Time:</strong> ${result.timestamp.toLocaleTimeString()}
    </div>
  `;
  resultCard.classList.remove('hidden');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display error message
 */
function displayError(message: string): void {
  resultContent.innerHTML = `
    <div class="result-label">Error</div>
    <div class="error">${message}</div>
  `;
  resultCard.classList.remove('hidden');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Display format result
 */
function displayFormatResult(result: FormatResult): void {
  const metadata = result.metadata;
  const metadataHtml = metadata
    ? `
      <div class="result-details">
        <strong>Character Count:</strong> ${metadata.characterCount}<br>
        ${metadata.wordCount !== undefined ? `<strong>Word Count:</strong> ${metadata.wordCount}<br>` : ''}
        ${metadata.truncated !== undefined ? `<strong>Truncated:</strong> ${metadata.truncated ? 'Yes' : 'No'}<br>` : ''}
      </div>
    `
    : '';

  resultContent.innerHTML = `
    <div class="result-label">Formatted Text</div>
    <div class="result-value" style="font-size: 1.25rem; font-weight: 600; color: var(--text-primary);">
      ${escapeHtml(result.formatted)}
    </div>
    ${metadataHtml}
    <div class="result-details" style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
      <strong>Operation:</strong> ${result.operation}<br>
      <strong>Original:</strong> ${escapeHtml(result.original)}
    </div>
  `;
  resultCard.classList.remove('hidden');
  resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

/**
 * Handle calculator form submission
 */
function handleCalculatorSubmit(e: Event): void {
  e.preventDefault();

  try {
    const operation = calcOperation.value as any;
    const value1 = parseFloat(calcValue1.value);

    if (isNaN(value1)) {
      displayError('Please enter a valid first value');
      return;
    }

    let result: CalculationResult;

    if (operation === 'sqrt') {
      result = calculator.calculate(operation, value1);
    } else if (['subtract', 'divide', 'power', 'percentage'].includes(operation)) {
      const value2 = parseFloat(calcValue2.value);
      if (isNaN(value2)) {
        displayError('Please enter a valid second value');
        return;
      }
      result = calculator.calculate(operation, value1, value2);
    } else {
      // Multiple values: add, multiply, average
      const value2 = parseFloat(calcValue2.value);
      const multipleValues = calcMultiple.value
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .filter((v) => !isNaN(v));

      const allValues = [value1];
      if (!isNaN(value2)) {
        allValues.push(value2);
      }
      allValues.push(...multipleValues);

      if (allValues.length < 2) {
        displayError('Please enter at least two values');
        return;
      }

      result = calculator.calculate(operation, ...allValues);
    }

    displayCalculationResult(result);
  } catch (error) {
    displayError(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}

/**
 * Handle formatter form submission
 */
function handleFormatterSubmit(e: Event): void {
  e.preventDefault();

  try {
    const operation = formatOperation.value as any;
    const input = formatInput.value.trim();

    if (!input) {
      displayError('Please enter some text to format');
      return;
    }

    const options =
      operation === 'truncate'
        ? { maxLength: parseInt(truncateLength.value) || 50 }
        : undefined;

    const result = formatter.format(operation, input, options);
    displayFormatResult(result);
  } catch (error) {
    displayError(error instanceof Error ? error.message : 'An unknown error occurred');
  }
}

/**
 * Clear result card
 */
function clearResult(): void {
  resultCard.classList.add('hidden');
  resultContent.innerHTML = '';
}

/**
 * Initialize event listeners
 */
function initializeEventListeners(): void {
  // Utility selector buttons
  calculatorBtn.addEventListener('click', () => switchUtility('calculator'));
  formatterBtn.addEventListener('click', () => switchUtility('formatter'));

  // Form submissions
  calculatorForm.addEventListener('submit', handleCalculatorSubmit);
  formatterForm.addEventListener('submit', handleFormatterSubmit);

  // Operation change handlers
  calcOperation.addEventListener('change', handleCalcOperationChange);
  formatOperation.addEventListener('change', handleFormatOperationChange);

  // Clear result button
  clearResultBtn.addEventListener('click', clearResult);

  // Initialize form states
  handleCalcOperationChange();
  handleFormatOperationChange();
}

/**
 * Initialize application when DOM is ready
 */
function initializeApp(): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEventListeners);
  } else {
    initializeEventListeners();
  }
}

// Start the application
initializeApp();

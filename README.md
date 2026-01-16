# Modular Utility Web Application

A browser-based modular utility application built with **HTML**, **CSS**, and **TypeScript** using **ES6+ syntax** for maintainability and error prevention. This single-page application demonstrates modern web development practices with a clean, responsive UI.

## Features

### 🧮 Calculator Utility
- Basic operations (add, subtract, multiply, divide)
- Advanced operations (power, square root, percentage)
- Statistical functions (average)
- Dynamic form based on operation type
- Real-time result display with formatted output

### 📝 Text Formatter Utility
- String transformations (title case, camel case, kebab case, snake case)
- Case conversions (uppercase, lowercase)
- Text manipulation (truncate, reverse, remove spaces)
- Text analysis (word count, character count)
- Metadata display for formatted results

### 🎨 User Interface
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Card-based Layout**: Modern, clean UI with smooth animations
- **Professional Styling**: Gradient background, shadows, and transitions
- **Interactive Forms**: Dynamic form fields based on selected operation
- **Result Display**: Styled output cards with detailed information

## ES6+ Features Demonstrated

- **Arrow Functions**: Used throughout for concise function syntax
- **Template Literals**: For string interpolation and HTML generation
- **Destructuring**: Object and array destructuring
- **Spread Operator**: For function arguments and array operations
- **Classes**: Object-oriented programming with TypeScript
- **ES6 Modules**: Import/export syntax for modular architecture
- **Optional Chaining**: Safe property access
- **Nullish Coalescing**: Default value assignment
- **Map/Set**: Modern data structures

## TypeScript Features

- **Strict Type Checking**: Full type safety enabled
- **Interfaces**: Well-defined contracts for data structures
- **Type Inference**: Leveraging TypeScript's type inference
- **Union Types**: Flexible type definitions for operations
- **Optional Properties**: Flexible object structures
- **DOM Types**: Type-safe DOM manipulation

## Project Structure

```
.
├── index.html              # Main HTML file
├── style.css              # Stylesheet with responsive design
├── src/
│   ├── app.ts             # Main application entry point (DOM handling)
│   ├── types.ts           # TypeScript interfaces and types
│   └── utils/
│       ├── calculator.ts  # Calculator utility module
│       └── textFormatter.ts # Text formatter utility module
├── dist/                  # Compiled JavaScript (generated)
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Build the TypeScript files:
```bash
npm run build
```

3. Start a local server:
```bash
npm start
```

This will open the application in your browser at `http://localhost:8080`

## Development

Watch mode for automatic compilation:
```bash
npm run dev
```

Then serve the files using any static file server (e.g., VS Code Live Server, or run `npm start` in another terminal).

## Usage

### Calculator

1. Select the **Calculator** utility
2. Choose an operation from the dropdown
3. Enter the required values:
   - Single value operations (Square Root): Enter one value
   - Two value operations (Subtract, Divide, Power, Percentage): Enter two values
   - Multiple value operations (Add, Multiply, Average): Enter values separated by commas
4. Click **Calculate** to see the result

### Text Formatter

1. Select the **Text Formatter** utility
2. Choose a format type from the dropdown
3. Enter the text you want to format
4. For truncate operation, specify the maximum length
5. Click **Format Text** to see the formatted result

## Browser Compatibility

- Modern browsers supporting ES2020
- ES6 Modules support required
- Tested on Chrome, Firefox, Edge, and Safari (latest versions)

## Architecture

### Modular Design
- **Separate utility modules**: Each utility is in its own module
- **Type definitions**: Shared types in `types.ts`
- **Main app handler**: `app.ts` handles all DOM events and UI updates
- **Reusable functions**: Helper functions for common operations

### Code Organization
- **Calculator Module**: Pure calculation logic, no DOM dependencies
- **Text Formatter Module**: Pure text transformation logic
- **App Module**: DOM manipulation and event handling
- **Types Module**: Shared TypeScript interfaces

## Styling

The application uses:
- CSS Custom Properties (variables) for theming
- Flexbox and CSS Grid for layout
- CSS Animations for smooth transitions
- Responsive design with media queries
- Modern gradient backgrounds
- Card-based UI components

## Error Handling

- Input validation for all forms
- User-friendly error messages displayed in the UI
- Type-safe operations with TypeScript
- Try-catch blocks for runtime error handling

## License

MIT

# StackGen Frontend

A modern web application for generating full-stack project templates with your preferred technologies.

![StackGen Screenshot](./public/screenshot.png)

## Features

- 🎨 Select from popular frontend frameworks (React, Vue, Next.js, etc.)
- 🔧 Choose your preferred backend technology (Express, NestJS, Fastify, etc.)
- ⚙️ Configure additional features like TypeScript, ESLint, and Tailwind CSS
- 📦 Generate and download a pre-configured project scaffold
- 🧙‍♂️ Get assistance from our built-in coding assistant

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v8 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/stackgen-frontend.git
   cd stackgen-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   VITE_API_URL=https://api.stackgen.dev  # Or your local backend URL
   ```

### Development

Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5173.

### Building for Production

To create a production build:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

## Testing

Run tests with Vitest:
```bash
npm test
```

Run tests in watch mode during development:
```bash
npm run test:watch
```

## Project Structure

```
stackgen-frontend/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable UI components
│   ├── context/          # React context providers 
│   ├── pages/            # Application pages/routes
│   ├── utils/            # Helper functions and utilities
│   ├── styles/           # Global styles
│   ├── types/            # TypeScript type definitions
│   ├── App.tsx           # Main application component
│   └── main.tsx          # Application entry point
├── __tests__/            # Test files
└── vite.config.ts        # Vite configuration
```

## Architecture

StackGen follows a modern React architecture with:

- React for UI rendering
- React Router for client-side routing
- Context API for global state management
- Material UI for component library
- Vite for build tooling and development server
- Vitest for testing

### Key Components

- **App**: The root component that sets up routing and providers
- **WizardContext**: Manages the state for the setup wizard
- **StackContext**: Manages the selected stack configuration
- **Sidebar**: Navigation and application structure
- **SelectStack**: Main interface for configuring projects

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


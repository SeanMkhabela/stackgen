# StackGen Frontend

![Version](https://img.shields.io/badge/version-0.1.0--alpha-blue) ![Status](https://img.shields.io/badge/status-prototype-orange) ![License](https://img.shields.io/badge/license-MIT-green)

> **PROTOTYPE NOTICE**: This project is currently in active development and serves as a portfolio demonstration. Features may be incomplete or subject to change.

A modern web application for generating full-stack project templates with your preferred technologies.

![StackGen Screenshot](./public/screenshot.png)

## Project Status

**Current Version:** 0.1.0-alpha (Prototype)

This project is being actively developed. It serves as both a functional tool and a portfolio piece demonstrating modern web development practices. Updates are made frequently as new features are implemented and existing ones refined.

## Features

- 🎨 Select from popular frontend frameworks (React, Vue, Next.js, etc.)
- 🔧 Choose your preferred backend technology (Express, NestJS, Fastify, etc.)
- ⚙️ Configure additional features like TypeScript, ESLint, and Tailwind CSS
- 📦 Generate and download a pre-configured project scaffold
- 🧙‍♂️ Get assistance from our built-in coding assistant
- 📚 Interactive API documentation with Swagger UI

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

### API Documentation

Access the interactive API documentation at http://localhost:5173/api-docs

This documentation provides details about the available endpoints, request formats, and responses. It includes information about the prototype status and links to the backend Swagger UI for complete API specifications.

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

## Versioning

We use [Semantic Versioning](https://semver.org/) for this project.

- **Current Release**: 0.1.0-alpha (Prototype)
- **Development Status**: Active development
- **Last Updated**: April 2025

### Version History

- **0.1.0-alpha** - Initial prototype release with core features
  - Tech stack selection interface
  - Project generation functionality
  - Basic user authentication
  - API documentation

## Roadmap

- [ ] Enhanced project templates
- [ ] Custom configuration saving
- [ ] Template sharing functionality
- [ ] Collaborative editing features
- [ ] Advanced code generation using AI

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.


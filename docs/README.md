# Event Landing Frontend - Documentation

Welcome to the Event Landing Frontend documentation. This React-based application provides the user interface for the event landing page system, featuring dynamic page generation, admin dashboards, and guest registration forms.

## 📚 Documentation Index

### 🏗️ System Overview

- **[README.md](./README.md)** - This file, frontend system overview
- **[LOCALIZATION.md](./LOCALIZATION.md)** - Internationalization (i18n) system documentation
- **[static-event-page-generator.md](./static-event-page-generator.md)** - Static event page generation system

### 🔗 Backend Integration

- **[../event-landing-backend/docs/README.md](../event-landing-backend/docs/README.md)** - Backend documentation index
- **[../event-landing-backend/docs/PROJECT_OVERVIEW.md](../event-landing-backend/docs/PROJECT_OVERVIEW.md)** - Complete system architecture
- **[../event-landing-backend/docs/DEVELOPMENT_PATTERNS.md](../event-landing-backend/docs/DEVELOPMENT_PATTERNS.md)** - Development patterns and conventions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Backend API running (see backend documentation)
- Environment variables configured

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev
```

### Environment Setup

Create a `.env` file with:

```env
VITE_API_URL=http://localhost:3000
VITE_GOOGLE_CLIENT_ID=your_google_client_id
```

## 🏗️ Architecture Overview

### Technology Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **State Management**: TanStack Query (React Query)
- **Styling**: CSS Modules
- **Internationalization**: i18next
- **Testing**: Vitest + React Testing Library
- **Package Manager**: Bun

### Key Features

- **Dynamic Event Pages**: Generate custom event landing pages
- **Admin Dashboard**: Conference and guest management
- **Guest Registration**: Dynamic forms based on conference configuration
- **Page Builder**: Drag-and-drop page composition
- **Multi-language Support**: Internationalization with i18next
- **Responsive Design**: Mobile-first approach

### Project Structure

```
src/
├── app/                    # Application setup and providers
├── config/                 # Configuration files
├── entities/               # Domain entities and models
├── features/               # Feature-based components
│   ├── admin/             # Admin dashboard features
│   ├── auth/              # Authentication features
│   └── public/            # Public event page features
├── generated/              # Auto-generated API client and types
├── i18n/                   # Internationalization setup
├── pages/                  # Page components
├── shared/                 # Shared utilities and components
│   ├── api/               # API utilities
│   ├── ui/                # Reusable UI components
│   └── utils/             # Utility functions
└── widgets/                # Widget components
```

## 🛠️ Development Guidelines

### Code Organization

- **Feature-based architecture**: Organize code by features rather than technical layers
- **Shared components**: Place reusable components in `shared/ui/`
- **Generated code**: Never edit files in `generated/` directory
- **Type safety**: Use TypeScript strict mode and generated types

### API Integration

- **Generated hooks**: Use hooks from `src/generated/hooks.ts`
- **Error handling**: Centralized in QueryProvider
- **Type safety**: All API types generated from backend schema

### Styling

- **CSS Modules**: Component-scoped styling
- **Responsive design**: Mobile-first approach
- **Design system**: Consistent UI components

### Testing

- No testing is required for frontend

## 📋 Available Scripts

### Development

```bash
bun run dev          # Start development server
bun run build        # Build for production
bun run preview      # Preview production build
```

### Testing

```bash
bun run test         # Run all tests
bun run vitest       # Run Vitest tests
bun run vitest:watch # Run tests in watch mode
bun run typecheck    # Check TypeScript types
```

### Code Quality

```bash
bun run lint         # Run ESLint
bun run prettier:check   # Check Prettier formatting
bun run prettier:write   # Format code with Prettier
```

### Storybook

```bash
bun run storybook        # Start Storybook
bun run storybook:build  # Build Storybook
```

## 🔧 Key Systems

### 1. API Client Generation

The frontend automatically generates API client and React Query hooks from the backend schema. See backend documentation for details.

### 2. Internationalization

Multi-language support using i18next. See [LOCALIZATION.md](./LOCALIZATION.md) for implementation details.

### 3. Static Page Generation

Dynamic event page generation system. See [static-event-page-generator.md](./static-event-page-generator.md) for details.

### 4. Authentication

Google OAuth integration with JWT token management.

### 5. Form System

Dynamic form generation based on conference configuration stored in the database.

## 🎯 Development Patterns

### Component Patterns

- **Functional components** with hooks
- **Props interface** for all components
- **CSS Modules** for styling
- **Error boundaries** for error handling

### State Management

- **React Query** for server state
- **useState/useReducer** for local state
- **Context** for global state when needed

### Error Handling

- **QueryProvider** for API error handling
- **Error boundaries** for component errors
- **User-friendly error messages**

### Performance

- **Code splitting** with React.lazy
- **Memoization** for expensive computations
- **Optimized re-renders** with React.memo

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Issues**
   - Check `VITE_API_URL` environment variable
   - Verify backend is running
   - Check network connectivity

2. **Type Errors**
   - Run `bun run generate:all` in backend
   - Restart TypeScript server
   - Check generated types are up to date

3. **Build Issues**
   - Clear node_modules and reinstall
   - Check for TypeScript errors
   - Verify all dependencies are installed

### Debug Commands

```bash
# Check for TypeScript errors
bun run typecheck

# Check for linting issues
bun run lint

# Run tests
bun run test

# Check generated API client
ls src/generated/
```

## 📞 Getting Help

### Documentation Resources

1. **Backend documentation**: [../event-landing-backend/docs/](../event-landing-backend/docs/)
2. **Development patterns**: [../event-landing-backend/docs/DEVELOPMENT_PATTERNS.md](../event-landing-backend/docs/DEVELOPMENT_PATTERNS.md)
3. **Known issues**: [../event-landing-backend/docs/ISSUES_AND_SOLUTIONS.md](../event-landing-backend/docs/ISSUES_AND_SOLUTIONS.md)

### External Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TanStack Query Documentation](https://tanstack.com/query/latest)
- [i18next Documentation](https://www.i18next.com/)

## 🔄 Contributing

### Development Workflow

1. **Follow established patterns** from backend documentation
2. **Use generated API client** and hooks
3. **Write tests** for new features
4. **Update documentation** when making significant changes
5. **Follow TypeScript strict mode** guidelines

### Code Review Checklist

- [ ] TypeScript types are correct
- [ ] Tests are included
- [ ] Error handling is implemented
- [ ] Performance considerations addressed
- [ ] Documentation updated if needed

---

## 📝 Document History

This documentation was established to:

- **Guide frontend development** with clear patterns
- **Integrate with backend** documentation system
- **Improve developer experience** with comprehensive guidelines
- **Maintain code quality** through consistent practices

**Last Updated**: [Current Date]
**Maintained By**: Development Team
**Review Schedule**: Before each major release

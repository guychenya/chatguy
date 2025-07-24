# ChatGuy - AI Assistant Chat Application

Welcome to ChatGuy! This document provides comprehensive guidance for developers working with this codebase. Whether you're using [Claude Code](https://claude.ai/code) or any other development environment, you'll find everything you need to understand the project structure and get started quickly.

## Development Commands

- ```bash
  npm run dev
  ``` 
  Start Vite development server
- ```bash
  npm run build
  ```
  Lint and build for production (runs lint first)
- ```bash
  npm run lint
  ```
  Run ESLint on all files
- ```bash
  npm run lint:error
  ```
  Run ESLint with quiet mode (errors only)
- ```bash
  npm run preview
  ```
  Preview built application

## Project Architecture

This is a React-based AI assistant chat application built with Vite, featuring a multi-provider AI chat interface.

### Core Architecture

- **Frontend**: React 18 with Vite as build tool
- **Styling**: Tailwind CSS with PostCSS
- **State Management**: React Context API with three main contexts:
  - [`ChatContext`](src/contexts/ChatContext.jsx) - manages conversations, messages, and chat state
  - [`ThemeContext`](src/contexts/ThemeContext.jsx) - handles light/dark theme switching
  - [`SettingsContext`](src/contexts/SettingsContext.jsx) - manages app settings including font size and API keys
- **Storage**: localStorage for persistence of conversations and settings

### Key Components Structure

- **[App.jsx](src/App.jsx)**: Main application shell with 3-panel layout (left sidebar, main content, right panel)
- **[ChatArea.jsx](src/components/ChatArea.jsx)**: Main chat interface with message rendering and file drop support
- **[InputArea.jsx](src/components/InputArea.jsx)**: Message input with file attachment and voice input capabilities
- **[Sidebar.jsx](src/components/Sidebar.jsx)**: Chat history and conversation management
- **[Dashboard.jsx](src/components/Dashboard.jsx)**: Analytics and usage metrics display
- **[SettingsPanel.jsx](src/components/SettingsPanel.jsx)**: Configuration for API keys, models, and preferences

### Multi-Provider API System

The application supports multiple AI providers through a unified API service:

- **Supported Providers**: OpenAI, Anthropic, Gemini, Ollama, Groq, Mistral, Supabase
- **API Service** ([`src/services/apiService.js`](src/services/apiService.js)): Handles provider initialization, connection testing, and message sending
- **Provider Configuration**: Each provider requires specific API key formats and has different default models
- **Mock Implementation**: Currently uses simulated responses for demonstration (real API integration needed)

### Data Flow

```
1. User input → InputArea → ChatContext → apiService → AI Provider
2. Response → ChatContext → ChatArea → MessageBubble rendering
3. Conversations persist to localStorage via storageService
```

### Key Features

- **File Attachments**: Drag & drop interface for file uploads
- **Voice Input**: Speech recognition integration
- **Conversation Management**: Create, delete, and organize chat histories
- **Responsive Design**: 3-panel layout that adapts to different screen sizes
- **Theme System**: Light/dark mode with system preference detection

### Development Notes

- Uses Framer Motion for animations
- React Icons (Feather) for consistent iconography
- SafeIcon component wraps all icons for error handling
- ESLint configured with React hooks and refresh plugins
- Vite configuration includes path aliases (@/ for src/)
# Expense Tracker Application

This is a comprehensive expense tracking application featuring backend, web frontend, and mobile components.

## Project Structure

The project is organized into three main directories:

```
expense-tracker-lab2025/
├── NodeExpressJs/     # Node.js/Express backend
├── ReactApp/          # React web application
└── ReactNative/       # React Native mobile application
```

## NodeExpressJs (Backend)

**Tech Stack:**
- Node.js
- Express.js
- MySQL (via mysql2)
- Authentication (bcrypt, JWT)
- Input validation (Joi)

**Structure:**
```
NodeExpressJs/
├── controllers/     # Request handlers
├── database/        # Database configuration and models
├── middleware/      # Express middleware
├── routes/          # API route definitions
│   ├── authRoutes.js    # Authentication endpoints
│   ├── expenseRoutes.js # Expense management endpoints
│   └── syncRoutes.js    # Data synchronization endpoints
├── server.js        # Server entry point
└── package.json     # Dependencies and scripts
```

**Getting Started:**
```bash
# Navigate to the backend directory
cd NodeExpressJs

# Install dependencies
npm install

# Start the development server with auto-reload
npm run dev

# Or start the production server
npm start
```

The server will run on port 5000 by default or the port specified in your `.env` file.

## ReactApp (Web Frontend)

**Tech Stack:**
- React 19
- React Router v7
- Tailwind CSS
- Axios for API requests

**Structure:**
```
ReactApp/
├── public/          # Static assets
├── src/             # Source code
│   ├── components/  # Reusable UI components
│   ├── layout/      # Layout components
│   ├── lib/         # Utility functions
│   ├── screens/     # Page components
│   ├── styles/      # CSS styles
│   ├── views/       # View components
│   └── App.js       # Main application component
├── package.json     # Dependencies and scripts
├── tailwind.config.js  # Tailwind configuration
└── postcss.config.js   # PostCSS configuration
```

**Getting Started:**
```bash
# Navigate to the web app directory
cd ReactApp

# Install dependencies
npm install

# Start the development server
npm start
```

The web application will be available at http://localhost:3000

## ReactNative (Mobile App)

**Tech Stack:**
- React Native 0.79
- React Navigation 7

**Structure:**
```
ReactNative/
├── android/         # Android-specific files
├── ios/             # iOS-specific files
├── server/          # Server communication
├── utils/           # Utility functions
├── index.js         # Entry point
└── package.json     # Dependencies and scripts
```

**Getting Started:**
```bash
# Navigate to the mobile app directory
cd ReactNative

# Install dependencies
npm install

# Start the Metro bundler
npm start

# In a separate terminal, run on Android
npm run android

# Or run on iOS
npm run ios
```

## Development Workflow

1. Start the backend server first (NodeExpressJs)
2. Run the web client (ReactApp) or mobile app (ReactNative)
3. Make changes in each project as needed
4. Test across all platforms before deploying

## System Requirements

- Node.js >= 18.0.0 (for ReactNative)
- Node.js >= 14.0.0 (for NodeExpressJs)
- npm or yarn
- Android Studio (for Android development)
- Xcode (for iOS development)

## Contributing

When contributing to this repository, please follow the established code patterns in each project.

- Use appropriate ESLint and Prettier configurations
- Maintain consistent styling across the codebase
- Add tests for new features 
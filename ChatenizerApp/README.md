# Chatenizer App

## Descripción
Aplicación de mensajería móvil construida con React Native que permite a los usuarios registrarse, iniciar sesión y enviar mensajes en tiempo real similares a WhatsApp.

## Características
- Registro e inicio de sesión de usuarios
- Lista de conversaciones
- Interfaz de chat similar a WhatsApp
- Mensajes en tiempo real (funcionalidad futura)

## Tecnologías utilizadas
- React Native
- React Navigation
- @react-navigation/stack
- @react-navigation/bottom-tabs
- react-native-screens
- react-native-safe-area-context
- react-native-gesture-handler

## Estructura del proyecto
```
src/
├── components/     # Componentes reutilizables
├── screens/        # Pantallas de la aplicación
│   ├── LoginScreen.js
│   ├── SignupScreen.js
│   ├── ChatListScreen.js
│   └── ChatScreen.js
├── navigation/     # Configuración de navegación
│   └── AppNavigator.js
├── utils/          # Funciones utilitarias
└── assets/         # Recursos estáticos
```

## Pantallas implementadas
- Login: Autenticación de usuarios
- Signup: Registro de nuevos usuarios
- ChatList: Lista de conversaciones
- Chat: Interfaz de mensajería individual

## Instalación
```bash
npm install
```

## Ejecución
### Android:
```bash
npx react-native run-android
```

### iOS:
```bash
npx react-native run-ios
```
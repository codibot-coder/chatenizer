# Plan de Desarrollo - Chatenizer

## Objetivo
Crear una aplicación móvil multiplataforma (Android/iOS) con React Native que tenga funcionalidades de login, signup y chat similar a WhatsApp.

## Componentes Principales

### 1. Autenticación
- Login Screen
- Signup Screen
- Recuperación de contraseña

### 2. Chat
- Lista de contactos/conversaciones
- Vista de chat individual
- Envío y recepción de mensajes
- Indicadores de lectura (mensaje leído/enviado)

### 3. Navegación
- Navegación basada en pestañas (Bottom Tabs)
- Navegación entre pantallas (Stack Navigator)

## Tecnologías a usar
- React Native
- React Navigation
- Firebase (para autenticación y base de datos)
- Socket.io (para mensajería en tiempo real)
- Async Storage (para almacenamiento local)

## Flujo de la aplicación
1. Usuario se registra o inicia sesión
2. Accede a la lista de chats
3. Selecciona un chat para ver la conversación
4. Envía y recibe mensajes en tiempo real
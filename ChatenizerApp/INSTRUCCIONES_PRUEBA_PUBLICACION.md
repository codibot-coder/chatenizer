# Instrucciones para pruebas locales y publicación de Chatenizer

## Configuración para pruebas locales

### 1. Requisitos previos
- Node.js (v14 o superior)
- npm o yarn
- Para Android:
  - Android Studio
  - SDK de Android (API 21 o superior)
  - Emulador o dispositivo físico
- Para iOS:
  - Xcode (macOS)
  - iOS Simulator
  - CocoaPods

### 2. Instalación de dependencias
```bash
cd ChatenizerApp
npm install
```

### 3. Configuración de Firebase

#### 3.1. Crear proyecto en Firebase
1. Ir a https://firebase.google.com/
2. Crear un nuevo proyecto llamado "Chatenizer"
3. Habilitar Authentication (Autenticación)
4. Habilitar Firestore Database
5. Registrar la app para Android e iOS

#### 3.2. Configuración para Android
1. Crear archivo `android/app/google-services.json` con la configuración descargada de Firebase
2. Asegurarse de que el plugin de google-services esté en `android/build.gradle`:
```gradle
buildscript {
  dependencies {
    classpath('com.google.gms:google-services:4.3.15')
  }
}
```

3. Aplicar el plugin en `android/app/build.gradle`:
```gradle
apply plugin: 'com.google.gms.google-services'
```

#### 3.3. Configuración para iOS
1. Crear archivo `ios/ChatenizerApp/GoogleService-Info.plist` con la configuración descargada de Firebase
2. Asegurarse de que Firebase esté en `ios/Podfile`:
```ruby
pod 'Firebase/Auth'
pod 'Firebase/Firestore'
```

### 4. Instalación de dependencias de Firebase
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-firebase/firestore
```

### 5. Actualización del código para usar Firebase

#### 5.1. Crear archivo de configuración de Firebase (`src/utils/firebase.js`):
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-auth-domain",
  projectId: "your-project-id",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
```

#### 5.2. Actualizar LoginScreen para usar Firebase:
```javascript
import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
// ... resto del código

const handleLogin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    // Navegar a la pantalla principal
    navigation.navigate('Main');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

#### 5.3. Actualizar SignupScreen para usar Firebase:
```javascript
import React, { useState } from 'react';
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
// ... resto del código

const handleSignup = async () => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    // Navegar a la pantalla principal
    navigation.navigate('Main');
  } catch (error) {
    Alert.alert('Error', error.message);
  }
};
```

### 6. Ejecución local

#### 6.1. Para Android
```bash
npx react-native run-android
```

#### 6.2. Para iOS
```bash
cd ios && pod install && cd ..
npx react-native run-ios
```

## Preparación para publicación

### 1. Configuración de variables de entorno
Crear archivo `.env` con las credenciales de Firebase:
```
FIREBASE_API_KEY=your-api-key
FIREBASE_AUTH_DOMAIN=your-auth-domain
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_STORAGE_BUCKET=your-storage-bucket
FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
FIREBASE_APP_ID=your-app-id
```

### 2. Configuración para Android

#### 2.1. Generar keystore para producción
```bash
keytool -genkeypair -v -storetype JKS -keystore my-upload-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

#### 2.2. Configurar signing en `android/app/build.gradle`:
```gradle
android {
    ...
    signingConfigs {
        release {
            if (project.hasProperty('MYAPP_UPLOAD_STORE_FILE')) {
                storeFile file(MYAPP_UPLOAD_STORE_FILE)
                storePassword MYAPP_UPLOAD_STORE_PASSWORD
                keyAlias MYAPP_UPLOAD_KEY_ALIAS
                keyPassword MYAPP_UPLOAD_KEY_PASSWORD
            }
        }
    }
    buildTypes {
        release {
            ...
            signingConfig signingConfigs.release
        }
    }
}
```

#### 2.3. Agregar propiedades en `android/gradle.properties`:
```
MYAPP_UPLOAD_STORE_FILE=my-upload-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=*****
MYAPP_UPLOAD_KEY_PASSWORD=*****
```

#### 2.4. Construir APK de producción
```bash
cd android && ./gradlew assembleRelease
```

### 3. Configuración para iOS

#### 3.1. Actualizar bundle identifier en Xcode
- Abrir `ios/ChatenizerApp.xcworkspace` en Xcode
- Cambiar el Bundle Identifier a uno único (ej. com.yourcompany.chatenizer)

#### 3.2. Crear certificados de distribución
- Iniciar sesión en Apple Developer Portal
- Crear App IDs, Provisioning Profiles y Certificates

#### 3.3. Archivar y exportar desde Xcode
- Product → Archive en Xcode
- Distribuir a App Store Connect

### 4. Requisitos para Google Play Store

#### 4.1. Documentación necesaria
- Política de privacidad
- Términos de uso
- Descripción de la app
- Capturas de pantalla (varias dimensiones)
- Icono de la app (1024x1024 px)

#### 4.2. Configuración en Google Play Console
- Crear nueva app
- Subir APK o AAB (bundle)
- Completar detalles de la app
- Subir capturas de pantalla
- Añadir política de privacidad

### 5. Requisitos para Apple App Store

#### 5.1. Documentación necesaria
- Política de privacidad
- Descripción de la app
- Capturas de pantalla (varias dimensiones)
- Icono de la app (1024x1024 px)
- Video preview (opcional)

#### 5.2. Configuración en App Store Connect
- Crear nueva app
- Subir build con Transporter o Xcode
- Completar detalles de la app
- Subir capturas de pantalla
- Añadir política de privacidad

### 6. Consideraciones de seguridad
- No incluir credenciales de Firebase en el código fuente
- Configurar reglas de seguridad de Firestore
- Usar autenticación de usuario
- Validar entradas del usuario

### 7. Pruebas antes de publicar
- Probar en diferentes dispositivos y versiones
- Verificar rendimiento y estabilidad
- Asegurar compatibilidad con diferentes resoluciones
- Probar flujos de usuario completos
- Verificar correcto funcionamiento de notificaciones
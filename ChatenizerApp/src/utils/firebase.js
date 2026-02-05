// src/utils/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Configuración de Firebase (deberás reemplazar estos valores con los tuyos)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-app.firebaseapp.com",
  projectId: "your-app-id",
  storageBucket: "your-app-id.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456789"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Exportar servicios
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
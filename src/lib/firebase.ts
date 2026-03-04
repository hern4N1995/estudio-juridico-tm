import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getDatabase, connectDatabaseEmulator } from 'firebase/database';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);

// Development only: Connect to emulators if in development
if (process.env.NODE_ENV === 'development' && typeof window !== 'undefined') {
  try {
    if (!auth.currentUser && !process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST) {
      // Only attempt to connect if not already connected
      // connectAuthEmulator(auth, 'http://localhost:9099');
      // connectDatabaseEmulator(database, 'localhost', 9000);
      // connectFirestoreEmulator(firestore, 'localhost', 8080);
    }
  } catch (error) {
    // Emulator already connected
  }
}

export default app;

import { auth } from './firebase';
import {
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from 'firebase/auth';
import { User } from './types';

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Configure OAuth providers
googleProvider.addScope('profile');
googleProvider.addScope('email');

facebookProvider.addScope('email');
facebookProvider.addScope('public_profile');

// Convert Firebase User to our User type
export function convertFirebaseUser(firebaseUser: FirebaseUser | null): User | null {
  if (!firebaseUser) return null;
  
  const provider = firebaseUser.providerData[0]?.providerId.split('.')[0] || 'anonymous';
  
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || '',
    displayName: firebaseUser.displayName || 'Anonymous',
    photoURL: firebaseUser.photoURL || undefined,
    provider: provider as 'google' | 'facebook' | 'anonymous',
    createdAt: new Date(firebaseUser.metadata?.creationTime || '').toISOString(),
  };
}

// Sign in with Google
export async function signInWithGoogle(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return convertFirebaseUser(result.user);
  } catch (error) {
    console.error('Google sign in error:', error);
    throw error;
  }
}

// Sign in with Facebook
export async function signInWithFacebook(): Promise<User | null> {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return convertFirebaseUser(result.user);
  } catch (error) {
    console.error('Facebook sign in error:', error);
    throw error;
  }
}

// Sign out
export async function logOut(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Sign out error:', error);
    throw error;
  }
}

// Listen to auth state changes
export function onAuthChange(callback: (user: User | null) => void): () => void {
  return onAuthStateChanged(auth, (firebaseUser) => {
    callback(convertFirebaseUser(firebaseUser));
  });
}

// Get current user
export function getCurrentUser(): User | null {
  const firebaseUser = auth.currentUser;
  return convertFirebaseUser(firebaseUser);
}

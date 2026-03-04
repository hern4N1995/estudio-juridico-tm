'use client';

import { useState } from 'react';
import { signInWithGoogle, logOut } from '@/lib/firebase-auth';
import { User } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut as LogOutIcon, Mail } from 'lucide-react';

interface AuthButtonProps {
  user: User | null;
  onUserChange: (user: User | null) => void;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  showText?: boolean;
  loginText?: string;
}

export function AuthButton({
  user,
  onUserChange,
  variant = 'default',
  size = 'sm',
  showText = true,
  loginText = 'Iniciar sesión',
}: AuthButtonProps) {
  const [loading, setLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);  const handleGoogleSignIn = async () => {
    setShowOptions(false);
    // No setear loading aquí para que el botón siga funcional
    try {
      const user = await signInWithGoogle();
      onUserChange(user);
    } catch (error) {
      console.error('Google sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await logOut();
      onUserChange(null);
      setShowOptions(false);
    } catch (error) {
      console.error('Sign out failed:', error);
    } finally {
      setLoading(false);
    }
  };
  if (user) {
    return (
      <div className="relative">
        <Button
          variant="ghost"
          size={size}
          onClick={() => setShowOptions(!showOptions)}
          className="gap-2"
          disabled={loading}
        >
          <LogOutIcon className="h-4 w-4" />
          {showText && <span>Cerrar sesión</span>}
        </Button>

        {showOptions && (
          <div className="absolute right-0 top-full mt-2 w-48 rounded-lg border border-border bg-card shadow-lg z-50">
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="w-full flex items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-background rounded transition-colors"
            >
              <LogOutIcon className="h-4 w-4" />
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">      <Button
        variant={variant}
        size={size}
        onClick={() => setShowOptions(!showOptions)}
        className="gap-2"
        disabled={loading}
      >
        <LogIn className="h-4 w-4" />
        {showText && <span>{loginText}</span>}
      </Button>{showOptions && (
        <div className="absolute right-0 top-full mt-2 w-56 rounded-lg border border-border bg-card shadow-lg z-50">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-foreground hover:bg-background rounded transition-colors"
          >
            <Mail className="h-4 w-4" />
            Iniciar con Google
          </button>
        </div>
      )}
    </div>
  );
}

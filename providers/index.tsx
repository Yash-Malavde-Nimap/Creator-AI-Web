'use client';

import { Toaster } from 'react-hot-toast';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <QueryProvider>
        {children}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: 'rgba(10, 22, 55, 0.97)',
              color: '#ffffff',
              border: '1.5px solid rgba(100, 150, 220, 0.25)',
              borderRadius: '999px',
              fontSize: '14px',
              backdropFilter: 'blur(12px)',
            },
            success: {
              iconTheme: { primary: '#22c55e', secondary: '#ffffff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#ffffff' },
            },
          }}
        />
      </QueryProvider>
    </ThemeProvider>
  );
}

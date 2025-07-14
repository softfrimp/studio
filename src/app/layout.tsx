// src/app/layout.tsx
'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/cyclewise/SplashScreen';
import { Alegreya } from 'next/font/google';

const alegreya = Alegreya({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-alegreya',
});

// Note: Metadata export is not effective in a 'use client' component.
// For page-specific metadata, define it in page.tsx files.
// export const metadata: Metadata = {
//   title: 'CycleWise',
//   description: 'Track your cycle with wisdom and care.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500); // Splash screen will be visible for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en" className={alegreya.variable}>
      <head>
        <title>CycleWise</title>
        <meta name="description" content="Track your cycle with wisdom and care." />
      </head>
      <body>
        <AuthProvider>
          {showSplash ? <SplashScreen /> : children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

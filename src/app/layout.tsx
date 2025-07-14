// src/app/layout.tsx
'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/cyclewise/SplashScreen';

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
    <html lang="en">
      <head>
        <title>CycleWise</title>
        <meta name="description" content="Track your cycle with wisdom and care." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Alegreya:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <AuthProvider>
          {showSplash ? <SplashScreen /> : children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

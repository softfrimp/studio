// src/app/layout.tsx
'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { useState, useEffect } from 'react';
import { SplashScreen } from '@/components/cyclewise/SplashScreen';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';


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
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <title>CycleWise</title>
        <meta name="description" content="Track your cycle with wisdom and care." />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          {showSplash ? <SplashScreen /> : children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}

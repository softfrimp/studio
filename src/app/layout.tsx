// src/app/layout.tsx
'use client';

import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from '@/context/AuthContext';
import { LoadingProvider } from '@/context/LoadingContext';
import './globals.css';
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

  return (
    <html lang="en" className={alegreya.variable}>
      <head>
        <title>CycleWise</title>
        <meta name="description" content="Track your cycle with wisdom and care." />
      </head>
      <body>
        <AuthProvider>
            <LoadingProvider>
                {children}
                <Toaster />
            </LoadingProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

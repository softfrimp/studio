
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Droplets, Gamepad2, LayoutDashboard, Loader2, HeartPulse, Stethoscope, Music, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Header } from '@/components/cyclewise/Header';

export default function MusicPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
            <SidebarContent>
                <SidebarHeader>
                   <div className="flex items-center gap-2">
                    <Droplets className="h-7 w-7 text-primary" />
                    <h1 className="text-2xl font-headline font-bold text-primary-foreground">
                      CycleWise
                    </h1>
                  </div>
                </SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/">
                                <LayoutDashboard />
                                Dashboard
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/games">
                                <Gamepad2 />
                                Games
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/exercises">
                                <HeartPulse />
                                Exercises
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/ai-nurse">
                                <Stethoscope />
                                AI Nurse
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/music">
                                <Music />
                                Music
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/ovels">
                                <BookOpen />
                                Ovels
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
            <Header />
            <div className="flex h-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg text-center glass">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
                        <Music className="h-8 w-8"/>
                        Relaxing Soundscape
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Unwind with a personalized soundscape designed to help you relax and de-stress.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            scale: [1, 1.02, 1],
                            transition: {
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }
                        }}
                    >
                        <Button asChild size="lg" className="h-14 text-xl">
                            <Link href="https://share.imagica.ai/?q=faa8f82f-aa7c-4a55-8f2e-c1aaffe04355" target="_blank" rel="noopener noreferrer">
                                <Sparkles className="mr-3 h-6 w-6" />
                                Launch Music Player
                            </Link>
                        </Button>
                    </motion.div>
                     <p className="text-xs text-muted-foreground mt-4">
                        You will be redirected to an external website to enjoy the music.
                    </p>
                </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

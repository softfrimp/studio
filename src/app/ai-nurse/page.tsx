
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { Droplets, Gamepad2, LayoutDashboard, Loader2, HeartPulse, Stethoscope, Sparkles } from 'lucide-react';
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

export default function AiNursePage() {
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
                        <SidebarMenuButton asChild isActive>
                            <Link href="/ai-nurse">
                                <Stethoscope />
                                AI Nurse
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <div className="flex h-screen w-full flex-col items-center justify-center p-4">
            <Card className="w-full max-w-lg text-center glass">
                <CardHeader>
                    <CardTitle className="font-headline text-3xl flex items-center justify-center gap-3">
                        <Stethoscope className="h-8 w-8"/>
                        AI Nurse
                    </CardTitle>
                    <CardDescription className="text-lg">
                        Have questions about your health? Click below to chat with our AI-powered health assistant.
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
                            <Link href="https://share.imagica.ai?q=9b6ee42c-5ff2-422a-8cda-6e503ef2aba8" target="_blank" rel="noopener noreferrer">
                                <Sparkles className="mr-3 h-6 w-6" />
                                Launch AI Nurse
                            </Link>
                        </Button>
                    </motion.div>
                     <p className="text-xs text-muted-foreground mt-4">
                        You will be redirected to an external website. Please remember that this AI is for informational purposes only and is not a substitute for professional medical advice.
                    </p>
                </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

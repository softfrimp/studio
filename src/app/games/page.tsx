
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { Droplets, Gamepad2, LayoutDashboard, Loader2, BrainCircuit } from 'lucide-react';

import { Header } from '@/components/cyclewise/Header';
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
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function GamesPage() {
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
                      <SidebarMenuButton asChild isActive>
                          <Link href="/games">
                              <Gamepad2 />
                              Games
                          </Link>
                      </SidebarMenuButton>
                  </SidebarMenuItem>
              </SidebarMenu>
          </SidebarContent>
      </Sidebar>
      <SidebarInset>
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="glass">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <BrainCircuit className="h-6 w-6 text-accent" />
                        Cycle Savvy Quiz
                    </CardTitle>
                    <CardDescription>
                        Test your knowledge about menstrual health.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex justify-center items-center mb-4">
                        <img src="https://images.unsplash.com/photo-1599508704512-2f19efd1e35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwzfHxxdWl6fGVufDB8fHx8MTc1MjQ4MDc4NXww&ixlib=rb-4.1.0&q=80&w=1080" alt="Quiz placeholder" className="rounded-lg shadow-lg" />
                    </div>
                     <p className="text-muted-foreground mb-4">
                        Think you're a period pro? Take our quiz to find out!
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/games/quiz">
                            Play Now
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </main>
      </SidebarInset>
      </div>
  </SidebarProvider>
  );
}

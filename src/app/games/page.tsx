
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { Gamepad2, LayoutDashboard, Loader2 } from 'lucide-react';

import { Header } from '@/components/cyclewise/Header';
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

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
        <Card className="glass">
            <CardHeader>
                <CardTitle className="font-headline text-xl">Games</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">
                    This is where the games will go. Coming soon!
                </p>
                <div className="flex justify-center items-center mt-8">
                     <img src="https://placehold.co/400x300.png" alt="Games placeholder" data-ai-hint="gaming fun" className="rounded-lg shadow-lg" />
                </div>
            </CardContent>
        </Card>
      </main>
      </SidebarInset>
      </div>
  </SidebarProvider>
  );
}

'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Droplets, Gamepad2, LayoutDashboard, Loader2, Home } from 'lucide-react';

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
import { Quiz } from '@/components/cyclewise/Quiz';
import { Button } from '@/components/ui/button';

export default function QuizPage() {
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
        <Quiz />
      </main>
      </SidebarInset>
      </div>
  </SidebarProvider>
  );
}

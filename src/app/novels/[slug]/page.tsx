
'use client';

import { useRouter, useParams, notFound } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { Droplets, Gamepad2, LayoutDashboard, Loader2, HeartPulse, Stethoscope, Music, BookOpen } from 'lucide-react';
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
import { Header } from '@/components/cyclewise/Header';
import { NOVELS } from '@/lib/novels';
import { NovelReader } from '@/components/cyclewise/NovelReader';


export default function NovelPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  const novel = NOVELS.find((n) => n.slug === slug);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);
  
  if (!novel) {
    notFound();
  }

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
                        <SidebarMenuButton asChild>
                            <Link href="/music">
                                <Music />
                                Music
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/novels">
                                <BookOpen />
                                Novels
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <Header />
          <NovelReader novel={novel} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

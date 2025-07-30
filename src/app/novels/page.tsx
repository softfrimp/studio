
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Droplets, Gamepad2, LayoutDashboard, Loader2, HeartPulse, Stethoscope, Music } from 'lucide-react';

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
import { NOVELS } from '@/lib/novels';
import { NovelCoverCard } from '@/components/cyclewise/NovelCoverCard';
import { useLoading } from '@/context/LoadingContext';

export default function NovelsHubPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { showLoader } = useLoading();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSidebarClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    showLoader(() => router.push(href));
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
                            <Link href="/" onClick={(e) => handleSidebarClick(e, '/')}>
                                <LayoutDashboard />
                                Dashboard
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/games" onClick={(e) => handleSidebarClick(e, '/games')}>
                                <Gamepad2 />
                                Games
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/exercises" onClick={(e) => handleSidebarClick(e, '/exercises')}>
                                <HeartPulse />
                                Exercises
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/ai-nurse" onClick={(e) => handleSidebarClick(e, '/ai-nurse')}>
                                <Stethoscope />
                                AI Nurse
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                     <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <Link href="/music" onClick={(e) => handleSidebarClick(e, '/music')}>
                                <Music />
                                Music
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive>
                            <Link href="/novels" onClick={(e) => handleSidebarClick(e, '/novels')}>
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
          <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
            <h1 className="text-4xl font-headline font-bold mb-2">Novels</h1>
            <p className="text-muted-foreground mb-8">A collection of stories to get lost in.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {NOVELS.map((novel) => (
                <NovelCoverCard key={novel.slug} novel={novel} />
              ))}
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

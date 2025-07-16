
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Droplets, Gamepad2, LayoutDashboard, Loader2, BrainCircuit, HeartPulse, Stethoscope, LayoutGrid, SpellCheck, Music } from 'lucide-react';

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
                    <div className="flex justify-center items-center mb-4 p-6 bg-accent/10 rounded-lg">
                        <svg className="w-24 h-24 text-primary" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="currentColor" fillOpacity="0.2"/>
                          <path d="M12 10.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25c-.69 0-1.25.56-1.25 1.25S11.31 10.5 12 10.5zm0-4.5c.69 0 1.25-.56 1.25-1.25S11.31 3.5 12 3.5c-.69 0-1.25.56-1.25 1.25S11.31 6 12 6zm0 9c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25c-.69 0-1.25.56-1.25 1.25S11.31 15 12 15zm0 4.5c.69 0 1.25-.56 1.25-1.25s-.56-1.25-1.25-1.25c-.69 0-1.25.56-1.25 1.25S11.31 19.5 12 19.5zM15 12c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25c0-.69-.56-1.25-1.25-1.25S15 11.31 15 12zm4.5 0c0 .69.56 1.25 1.25 1.25s1.25-.56 1.25-1.25c0-.69-.56-1.25-1.25-1.25S19.5 11.31 19.5 12zM9 12c0 .69-.56 1.25-1.25 1.25S6.5 12.69 6.5 12c0-.69.56-1.25 1.25-1.25S9 11.31 9 12zM4.5 12c0 .69-.56 1.25-1.25-1.25S2 12.69 2 12c0-.69.56-1.25 1.25-1.25S4.5 11.31 4.5 12z" fill="currentColor" fillOpacity="0.4"/>
                          <path d="M12.01 16.5c-2.03 0-3.83-1.17-4.66-3.01H6.5c.89 2.47 3.25 4.26 6.01 4.26s5.12-1.79 6.01-4.26h-.85c-.83 1.84-2.63 3.01-4.66 3.01zM11 7h2v2h-2V7zm0 4h2v6h-2v-6z" fill="currentColor"/>
                        </svg>
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
            <Card className="glass">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <LayoutGrid className="h-6 w-6 text-accent" />
                        Sliding Puzzle
                    </CardTitle>
                    <CardDescription>
                        Unscramble the numbers to solve the puzzle.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex justify-center items-center mb-4 p-6 bg-accent/10 rounded-lg">
                        <LayoutGrid className="w-24 h-24 text-primary" />
                    </div>
                     <p className="text-muted-foreground mb-4">
                        A classic brain teaser to test your logic and speed.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/games/sliding-puzzle">
                            Play Now
                        </Link>
                    </Button>
                </CardContent>
            </Card>
             <Card className="glass">
                <CardHeader>
                    <CardTitle className="font-headline text-xl flex items-center gap-2">
                        <SpellCheck className="h-6 w-6 text-accent" />
                        Word Guess
                    </CardTitle>
                    <CardDescription>
                        Guess the secret word with the help of a hint.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="flex justify-center items-center mb-4 p-6 bg-accent/10 rounded-lg">
                        <SpellCheck className="w-24 h-24 text-primary" />
                    </div>
                     <p className="text-muted-foreground mb-4">
                        A fun game to test your vocabulary and deduction skills.
                    </p>
                    <Button asChild className="w-full">
                        <Link href="/games/word-guess">
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


'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Droplets, Gamepad2, LayoutDashboard, Loader2, HeartPulse, Stethoscope, Link2 } from 'lucide-react';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AiNursePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState('https://share.imagica.ai/?q=9b6ee42c-5ff2-422a-8cda-6e503ef2aba8');
  const [inputValue, setInputValue] = useState(url);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleSetUrl = (e: React.FormEvent) => {
    e.preventDefault();
    // A simple validation to ensure it's a URL-like string
    if (inputValue.startsWith('http://') || inputValue.startsWith('https://')) {
        setUrl(inputValue);
    } else {
        alert('Please enter a valid URL starting with http:// or https://');
    }
  };

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
          <div className="flex h-screen w-full flex-col">
            <Card className="m-4">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Link2 className="h-5 w-5"/>
                        Set AI Nurse Website
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSetUrl} className="flex items-center gap-2">
                        <Input
                            type="url"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="https://example.com"
                        />
                        <Button type="submit">Set Link</Button>
                    </form>
                </CardContent>
            </Card>
            <div className="flex-grow p-4 pt-0">
                <iframe
                    key={url}
                    src={url}
                    className="w-full h-full border rounded-md"
                    title="AI Nurse"
                    allow="camera; microphone"
                ></iframe>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}

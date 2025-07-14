'use client';

import { Droplets, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { SidebarTrigger } from '../ui/sidebar';

export function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <header className="bg-card/60 backdrop-blur-lg border-b border-white/20 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <Droplets className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
          <h1 className="text-2xl sm:text-3xl font-headline font-bold text-primary-foreground">
            CycleWise
          </h1>
        </div>
        {user && (
          <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Log out">
            <LogOut className="h-5 w-5 text-primary-foreground" />
          </Button>
        )}
      </div>
    </header>
  );
}

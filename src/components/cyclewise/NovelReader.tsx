
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { type Novel } from '@/lib/novels';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export function NovelReader({ novel }: { novel: Novel }) {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const currentChapter = novel.chapters[currentChapterIndex];

  const goToChapter = (index: number) => {
    if (index >= 0 && index < novel.chapters.length) {
      setCurrentChapterIndex(index);
    }
  };
  
  useEffect(() => {
    // Scroll to top of content area when chapter changes
    if (contentRef.current) {
        contentRef.current.scrollTo(0, 0);
    }
  }, [currentChapterIndex])

  const ChapterSideNav = () => (
    <div className="flex flex-col h-full">
        <SheetHeader className="p-4 border-b">
            <SheetTitle className="font-headline">{novel.title}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex-grow">
        <nav className="p-4">
            <ul className="space-y-1">
            {novel.chapters.map((chapter, index) => (
                <li key={chapter.title}>
                <Button
                    variant="ghost"
                    onClick={() => goToChapter(index)}
                    className={cn(
                        "w-full justify-start text-left h-auto py-2",
                        index === currentChapterIndex && 'bg-primary/20 text-primary-foreground font-bold'
                    )}
                >
                    {chapter.title}
                </Button>
                </li>
            ))}
            </ul>
        </nav>
        </ScrollArea>
        <div className="p-4 border-t mt-auto">
            <Button variant="outline" asChild className="w-full">
                <Link href="/ovels">
                    <ChevronLeft className="mr-2" />
                    Back to Library
                </Link>
            </Button>
        </div>
    </div>
  );


  return (
    <div className="flex h-[calc(100vh-var(--header-height,4rem))] bg-zinc-50 dark:bg-zinc-900">
      {/* Desktop Sidebar */}
      <aside className="hidden md:block md:w-64 lg:w-72 border-r bg-background h-full">
        <ChapterSideNav />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="flex items-center justify-between p-4 border-b bg-background/80 backdrop-blur-sm">
          {/* Mobile Nav Trigger */}
          <Sheet>
              <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                      <Menu />
                      <span className="sr-only">Open Chapters</span>
                  </Button>
              </SheetTrigger>
              <SheetContent side="left" className="p-0 w-72">
                  <ChapterSideNav />
              </SheetContent>
          </Sheet>
          <div className="text-center flex-1">
            <h1 className="text-xl font-headline font-semibold truncate" title={currentChapter.title}>
              {currentChapter.title}
            </h1>
          </div>
          <div className="w-10 md:hidden" />
        </header>
        
        <ScrollArea className="flex-1" ref={contentRef}>
            <article className="prose prose-lg dark:prose-invert max-w-4xl mx-auto p-6 md:p-10 font-serif leading-relaxed">
                {currentChapter.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </article>
        </ScrollArea>

        <footer className="p-4 border-t bg-background flex items-center justify-between mt-auto">
            <Button 
                variant="outline" 
                onClick={() => goToChapter(currentChapterIndex - 1)}
                disabled={currentChapterIndex === 0}
            >
                <ChevronLeft className="mr-2" />
                Previous
            </Button>
            <span className="text-sm text-muted-foreground">
                Chapter {currentChapterIndex + 1} of {novel.chapters.length}
            </span>
            <Button 
                variant="outline"
                onClick={() => goToChapter(currentChapterIndex + 1)}
                disabled={currentChapterIndex === novel.chapters.length - 1}
            >
                Next
                <ChevronRight className="ml-2" />
            </Button>
        </footer>
      </main>
    </div>
  );
}

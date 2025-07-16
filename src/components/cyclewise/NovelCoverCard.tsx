
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { type Novel } from '@/lib/novels';
import { motion } from 'framer-motion';
import { Button } from '../ui/button';

type NovelCoverCardProps = {
  novel: Novel;
};

export function NovelCoverCard({ novel }: NovelCoverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Link href={`/ovels/${novel.slug}`} passHref>
        <Card className="h-full flex flex-col glass overflow-hidden cursor-pointer group">
          <CardHeader className="p-0">
            <div className="relative aspect-[2/3] w-full">
                <Image
                src={novel.coverImage.src}
                alt={`Cover for ${novel.title}`}
                data-ai-hint={novel.coverImage.hint}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
          </CardHeader>
          <CardContent className="p-4 flex-grow">
            <CardTitle className="font-headline text-xl group-hover:text-primary transition-colors">
              {novel.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">by {novel.author}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button variant="outline" className="w-full">Read Now</Button>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  );
}

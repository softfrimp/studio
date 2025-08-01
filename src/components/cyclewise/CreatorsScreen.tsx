// src/components/cyclewise/CreatorsScreen.tsx

export function CreatorsScreen() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-5xl font-headline font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-pulse-slow">
          Weija Presby JHS
        </h2>
        <div className="flex flex-col md:flex-row md:gap-6 gap-2 mt-2">
            <p className="text-lg font-headline text-muted-foreground animate-pulse-slow animation-delay-100">Lloyd Abban</p>
            <p className="text-lg font-headline text-muted-foreground animate-pulse-slow animation-delay-300">Judith Animle</p>
            <p className="text-lg font-headline text-muted-foreground animate-pulse-slow animation-delay-500">Abiret Adamu</p>
        </div>
      </div>
    </div>
  );
}

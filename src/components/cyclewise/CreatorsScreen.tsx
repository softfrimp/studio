// src/components/cyclewise/CreatorsScreen.tsx

export function CreatorsScreen() {
  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-headline text-muted-foreground">Created by</h2>
        <div className="flex flex-col md:flex-row md:gap-8 gap-2">
            <p className="text-4xl font-headline font-bold text-primary-foreground animate-pulse-slow animation-delay-100">Lloyd Abban</p>
            <p className="text-4xl font-headline font-bold text-primary-foreground animate-pulse-slow animation-delay-300">Judith Animle</p>
            <p className="text-4xl font-headline font-bold text-primary-foreground animate-pulse-slow animation-delay-500">Abiret Adamu</p>
        </div>
      </div>
    </div>
  );
}

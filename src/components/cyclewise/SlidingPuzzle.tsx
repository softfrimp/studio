
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RefreshCw, CheckCircle, Timer } from 'lucide-react';

const GRID_SIZE = 4;
const EMPTY_TILE = GRID_SIZE * GRID_SIZE;
const SOLVED_TILES = Array.from({ length: EMPTY_TILE }, (_, i) => i + 1);

type Tiles = (number | null)[];

// Helper to check if the shuffled puzzle is solvable
const isSolvable = (tiles: number[]): boolean => {
    let inversions = 0;
    const flatTiles = tiles.filter(t => t !== null) as number[];
    for (let i = 0; i < flatTiles.length - 1; i++) {
        for (let j = i + 1; j < flatTiles.length; j++) {
            if (flatTiles[i] > flatTiles[j]) {
                inversions++;
            }
        }
    }
    const emptyRow = Math.floor(tiles.indexOf(EMPTY_TILE) / GRID_SIZE);
    
    // For a 4x4 grid, if the grid width is even, we need to consider the row of the empty space.
    if (GRID_SIZE % 2 === 0) {
        return (inversions + emptyRow) % 2 !== 0;
    }
    // For an odd grid, only the number of inversions matters.
    return inversions % 2 === 0;
};


// Helper to shuffle tiles until a solvable state is found
const shuffleTiles = (): Tiles => {
    let shuffled: number[];
    do {
        shuffled = [...SOLVED_TILES].sort(() => Math.random() - 0.5);
    } while (!isSolvable(shuffled));
    return shuffled;
};

export function SlidingPuzzle() {
    const [tiles, setTiles] = useState<Tiles>([]);
    const [moves, setMoves] = useState(0);
    const [time, setTime] = useState(0);
    const [isSolved, setIsSolved] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setTiles(shuffleTiles());
    }, []);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && !isSolved) {
            interval = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            if(interval) clearInterval(interval);
        }
        return () => {
            if(interval) clearInterval(interval);
        };
    }, [isActive, isSolved, time]);

    const checkSolved = useCallback((currentTiles: Tiles) => {
        for (let i = 0; i < EMPTY_TILE; i++) {
            if (currentTiles[i] !== i + 1) return false;
        }
        return true;
    }, []);

    const moveTile = useCallback((tileIndex: number) => {
        if (isSolved || tiles.length === 0) return;
        if (!isActive) setIsActive(true);

        const emptyIndex = tiles.indexOf(EMPTY_TILE);
        if (emptyIndex === -1) return;

        const tile = tiles[tileIndex];
        if (tile === EMPTY_TILE) return;

        const { row, col } = { row: Math.floor(tileIndex / GRID_SIZE), col: tileIndex % GRID_SIZE };
        const { emptyRow, emptyCol } = { row: Math.floor(emptyIndex / GRID_SIZE), col: emptyIndex % GRID_SIZE };

        // Check for adjacency (not diagonal)
        const isAdjacent = (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
                           (col === emptyCol && Math.abs(row - emptyRow) === 1);

        if (isAdjacent) {
            const newTiles = [...tiles];
            [newTiles[tileIndex], newTiles[emptyIndex]] = [newTiles[emptyIndex], newTiles[tileIndex]]; // Swap
            setTiles(newTiles);
            setMoves(m => m + 1);

            if (checkSolved(newTiles)) {
                setIsSolved(true);
                setIsActive(false);
            }
        }
    }, [tiles, isSolved, isActive, checkSolved]);

    const resetGame = () => {
        setTiles(shuffleTiles());
        setMoves(0);
        setTime(0);
        setIsSolved(false);
        setIsActive(false);
    };

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (tiles.length === 0) {
        return null; // Or a loading state
    }

    return (
        <Card className="glass w-full max-w-md mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Sliding Puzzle</CardTitle>
                <CardDescription>Arrange the tiles in order from 1 to 15.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex justify-between items-center bg-primary/10 p-2 rounded-lg mb-4">
                    <div className="flex items-center gap-2 text-lg font-semibold">
                       <Timer className="h-5 w-5"/>
                       <span>{formatTime(time)}</span>
                    </div>
                     <div className="text-lg font-semibold">
                        Moves: <span className="text-primary">{moves}</span>
                    </div>
                </div>

                <div className="relative grid grid-cols-4 gap-2 p-2 bg-muted rounded-md aspect-square">
                    <AnimatePresence>
                        {tiles.map((tile, index) => (
                            <motion.div
                                key={tile}
                                layout
                                transition={{ duration: 0.15, ease: 'easeInOut' }}
                                onClick={() => moveTile(index)}
                                className={cn(
                                    "flex items-center justify-center select-none aspect-square rounded-md text-2xl font-bold cursor-pointer transition-colors",
                                    tile === EMPTY_TILE ? "bg-muted" : "bg-primary text-primary-foreground shadow-md hover:bg-primary/90",
                                    isSolved && tile !== EMPTY_TILE && "bg-green-500 hover:bg-green-500/90"
                                )}
                            >
                                {tile !== EMPTY_TILE ? tile : ''}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {isSolved && (
                        <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10">
                            <motion.div
                                initial={{ scale: 0.5, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            >
                                <Card className="bg-background p-6 text-center shadow-2xl">
                                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold font-headline">You Win!</h3>
                                    <p className="text-muted-foreground mt-2">Great job solving the puzzle!</p>
                                    <p>Moves: {moves} | Time: {formatTime(time)}</p>
                                    <Button onClick={resetGame} className="mt-4">
                                        <RefreshCw className="mr-2"/>
                                        Play Again
                                    </Button>
                                </Card>
                            </motion.div>
                        </div>
                    )}
                </div>

                <Button onClick={resetGame} variant="outline" className="mt-4 w-full">
                    <RefreshCw className="mr-2" />
                    Reset Game
                </Button>
            </CardContent>
        </Card>
    );
}

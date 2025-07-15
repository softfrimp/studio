
'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RefreshCw, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { WORD_GUESS_LIST, type WordGuess } from '@/lib/constants';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const MAX_MISTAKES = 6;

export function WordGuessGame() {
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [wordData, setWordData] = useState<WordGuess>({ word: '', hint: '' });
    const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

    const incorrectGuesses = guessedLetters.filter(letter => !wordData.word.includes(letter));
    const mistakes = incorrectGuesses.length;

    const initializeGame = useCallback(() => {
        const newWord = WORD_GUESS_LIST[Math.floor(Math.random() * WORD_GUESS_LIST.length)];
        setWordData(newWord);
        setGuessedLetters([]);
        setGameState('playing');
    }, []);

    useEffect(() => {
        initializeGame();
    }, [initializeGame]);
    
    useEffect(() => {
        if (!wordData.word) return;

        const isWordGuessed = wordData.word.split('').every(letter => guessedLetters.includes(letter));
        
        if (isWordGuessed) {
            setGameState('won');
        } else if (mistakes >= MAX_MISTAKES) {
            setGameState('lost');
        }
    }, [guessedLetters, wordData.word, mistakes]);

    const handleGuess = (letter: string) => {
        if (gameState !== 'playing' || guessedLetters.includes(letter)) {
            return;
        }
        setGuessedLetters(prev => [...prev, letter]);
    };

    const maskedWord = wordData.word
        .split('')
        .map(letter => (guessedLetters.includes(letter) ? letter : '_'))
        .join(' ');
    
    return (
        <Card className="glass w-full max-w-2xl mx-auto text-center">
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Guess the Word</CardTitle>
                <CardDescription>Use the keyboard below to guess the secret word.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6">
                <div className="p-4 bg-primary/10 rounded-lg w-full text-center">
                     <p className="flex items-center justify-center gap-2 text-muted-foreground mb-2">
                        <Lightbulb className="h-5 w-5 text-yellow-400" />
                        Hint
                    </p>
                    <p className="font-semibold text-lg text-primary-foreground">{wordData.hint}</p>
                </div>

                <div className="text-4xl font-bold tracking-widest text-foreground">
                    {maskedWord}
                </div>

                <p className="text-muted-foreground">
                    Mistakes: {mistakes} / {MAX_MISTAKES}
                </p>

                <AnimatePresence>
                {gameState !== 'playing' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10"
                    >
                         <Card className="bg-background p-6 text-center shadow-2xl">
                            {gameState === 'won' ? (
                                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                            ) : (
                                <XCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
                            )}
                            <h3 className="text-2xl font-bold font-headline">
                                {gameState === 'won' ? 'You Win!' : 'Game Over'}
                            </h3>
                            <p className="text-muted-foreground mt-2">
                                The word was: <span className="font-bold text-primary">{wordData.word}</span>
                            </p>
                            <Button onClick={initializeGame} className="mt-4">
                                <RefreshCw className="mr-2"/>
                                Play Again
                            </Button>
                        </Card>
                    </motion.div>
                )}
                </AnimatePresence>


                <div className="flex flex-wrap justify-center gap-2">
                    {ALPHABET.map(letter => (
                        <Button
                            key={letter}
                            variant="outline"
                            size="icon"
                            onClick={() => handleGuess(letter)}
                            disabled={guessedLetters.includes(letter) || gameState !== 'playing'}
                            className={cn(
                                'w-10 h-10 text-lg font-bold',
                                guessedLetters.includes(letter) && wordData.word.includes(letter) && 'bg-green-500/80 text-white',
                                guessedLetters.includes(letter) && !wordData.word.includes(letter) && 'bg-destructive/80 text-white'
                            )}
                        >
                            {letter}
                        </Button>
                    ))}
                </div>

                <Button onClick={initializeGame} variant="outline" className="mt-4">
                    <RefreshCw className="mr-2" />
                    New Game
                </Button>

            </CardContent>
        </Card>
    );
}


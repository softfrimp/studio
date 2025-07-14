'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, BrainCircuit, PartyPopper, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { generateQuiz, type QuizQuestion } from '@/ai/flows/quiz-flow';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

type GameState = 'start' | 'loading' | 'playing' | 'results';

export function Quiz() {
  const [gameState, setGameState] = useState<GameState>('start');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const startQuiz = async () => {
    setGameState('loading');
    try {
      const quizData = await generateQuiz('Menstrual Health');
      setQuestions(quizData.questions);
      setScore(0);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setIsCorrect(null);
      setGameState('playing');
    } catch (error) {
      console.error('Failed to generate quiz:', error);
      // Handle error state, maybe show a toast
      setGameState('start');
    }
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return; // Prevent changing answer

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestionIndex].correctAnswerIndex;
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    } else {
      setGameState('results');
    }
  };

  const restartQuiz = () => {
    setGameState('start');
  };

  const progress = (currentQuestionIndex / questions.length) * 100;

  const renderContent = () => {
    switch (gameState) {
      case 'loading':
        return (
          <div className="flex flex-col items-center justify-center text-center h-full gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Generating your quiz...</p>
          </div>
        );
      case 'playing':
        const question = questions[currentQuestionIndex];
        return (
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Progress value={progress} className="w-full mb-4" />
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                {`Question ${currentQuestionIndex + 1}/${questions.length}`}
              </CardTitle>
              <CardDescription className="text-lg pt-2">{question.questionText}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {question.options.map((option, index) => (
                  <Button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={cn(
                      'h-auto whitespace-normal justify-start p-4 text-left',
                      selectedAnswer !== null &&
                        (index === question.correctAnswerIndex
                          ? 'bg-green-500/80 hover:bg-green-500/90'
                          : selectedAnswer === index
                          ? 'bg-red-500/80 hover:bg-red-500/90'
                          : 'bg-muted hover:bg-muted')
                    )}
                  >
                    {option}
                  </Button>
                ))}
              </div>
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 rounded-lg bg-accent/20"
                >
                  <p className="font-bold text-lg mb-2">
                    {isCorrect ? 'Correct!' : 'Not quite!'}
                  </p>
                  <p className="text-muted-foreground">{question.explanation}</p>
                  <Button onClick={nextQuestion} className="mt-4 w-full">
                    {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'See Results'}
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </motion.div>
        );
      case 'results':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center flex flex-col items-center gap-4"
          >
            <PartyPopper className="h-16 w-16 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Quiz Complete!</h2>
            <p className="text-xl text-muted-foreground">
              You scored {score} out of {questions.length}!
            </p>
            <div className="w-full max-w-xs">
                <Button onClick={startQuiz} className="w-full">
                  <RefreshCw className="mr-2" />
                  Play Again
                </Button>
            </div>
          </motion.div>
        );
      case 'start':
      default:
        return (
          <div className="text-center flex flex-col items-center gap-4">
            <BrainCircuit className="h-16 w-16 text-primary" />
            <h2 className="text-3xl font-headline font-bold">Cycle Savvy Quiz</h2>
            <p className="text-muted-foreground max-w-md">
              Test your knowledge about menstrual health with this AI-generated quiz. Are you ready?
            </p>
            <Button onClick={startQuiz} size="lg">
              Start Quiz
            </Button>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto glass min-h-[400px] flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={gameState}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="w-full"
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
}

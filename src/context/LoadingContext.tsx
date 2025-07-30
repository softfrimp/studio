// src/context/LoadingContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplashScreen } from '@/components/cyclewise/SplashScreen';
import { CreatorsScreen } from '@/components/cyclewise/CreatorsScreen';

type LoadingStage = 'splash' | 'creators' | 'done';

interface LoadingContextType {
  showLoader: (callback: () => void) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingStage, setLoadingStage] = useState<LoadingStage>('splash');
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const showLoader = useCallback((callback: () => void) => {
    setLoadingStage('splash');
    
    setTimeout(() => {
      setLoadingStage('creators');
    }, 1500); // Splash screen duration

    setTimeout(() => {
      setLoadingStage('done');
      callback(); // Execute the navigation callback
    }, 3000); // Total duration (splash + creators)
  }, []);

  // Handle initial load animation
  if (isInitialLoad) {
     setTimeout(() => {
      setLoadingStage('creators');
    }, 1500);

    setTimeout(() => {
      setLoadingStage('done');
      setIsInitialLoad(false);
    }, 3000);
  }

  const value = { showLoader };

  return (
    <LoadingContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {loadingStage !== 'done' ? (
          <motion.div
            key={loadingStage}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {loadingStage === 'splash' && <SplashScreen />}
            {loadingStage === 'creators' && <CreatorsScreen />}
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </LoadingContext.Provider>
  );
};

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

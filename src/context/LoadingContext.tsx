// src/context/LoadingContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { SplashScreen } from '@/components/cyclewise/SplashScreen';

type LoadingStage = 'splash' | 'done';

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
      setLoadingStage('done');
      callback(); // Execute the navigation callback
    }, 1500); // Splash screen duration
  }, []);

  // Handle initial load animation
  if (isInitialLoad) {
    setTimeout(() => {
      setLoadingStage('done');
      setIsInitialLoad(false);
    }, 1500);
  }

  const value = { showLoader };

  return (
    <LoadingContext.Provider value={value}>
      <AnimatePresence mode="wait">
        {loadingStage !== 'done' ? (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SplashScreen />
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

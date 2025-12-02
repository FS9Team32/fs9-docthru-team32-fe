'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const ModalContext = createContext(null);

export function ModalProvider({ children }) {
  const [content, setContent] = useState(null);

  const openModal = useCallback((Component, props = {}) => {
    setContent(() => <Component {...props} />);
  }, []);

  const closeModal = useCallback(() => {
    setContent(null);
  }, []);

  const value = {
    openModal,
    closeModal,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
      {content && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeModal}
            aria-hidden="true"
          />
          <div className="relative z-10" onClick={(e) => e.stopPropagation()}>
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }
  return context;
}

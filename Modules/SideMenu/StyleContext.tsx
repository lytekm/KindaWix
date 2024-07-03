/** @jsxImportSource @emotion/react */
import React, { createContext, useState, useContext, useEffect } from 'react';

interface StyleContextProps {
  currentStyle: React.CSSProperties;
  newStyle: React.CSSProperties;
  getValueWithoutPx: (value: string | number | undefined) => string;
  setCurrentStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
  setNewStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

const StyleContext = createContext<StyleContextProps | undefined>(undefined);

export const StyleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStyle, setCurrentStyle] = useState<React.CSSProperties>({});
  const [newStyle, setNewStyle] = useState<React.CSSProperties>({});

  const getValueWithoutPx = (value: string | number | undefined): string => {
    if (typeof value === 'string' && value.endsWith('px')) {
      return value.replace('px', '');
    }
    return value?.toString() || '';
  };

  return (
    <StyleContext.Provider
      value={{
        currentStyle,
        newStyle,
        getValueWithoutPx,
        setCurrentStyle,
        setNewStyle,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
};

export const useStyleContext = () => {
  const context = useContext(StyleContext);
  if (!context) {
    throw new Error('useStyleContext must be used within a StyleProvider');
  }
  return context;
};

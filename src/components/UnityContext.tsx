import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UnityContextType {
  unityProvider: any;
  setUnityProvider: React.Dispatch<React.SetStateAction<any>>;
}

const UnityContext = createContext<UnityContextType | undefined>(undefined);

export const UnityProvider = ({ children }: { children: ReactNode }) => {
  const [unityProvider, setUnityProvider] = useState<any>(null);

  return (
    <UnityContext.Provider value={{ unityProvider, setUnityProvider }}>
      {children}
    </UnityContext.Provider>
  );
};

export const useUnity = (): UnityContextType => {
  const context = useContext(UnityContext);
  if (!context) {
    throw new Error('useUnity must be used within a UnityProvider');
  }
  return context;
};

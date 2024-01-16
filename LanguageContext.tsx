import React, { createContext, ReactNode, useState } from "react";

type LanguageContextType = {
  language: string;
  changeLanguage: (newLanguage: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

type LanguageProviderProps = {
  children: ReactNode;
};

const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState("en");

  const changeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
  };

  const contextValue: LanguageContextType = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

export { LanguageProvider, LanguageContext };

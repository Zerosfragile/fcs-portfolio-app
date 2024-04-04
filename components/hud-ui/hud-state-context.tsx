"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context shape
interface HudStateContextType {
  showNavigation: boolean;
  setShowNavigation: (value: boolean) => void;
  openEmail: boolean;
  setOpenEmail: (value: boolean) => void;
  eventHandlers: {
    showEmail: () => void;
    toggleNavigationVisibility: () => void;
  };
}

// Create the context with default values
const HudStateContext = createContext<HudStateContextType | undefined>(
  undefined
);

// Define the Provider component
interface HudStateProviderProps {
  children: ReactNode;
}

export const HudStateProvider = ({ children }: HudStateProviderProps) => {
  const [showNavigation, setShowNavigation] = useState(false);
  const [openEmail, setOpenEmail] = useState(false);

  // You should define useScrollDirection or adjust based on your implementation
  // useScrollDirection(showNav, setShowNav, 100, userInit);

  const eventHandlers = {
    showEmail: () => {
      setOpenEmail((prev) => !prev);
    },
    toggleNavigationVisibility: () => {
      setShowNavigation((prev) => !prev);
    },
  };

  return (
    <HudStateContext.Provider
      value={{
        showNavigation,
        setShowNavigation,
        openEmail,
        setOpenEmail,
        eventHandlers,
      }}
    >
      {children}
    </HudStateContext.Provider>
  );
};

// Hook for easy consumption of the context
export const useHudState = () => {
  const context = useContext(HudStateContext);
  if (context === undefined) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
};

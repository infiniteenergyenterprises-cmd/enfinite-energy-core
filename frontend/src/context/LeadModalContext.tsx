"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { LeadModal } from "../components/ui/LeadModal";

type LeadModalContextType = {
  isOpen: boolean;
  openModal: (defaultType?: string) => void;
  closeModal: () => void;
  defaultType: string;
};

const LeadModalContext = createContext<LeadModalContextType | undefined>(undefined);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultType, setDefaultType] = useState("CONTACT");

  const openModal = (type: string = "CONTACT") => {
    setDefaultType(type);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <LeadModalContext.Provider value={{ isOpen, openModal, closeModal, defaultType }}>
      {children}
      <LeadModal />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const context = useContext(LeadModalContext);
  if (context === undefined) {
    throw new Error("useLeadModal must be used within a LeadModalProvider");
  }
  return context;
}

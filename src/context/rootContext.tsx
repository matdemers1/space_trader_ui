'use client'
import { createContext, useContext, ReactNode, useState } from 'react';
import {ContractSimple} from "@/types/contract";

interface RootContextProps {
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  acceptedContracts: ContractSimple[];
  setAcceptedContracts: React.Dispatch<React.SetStateAction<ContractSimple[]>>;
}

const RootStore = createContext<RootContextProps | undefined>(undefined);

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [acceptedContracts, setAcceptedContracts] = useState<ContractSimple[]>([]);

  return <RootStore.Provider
    value={{
      data,
      setData,
      acceptedContracts,
      setAcceptedContracts
  }}>{children}</RootStore.Provider>;
};

export const useRootData = () => {
  const context = useContext(RootStore);
  if (!context) {
    throw new Error('useRootData must be used within a RootProvider');
  }
  return context;
};

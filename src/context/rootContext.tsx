'use client'
import { createContext, useContext, ReactNode, useState } from 'react';
import {ContractSimple} from "@/types/contract";
import {Waypoint} from "@/types/waypoint";

interface RootContextProps {
  data: { [key: string]: any };
  setData: React.Dispatch<React.SetStateAction<{ [key: string]: any }>>;
  acceptedContracts: ContractSimple[];
  setAcceptedContracts: React.Dispatch<React.SetStateAction<ContractSimple[]>>;
  systemWaypoints: Waypoint[];
  setSystemWaypoints: React.Dispatch<React.SetStateAction<Waypoint[]>>;
}

const RootStore = createContext<RootContextProps | undefined>(undefined);

export const RootProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [acceptedContracts, setAcceptedContracts] = useState<ContractSimple[]>([]);
  const [systemWaypoints, setSystemWaypoints] = useState<Waypoint[]>([]);

  return <RootStore.Provider
    value={{
      data,
      setData,
      acceptedContracts,
      setAcceptedContracts,
      systemWaypoints,
      setSystemWaypoints
  }}>{children}</RootStore.Provider>;
};

export const useRootData = () => {
  const context = useContext(RootStore);
  if (!context) {
    throw new Error('useRootData must be used within a RootProvider');
  }
  return context;
};

'use client'
import {createContext, useContext, ReactNode, useState, useEffect} from 'react';
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
  const initialData = JSON.parse(localStorage.getItem('data') || '{}');
  const initialContracts = JSON.parse(localStorage.getItem('acceptedContracts') || '[]');
  const initialWaypoints = JSON.parse(localStorage.getItem('systemWaypoints') || '[]');

  const [data, setData] = useState<{ [key: string]: any }>(initialData);
  const [acceptedContracts, setAcceptedContracts] = useState<ContractSimple[]>(initialContracts);
  const [systemWaypoints, setSystemWaypoints] = useState<Waypoint[]>(initialWaypoints);

  // useEffect to save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem('acceptedContracts', JSON.stringify(acceptedContracts));
  }, [acceptedContracts]);

  useEffect(() => {
    localStorage.setItem('systemWaypoints', JSON.stringify(systemWaypoints));
  }, [systemWaypoints]);

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

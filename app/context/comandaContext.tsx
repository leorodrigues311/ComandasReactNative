import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ComandaItem {
  id: string;
  numeroComanda: number;
  nomeItem: string;
  valorUnit: number;
  quantidade: number;
}

interface ComandaContextType {
  itensComanda: ComandaItem[];
  adicionarItens: (novoItem: Omit<ComandaItem, 'id'>) => void;
}

const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

export const ComandaProvider = ({ children }: { children: ReactNode }) => {
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([]);

  const gerarId = () => `item${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const adicionarItens = (novoItem: Omit<ComandaItem, 'id'>) => {
    const novoItemComId = { ...novoItem, id: gerarId() };
    setItensComanda(prevItens => [...prevItens, novoItemComId]);
  };

  return (
    <ComandaContext.Provider value={{ itensComanda, adicionarItens }}>
      {children}
    </ComandaContext.Provider>
  );
};

export const useComanda = () => {
  const context = useContext(ComandaContext);
  if (!context) {
    throw new Error('useComanda deve ser usado dentro de um ComandaProvider');
  }
  return context;
};
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ComandaItem {
  id: string;
  numeroComanda: number;
  nomeItem: string;
  valorUnit: number;
  quantidade: number;
}

interface Comanda {
  nomeComanda: string
  numeroComanda: string
  horaAbertura: string
  valorTotal: number
  statusComanda: string
}

interface ComandaContextType {
  itensComanda: ComandaItem[];
  comandas: Comanda[];
  adicionarItens: (novoItem: Omit<ComandaItem, 'id'>) => void;
  adicionarComanda: (novaComanda: Comanda, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => void;
  removerComanda: (numeroComanda: string, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => void;
  removerItemComanda: (idItem: string, setItensComanda: React.Dispatch<React.SetStateAction<ComandaItem[]>>) => void;
  gerarId: () => string;

}

const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

export const ComandaProvider = ({ children }: { children: ReactNode }) => {

  const gerarId = () => `item${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const adicionarItens = (novoItem: Omit<ComandaItem, 'id'>) => {
    const novoItemComId = { ...novoItem, id: gerarId() };
    setItensComanda(prevItens => [...prevItens, novoItemComId]);
  };

  const [comandas, setComandas] = useState<Comanda[]>([
      { nomeComanda: 'João da Silva', numeroComanda: '1', horaAbertura: '10:42', valorTotal: 134.21, statusComanda: 'ativo' },
    ])

    const [itensComanda, setItensComanda] = useState<ComandaItem[]>([
      { id: gerarId(), numeroComanda: 1, nomeItem: 'Teste grelhado', valorUnit: 12.21, quantidade: 3 },
      { id: gerarId(), numeroComanda: 1, nomeItem: 'Ovo Cozido', valorUnit: 12.00, quantidade: 1 },
      { id: gerarId(), numeroComanda: 1, nomeItem: 'Batata doce', valorUnit: 9.11, quantidade: 2 },
      { id: gerarId(), numeroComanda: 2, nomeItem: 'Pão', valorUnit: 12.21, quantidade: 3 },
      { id: gerarId(), numeroComanda: 3, nomeItem: 'Sopa', valorUnit: 12.21, quantidade: 3 },
    ])
    
    const adicionarComanda = (novaComanda: Comanda, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => {
      setComandas(prevComandas => [...prevComandas, novaComanda]);
    }
    
    const removerComanda = (numeroComanda: string, setComandas: React.Dispatch<React.SetStateAction<Comanda[]>>) => {
      setComandas(prevComandas => prevComandas.filter(comanda => comanda.numeroComanda !== numeroComanda));
    }
 
    const removerItemComanda = (idItem: string, setItensComanda: React.Dispatch<React.SetStateAction<ComandaItem[]>>) => {
      setItensComanda(prevItens => prevItens.filter(item => item.id !== idItem)); // Usando o id único para remover
    }
    
  return (
    <ComandaContext.Provider value={{ itensComanda, comandas, adicionarItens, adicionarComanda, removerComanda, removerItemComanda, gerarId }}>
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
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface ComandaItem {
  id: string;
  numero_comanda: number;
  nomeItem: string;
  valorUnit: number;
  quantidade: number;
}

interface Comanda {
  nome_comanda: string;
  numero_comanda: string;
  hora_abertura: string;
  valorTotal: number;
  status_comanda: string;
}

interface ComandaContextType {
  itensComanda: ComandaItem[];
  comandas: Comanda[];
  adicionarItens: (novoItem: Omit<ComandaItem, 'id'>) => void;
  adicionarComanda: (novaComanda: Comanda) => void;
  removerComanda: (numeroComanda: string) => void;
  removerItemComanda: (idItem: string) => void;
  carregarComandas: () => void;
}

const ComandaContext = createContext<ComandaContextType | undefined>(undefined);

export const ComandaProvider = ({ children }: { children: ReactNode }) => {
  const [comandas, setComandas] = useState<Comanda[]>([]);

  const gerarId = () => `item${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const adicionarItens = (novoItem: Omit<ComandaItem, 'id'>) => {
    const novoItemComId = { ...novoItem, id: gerarId() };
    setItensComanda(prevItens => [...prevItens, novoItemComId]);
  };

  const carregarComandas = async () => {
    fetch('http://192.168.1.104:3333/')
      .then(response => response.json())
      .then(data => {
        console.log('Dados recebidos:', data);
        setComandas(data);
      })
      .catch(error => console.error('Erro ao buscar dados:', error));
  };


  const adicionarComanda = (novaComanda: Comanda) => {
    setComandas(prevComandas => [...prevComandas, novaComanda]);
  };

  const removerComanda = (numero_comanda: string) => {
    setComandas(prevComandas => prevComandas.filter(comanda => comanda.numero_comanda !== numero_comanda));
  };

  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([]);

  const removerItemComanda = (idItem: string) => {
    setItensComanda(prevItens => prevItens.filter(item => item.id !== idItem));
  };

  return (
    <ComandaContext.Provider
      value={{
        itensComanda,
        comandas,
        adicionarItens,
        adicionarComanda,
        removerComanda,
        removerItemComanda,
        carregarComandas
      }}>
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

export default ComandaContext;

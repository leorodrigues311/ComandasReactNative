import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Helper from '@/database/helper/helper'
const helper = new Helper()

interface ComandaItem {
  id: string
  numero_comanda: number
  nomeItem: string
  valorUnit: number
  quantidade: number
}

interface Comanda {
  nome_comanda: string
  numero_comanda: string
  hora_abertura: string
  valor_total: number
  status_comanda: string
}

interface ComandaContextType {
  itensComanda: ComandaItem[]
  comandas: Comanda[]
  adicionarItens: (novoItem: Omit<ComandaItem, 'id'>) => void
  adicionarComanda: (novaComanda: Comanda) => void
  removerComanda: (numeroComanda: string) => void
  removerItemComanda: (idItem: string) => void
  carregarComandas: () => void
}

const ComandaContext = createContext<ComandaContextType | undefined>(undefined)

export const ComandaProvider = ({ children }: { children: ReactNode }) => {

  const [comandas, setComandas] = useState<Comanda[]>([])
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([])

  const gerarId = () => `item${Date.now()}-${Math.floor(Math.random() * 1000)}`

  const adicionarItens = (novoItem: Omit<ComandaItem, 'id'>) => {
    const novoItemComId = { ...novoItem, id: gerarId() }
    setItensComanda(prevItens => [...prevItens, novoItemComId])
  };

  const removerItemComanda = (idItem: string) => {
    setItensComanda(prevItens => prevItens.filter(item => item.id !== idItem))
  };

  const adicionarComanda = (novaComanda: Comanda) => {
    setComandas(prevComandas => [...prevComandas, novaComanda])
  }

  const removerComanda = (numero_comanda: string) => {
    setComandas(prevComandas => prevComandas.filter(comanda => comanda.numero_comanda !== numero_comanda))
  }

  const carregarComandas = async () => {
    try {
      const response = await helper.getComandas()
      console.log(await response)
      const data: Comanda[] = await response
      
      console.log('Dados recebidos no fetch:', data)
      
      setComandas(Object.values(data).map(item => ({
        nome_comanda: item.nome_comanda || "",
        numero_comanda: String(item.numero_comanda || ""),
        hora_abertura: item.hora_abertura || "",
        valor_total: Number(item.valor_total || 0),
        status_comanda: item.status_comanda || "",
      })));
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

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
  )
}

export const useComanda = () => {
  const context = useContext(ComandaContext)
  if (!context) {
    throw new Error('useComanda deve ser usado dentro de um ComandaProvider')
  }
  return context
}

export default ComandaContext

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import Helper from '@/database/helper/helper.js'
const helper = new Helper()

// aqui delcaramos os tipos de cada parâmetro

interface ComandaItem {
  id: string
  comanda_id: string
  item_nome: string
  valor_unit: number
  quantidade: number
}

interface Comanda {
  nome_comanda: string
  numero_comanda: string
  hora_abertura: string
  valor_total: number
  status_comanda: string
}

interface ItemCarrinho {
  id: string
  item_nome: string
  item_codigo: number
  quantidade: number
}

interface Produto {
  nome_produto: string
  codigo_produto: number
  estoque_produto: number
  valor_venda: number
  imagem?: string
}

interface ComandaContextType {
  itensComanda: ComandaItem[]
  comandas: Comanda[]
  itensCarrinho: ItemCarrinho[]
  itensSelecionados: number[]
  produtos: Produto[]
  adicionarItens: (novoItem: ComandaItem) => void
  adicionarComanda: (novaComanda: Comanda) => void
  removerComanda: (numeroComanda: string) => void
  removerItemComanda: (idItem: string) => void
  carregaComandas: () => void
  carregaItens: () => void
  carregaProdutos: () => void
  setItensSelecionados: (itemId: number[]) => void
  limpaItensSelecionados: () => void
  adicionarItensCarrinho: (novoItemCarrinho: Omit<ItemCarrinho, 'id'>) => void
  removerItemCarrinho: (id:string) => void
}
// fim da declaração dos tipos

// aqui instanciamos o context (função que permite usar as funções em outros docs)
const ComandaContext = createContext<ComandaContextType | undefined>(undefined)


export const ComandaProvider = ({ children }: { children: ReactNode }) => {

  // estes são os useState's de cada parte, eles adicionam e removem itens dos arrays
  const [comandas, setComandas] = useState<Comanda[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([])
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<number[]>([])

  // aqui nós temos uma função para gerar id's únicos para os itens
  const gerarId = () => `item${Date.now()}-${Math.floor(Math.random() * 1000)}`


// ============= Itens =====================

  // essa função traz os itens daquela comanda no banco de dados
  const carregaItens = async () => {
    try {
      const response = await helper.getItensComanda()
      const data: ComandaItem[] = response
      
      setItensComanda(Object.values(data).map(item => ({
        id: item.id || "",
        item_nome: item.item_nome,
        comanda_id: String(item.comanda_id || ""),
        valor_unit: Number(item.valor_unit || 0),
        quantidade: Number(item.quantidade || 0),
      })));
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  // essa função adiciona itens à comanda (ela adiciona primeiro no banco, depois pega a resposta do banco e adiciona no array)
  const adicionarItens = async (novoItem: ComandaItem) => {
    try {
      const response = await helper.postItemComanda(
        novoItem.id,
        novoItem.comanda_id,
        novoItem.item_nome,
        novoItem.valor_unit,
        novoItem.quantidade
      )
      if (response) {
        setItensComanda(prevItens => [...prevItens, novoItem])
      }
    } catch (error) {
      console.error('Erro ao adicionar itens:', error)
    }
  }

  // aqui adicionamos itens ao carrinho, antes de adicionar à comanda
  const adicionarItensCarrinho = (novoItemCarrinho: Omit<ItemCarrinho, 'id'>) => {
    const itemCarrinhoComId = { ...novoItemCarrinho, id: gerarId() }
    setItensCarrinho((prevItems) => [...prevItems, itemCarrinhoComId]);
  }

  // essa função remove os itens do carrinho
  const removerItemCarrinho = (id: string) => {
    setItensCarrinho(prevItems => prevItems.filter(item => item.id !== id));
  }
  
  // essa função remove os itens da comanda
  const removerItemComanda = (id: string) => {
    setItensComanda(prevItens => prevItens.filter(item => item.id !== id))
  }

  // aqui nós limpamos o array de seleção de itens
  const limpaItensSelecionados = () => {
    setItensSelecionados([])
  }

//============= Fim Itens =====================


//============= Comanda =====================

  // essa função adiciona uma comanda nova (ela adiciona primeiro no banco, depois usa a resposta pra adicionar ao array local)
  const adicionarComanda = async (novaComanda: Comanda) => {
    try {
      const response = await helper.postComanda(
        novaComanda.nome_comanda,
        novaComanda.numero_comanda,
        novaComanda.hora_abertura,
        novaComanda.status_comanda,
        novaComanda.valor_total
      )
      if (response) {
        setComandas(prevComandas => [...prevComandas, response])
      }
    } catch (error) {
      console.error('Erro ao adicionar comanda:', error)
    }
  }
  
  // aqui removemos uma comanda do array local (modificar)
  const removerComanda = (numero_comanda: string) => {
    setComandas(prevComandas => prevComandas.filter(comanda => comanda.numero_comanda !== numero_comanda))
  }

  // aqui trazemos as comandas do banco de dados
  const carregaComandas = async () => {
    try {
      const response = await helper.getComandas()
      const data: Comanda[] = response
      
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

//============= Fim Comanda =====================

//============= Produtos =====================

  // aqui trazemos as comandas do banco de dados
  const carregaProdutos = async () => {
    try {
      const response = await helper.getProdutos()
      const data: Produto[] = response
      
      setProdutos(Object.values(data).map(item => ({
        nome_produto: item.nome_produto || "",
        codigo_produto: Number(item.codigo_produto) || 0,
        estoque_produto: Number(item.estoque_produto) || 0,
        valor_venda: Number(item.valor_venda) || 0,
        imagem: item.imagem || "",
      })));
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

//============= Fim Produtos =====================

  // aqui precisamos passar as funções que queremos usar em outros documentos
  return (
    <ComandaContext.Provider
      value={{
        itensComanda,
        comandas,
        itensCarrinho,
        itensSelecionados,
        produtos,
        adicionarItensCarrinho,
        removerItemCarrinho,
        limpaItensSelecionados, 
        adicionarItens,
        adicionarComanda,
        removerComanda,
        removerItemComanda,
        carregaComandas,
        carregaItens,
        setItensSelecionados,
        carregaProdutos
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

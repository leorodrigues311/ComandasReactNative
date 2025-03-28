import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import uuid from 'react-native-uuid';
import Helper from '@/database/helper/helper.js'
const helper = new Helper()

// aqui delcaramos os tipos de cada parâmetro
interface ComandaItem {
  item_uuid: string
  comanda_uuid: string
  item_nome: string
  valor_unit: number
  quantidade: number
}

interface Comanda {
  comanda_uuid: string
  nome_comanda: string
  numero_comanda: string
  hora_abertura: string
  valor_total: number
  status_comanda: string
  usuario_responsavel: string
  usuario_responsavel_id: number
}

interface ItemCarrinho {
  item_uuid: string
  item_nome: string
  item_codigo: number
  quantidade: number
  valor_unit: number
}

interface Produto {
  nome_produto: string
  codigo_produto: number
  estoque_produto: number
  valor_venda: number
  imagem?: string
}

interface Usuario {
  id: number
  cnpj_loja: string
  usuario_nome: string
  usuario_grupo_acesso: string
  usuario_senha: string
}

interface ComandaContextType {
  itensComanda: ComandaItem[]
  comandas: Comanda[]
  comandaSelecionada: Comanda | null
  itensCarrinho: ItemCarrinho[]
  produtos: Produto[]
  usuarios: Usuario[] | null
  usuarioSelecionado: Usuario | null
  adicionarItens: (novoItem: ComandaItem) => void
  adicionarComanda: (novaComanda: Comanda) => void
  removerComanda: (numeroComanda: string) => void
  removerItemComanda: (idItem: string) => void
  carregaComandas: () => void
  carregaItens: () => void
  carregaProdutos: () => void
  limpaCarrinho: () => void
  adicionarItensCarrinho: (novoItemCarrinho: Omit<ItemCarrinho, 'id'>) => void
  removerItemCarrinho: (id:string) => void
  setComandaSelecionada: (comandaSelecionada: Comanda | null) => void
  setusuarioSelecionado: (setusuarioSelecionado: Usuario | null) => void
  gerarIdComanda: () => string
  gerarData: (hora: string) => string
  carregaUsuarios: () => void
  formataValor: (valor_total: number) => string
  mudaQuantidade: (id: string, tipo: 'soma' | 'subtrai' ) => void
}
// fim da declaração dos tipos

// aqui instanciamos o context (função que permite usar as funções em outros docs)
const ComandaContext = createContext<ComandaContextType | undefined>(undefined)


export const ComandaProvider = ({ children }: { children: ReactNode }) => {

  // estes são os useState's de cada parte, eles adicionam e removem itens dos arrays
  const [comandas, setComandas] = useState<Comanda[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([])
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null);
  const [usuarioSelecionado, setusuarioSelecionado] = useState<Usuario | null>(null);
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);

// ============= Geradores =====================

  // aqui nós temos uma função para gerar id's únicos para os itens e para as comandas
  const gerarId = () => `item`+uuid.v4()
  const gerarIdComanda = () => uuid.v4();

  const gerarData = (hora: string): string => {
    const agora = new Date();
    const dataAbertura = new Date(hora.split(' ')[0].split('/').reverse().join('-') + 'T' + hora.split(' ')[1]);

    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const segundos = String(agora.getSeconds()).padStart(2, '0');

    // Verificar se a data é igual à data de hoje
    const mesmaData =
      dataAbertura.getDate() === agora.getDate() &&
      dataAbertura.getMonth() === agora.getMonth() &&
      dataAbertura.getFullYear() === agora.getFullYear();

    // Retornar apenas a hora e os minutos
    if (mesmaData) {
      return hora.split(' ')[1].slice(0, 5);
    } 
    // utilize 'completo' para gerar a data para salvar no banco de dados
    else if (hora ==='completo') {
      return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    }
    else{
      // Formatar sem os segundos
      const [dataParte, horaParte] = hora.split(' ');
      const horaSemSegundos = horaParte.slice(0, 5);
      return `${dataParte} ${horaSemSegundos}`;
    }
  }

  const formataValor: (valor_total: number) => string = (valor_total) => {
    return valor_total.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
// ============= Fim Geradores =====================


// ============= Itens =====================

  // essa função traz os itens daquela comanda no banco de dados
  const carregaItens = async () => {
    try {
      const response = await helper.getItensComanda()
      const data: ComandaItem[] = response
      
      setItensComanda(Object.values(data).map(item => ({
        item_uuid: item.item_uuid || "",
        item_nome: item.item_nome,
        comanda_uuid: String(item.comanda_uuid || ""),
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
        novoItem.item_uuid,
        novoItem.comanda_uuid,
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
    const itemCarrinhoComId = { ...novoItemCarrinho, item_uuid: gerarId() }
    setItensCarrinho((prevItems) => [...prevItems, itemCarrinhoComId]);
  }

  // essa função remove os itens do carrinho
  const removerItemCarrinho = (id: string) => {
    setItensCarrinho(prevItems => prevItems.filter(item => item.item_uuid !== id));
  }

  // essa função remove os itens do carrinho
  const mudaQuantidade = (id: string, tipo: 'soma' | 'subtrai') => {
    setItensCarrinho(prevItems =>
      prevItems.map(item =>
        item.item_uuid === id
          ? {
              ...item,
              quantidade:
                tipo === 'soma'
                  ? item.quantidade + 1
                  : item.quantidade > 1
                  ? item.quantidade - 1
                  : 1, // mantém no mínimo 1
            }
          : item
      )
    )
  }

  // essa função remove os itens da comanda
  const removerItemComanda = (id: string) => {
    setItensComanda(prevItens => prevItens.filter(item => item.item_uuid !== id))
  }

  // aqui nós limpamos o array de seleção de itens
  const limpaCarrinho = () => {
    setItensCarrinho([]);
  }

//============= Fim Itens =====================


//============= Comanda =====================

  // essa função adiciona uma comanda nova (ela adiciona primeiro no banco, depois usa a resposta pra adicionar ao array local)
  const adicionarComanda = async (novaComanda: Comanda) => {
    try {
      const response = await helper.postComanda(
        novaComanda.nome_comanda,
        novaComanda.comanda_uuid,
        novaComanda.numero_comanda,
        novaComanda.hora_abertura,
        novaComanda.status_comanda,
        novaComanda.valor_total,
        novaComanda.usuario_responsavel,
        novaComanda.usuario_responsavel_id
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
        comanda_uuid: item.comanda_uuid || "",
        nome_comanda: item.nome_comanda || "",
        numero_comanda: String(item.numero_comanda || ""),
        hora_abertura: item.hora_abertura || "",
        valor_total: Number(item.valor_total || 0),
        status_comanda: item.status_comanda || "",
        usuario_responsavel: item.usuario_responsavel || "",
        usuario_responsavel_id: item.usuario_responsavel_id || 0
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

//============= Usuarios =====================

const carregaUsuarios = async () => {
  try {
    const response = await helper.getUsuarios()
    const data: Usuario[] = response
    
    setUsuarios(Object.values(data).map(item => ({
      id: item.id || 0,
      cnpj_loja: item.cnpj_loja || "",
      usuario_nome: item.usuario_nome || "",
      usuario_grupo_acesso: item.usuario_grupo_acesso || "",
      usuario_senha: item.usuario_senha || "",
    })));

  } catch (error) {
    console.error('Erro ao buscar dados:', error)
  }
}

//============= Fim Usuarios =====================


  // aqui precisamos passar as funções que queremos usar em outros documentos
  return (
    <ComandaContext.Provider
      value={{
        itensComanda,
        comandas,
        itensCarrinho,
        produtos,
        comandaSelecionada,
        usuarios,
        usuarioSelecionado,
        adicionarItensCarrinho,
        removerItemCarrinho,
        limpaCarrinho, 
        adicionarItens,
        adicionarComanda,
        removerComanda,
        removerItemComanda,
        carregaComandas,
        carregaItens,
        carregaProdutos,
        setComandaSelecionada,
        gerarIdComanda,
        gerarData,
        carregaUsuarios,
        setusuarioSelecionado,
        formataValor,
        mudaQuantidade
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

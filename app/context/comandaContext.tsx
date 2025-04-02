import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import uuid from 'react-native-uuid';
import Helper from '@/database/helper/helper.js'
const helper = new Helper()

// aqui delcaramos os tipos de cada parâmetro
interface ComandaItem {
  item_uuid: number
  item_id: number
  comanda_uuid: string
  item_nome: string
  valor_unit: number
  quantidade: number
  item_status?: boolean,
  hora_inclusao?: string
  hora_exclusao?: string
}

interface ComandaItem2 {
  itenscomandaid: number
  itenscomandacomandaid: string
  itenscomandaprodutoid: number
  itenscomandaprodutodescricao: string
  itenscomandavalorproduto: number
  itenscomandaqtd: number
  item_status?: boolean,
  itenscomandadatainclusao?: string
  hora_exclusao?: string
}

interface Comanda {
  comanda_uuid: string
  nome_comanda: string
  numero_comanda: string
  hora_abertura: string
  valor_total?: number | 0
  status_comanda: string
  usuario_responsavel?: string | ''
  usuario_responsavel_id: number
}

interface Comanda2 {
  comandaid: number
  comandanumero: number
  comandadatacriacao: string
  comandastatus: string
  comandaaberturadata: string
  comandaaberturafuncionarioid: number
  comandafechamentodata: string
  comandafechamentofuncionarioid: number
  comandafechamentocaixaid: number
  comandadetalhe: string
  comandadivisao: number
}

interface ItemCarrinho {
  item_uuid?: number
  item_id: number
  item_nome: string
  item_codigo: number
  quantidade: number
  valor_unit: number
  item_status: boolean
  hora_inclusao: string
}

interface Produto {
  nome_produto: string
  codigo_produto: number
  estoque_produto: number
  valor_venda: number
  imagem?: string
}

interface Produto2{
  produtodescricao: string
  produtocodigobarra: string
  produtovalorvenda: number
  produtoqtdestoque: number
  produtocodigo: number
  produtoimagem?: string
}

interface Usuario {
  id: number
  cnpj_loja?: string
  usuario_nome: string
  usuario_grupo_acesso: string
  usuario_senha: string
}

interface Usuario2 {
  funcionarioid: number
  funcionariologin: string
  funcionariogrupoacesso: string
  funcionariosenha: string
}

interface ComandaContextType {
  itensComanda: ComandaItem[]
  comandas: Comanda[]
  comandaSelecionada: Comanda | null
  itensCarrinho: ItemCarrinho[]
  produtos: Produto[]
  usuarios: Usuario[] | null
  usuarioSelecionado: Usuario | null
  selectedItems: String[] | null
  adicionarItens: (novoItem: ComandaItem) => void
  adicionarComanda: (novaComanda: Comanda) => void
  removerComanda: (numeroComanda: string) => void
  carregaComandas: () => void
  carregaItens: () => void
  carregaProdutos: () => void
  limpaCarrinho: () => void
  adicionarItensCarrinho: (novoItemCarrinho: Omit<ItemCarrinho, 'id'>) => void
  removerItemCarrinho: (id:number) => void
  setComandaSelecionada: (comandaSelecionada: Comanda | null) => void
  setusuarioSelecionado: (setusuarioSelecionado: Usuario | null) => void
  gerarIdComanda: () => string
  gerarData: (hora: string) => string
  carregaUsuarios: (cnpj:string) => void
  formataValor: (valor_total: number) => string
  mudaQuantidade: (id: number, tipo: 'soma' | 'subtrai' ) => void
  toggleLongPressItens: (id: string) => void
  limparSelecao: () => void
  removerItens: (item: ComandaItem[]) => void
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
  const [selectedItems, setSelectedItems] = useState<string[]>([])

// ============= Geradores =====================

  // aqui nós temos uma função para gerar id's únicos para os itens e para as comandas
  const gerarId = () => `item`+uuid.v4()
  const gerarIdComanda = () => uuid.v4();

  const gerarData = (hora: string): string => {
    const agora = new Date();
    const dataAbertura = new Date((hora || "").split("-")[0].split('/').reverse().join('-') + 'T' + (hora || "").split("-")[1]);

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
      return (hora || "").split("-")[1].slice(0, 5);
    } 
    // utilize 'completo' para gerar a data para salvar no banco de dados
    else if (hora ==='completo') {
      return `${dia}/${mes}/${ano} ${horas}:${minutos}:${segundos}`;
    }
    else{
      // Formatar sem os segundos
      const [dataParte, horaParte] = (hora || "").split("-");
      const horaSemSegundos = (horaParte || "").slice(0, 5);
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
      const data: ComandaItem2[] = response
      

      const itens = data.map(item => ({
        item_uuid: item.itenscomandaid || 0,
        item_nome: item.itenscomandaprodutodescricao,
        item_id: item.itenscomandaprodutoid || 0,
        comanda_uuid: String(item.itenscomandacomandaid || ""),
        valor_unit: Number(item.itenscomandavalorproduto || 0),
        quantidade: Number(item.itenscomandaqtd || 0),
        hora_inclusao: item.itenscomandadatainclusao
      }))

      setItensComanda(itens)

    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

  const toggleLongPressItens = async (item_uuid:string) => {
    setSelectedItems(prevSelected =>
      prevSelected.includes(item_uuid)
        ? prevSelected.filter(item => item !== item_uuid)
        : [...prevSelected, item_uuid]
    )
  }

  const limparSelecao = () => {
    setSelectedItems([])
  }

  // essa função adiciona itens à comanda (ela adiciona primeiro no banco, depois pega a resposta do banco e adiciona no array)
  const adicionarItens = async (novoItem: ComandaItem) => {
    try {
      const response = await helper.postItemComanda(
        novoItem.item_uuid,
        novoItem.comanda_uuid,
        novoItem.item_id,
        novoItem.quantidade,
        novoItem.valor_unit,
        (novoItem.valor_unit * novoItem.quantidade),
        novoItem.hora_inclusao,
        novoItem.item_nome
      )
      if (response) {
        setItensComanda(prevItens => [...prevItens, novoItem])
      }
    } catch (error) {
      console.error('Erro ao adicionar itens:', error)
    }
  }

  const removerItens = async (itens: ComandaItem[]) => {
    try {
      for (const item of itens) {
        const response = await helper.deleteItemComanda(
          item.comanda_uuid,
          item.item_uuid
        );
  
        if (response) {
          carregaItens()
        }
      }
    } catch (error) {
      console.error("Erro ao remover itens:", error);
    }
  }

  // aqui adicionamos itens ao carrinho, antes de adicionar à comanda
  const adicionarItensCarrinho = (novoItemCarrinho: ItemCarrinho) => {
    setItensCarrinho((prevItems) => [...prevItems, novoItemCarrinho]);
  }

  // essa função remove os itens do carrinho
  const removerItemCarrinho = (id: number) => {
    setItensCarrinho(prevItems => prevItems.filter(item => item.item_uuid !== id));
  }

  // essa função remove os itens do carrinho
  const mudaQuantidade = (id: number, tipo: 'soma' | 'subtrai') => {
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
      const response = await helper.getComandas();
      const data: Comanda2[] = response;

      const novasComandas = data.map((item) => ({
        comanda_uuid: String(item.comandaid || ""),
        nome_comanda: item.comandadetalhe || "",
        numero_comanda: String(item.comandanumero || ""),
        hora_abertura: String(item.comandaaberturadata || ""),
        status_comanda: String(item.comandastatus || ""),
        usuario_responsavel_id: item.comandaaberturafuncionarioid || 0,
      }));
  
      setComandas(novasComandas);
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };
  


//============= Fim Comanda =====================

//============= Produtos =====================

  // aqui trazemos as comandas do banco de dados
  const carregaProdutos = async () => {
    try {
      const response = await helper.getProdutos()
      const data: Produto2[] = response
      
     const produtos = data.map(item => ({
        nome_produto: item.produtodescricao || "",
        codigo_produto: Number(item.produtocodigo) || 0,
        estoque_produto: Number(item.produtoqtdestoque) || 0,
        valor_venda: Number(item.produtovalorvenda) || 0,
        imagem: item.produtoimagem || "",
      }))

      setProdutos(produtos)
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
    }
  }

//============= Fim Produtos =====================

//============= Usuarios =====================

const carregaUsuarios = async (/*cnpj: string*/) => {
  try {
    const response = await helper.getUsuarios(/*cnpj*/)
    const data: Usuario2[] = response
    
    const usuarios =  data.map(item => ({
      id: item.funcionarioid || 0,
      usuario_nome: item.funcionariologin || "",
      usuario_grupo_acesso: item.funcionariogrupoacesso|| "",
      usuario_senha: item.funcionariosenha|| "",
    }))

    setUsuarios(usuarios)

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
        selectedItems,
        adicionarItensCarrinho,
        removerItemCarrinho,
        limpaCarrinho, 
        adicionarItens,
        adicionarComanda,
        removerComanda,
        carregaComandas,
        carregaItens,
        carregaProdutos,
        setComandaSelecionada,
        gerarIdComanda,
        gerarData,
        carregaUsuarios,
        setusuarioSelecionado,
        formataValor,
        mudaQuantidade,
        toggleLongPressItens,
        limparSelecao,
        removerItens
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

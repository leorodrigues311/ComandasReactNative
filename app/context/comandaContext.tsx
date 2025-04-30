import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import uuid from 'react-native-uuid';
import Helper from '@/database/helper/helper'
import AsyncStorage from '@react-native-async-storage/async-storage';
const helper = new Helper()

// aqui delcaramos os tipos de cada parâmetro
interface ComandaItem {
  item_uuid?: string
  item_id: string
  comanda_uuid: string
  comanda_id: number
  item_nome: string
  valor_unit: number
  quantidade: number
  item_status?: boolean,
  hora_inclusao?: string
  hora_exclusao?: string
}

interface ComandaItem2 {
  itenscomandaid: number
  itemuuid: string
  comandauuid: string
  itenscomandacomandaid: number
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
  comanda_id?: number
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
  comandauuid: string
  comandanumero: number
  comandadatacriacao: string
  valor_total_comanda: number
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
  item_uuid?: string
  item_id: string
  item_nome: string
  item_codigo: number
  quantidade: number
  valor_unit: number
  item_status: boolean
  hora_inclusao: string
}

interface Produto {
  nome_produto: string
  id_produto: number
  codigo_produto: number
  estoque_produto: number
  valor_venda: number
  imagem?: string
}

interface Produto2{
  produtodescricao: string
  produtoid: number
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

interface Pagamento {
  formapagamentoid: number
  formapagamentodescricao: string
}

interface Caixa {
  caixamovid: number
}

interface Venda {

  data_venda:string
  valor_total: number
  funcionario_id:number
  taxa_servico:number
}

interface ComandaContextType {
  itensComanda: ComandaItem[]
  comandas: Comanda[]
  comandaSelecionada: Comanda | null
  itensCarrinho: ItemCarrinho[]
  produtos: Produto[]
  usuarios: Usuario[] | null
  formasPagamento: Pagamento[]
  usuarioSelecionado: Usuario | null
  selectedItems: string[] | null
  selectedOption: string | null
  taxValue: string | ''
  taxState: boolean
  tipoTaxa: boolean
  ip: string | ''
  porta: string | ''
  host: string | ''
  database: string | ''
  mensagemErro: boolean
  comandaFinalizada: boolean
  filtroStatus: string
  ordem: string
  tipoOrdem: string
  inputProcurar: string
  caixa_id: number

  adicionarItens: (novoItem: ComandaItem) => void
  adicionarComanda: (novaComanda: Comanda) => void
  removerComanda: (numeroComanda: string) => void
  carregaComandas: () => void
  carregaItens: () => void
  carregaProdutos: () => void
  carregaFormaPagamento: () => void
  limpaCarrinho: () => void
  adicionarItensCarrinho: (novoItemCarrinho: Omit<ItemCarrinho, 'id'>) => void
  removerItemCarrinho: (id:string) => void
  setComandaSelecionada: (comandaSelecionada: Comanda | null) => void
  setusuarioSelecionado: (setusuarioSelecionado: Usuario | null) => void
  gerarIdComanda: () => string
  gerarData: (hora: string) => string
  carregaUsuarios: (cnpj:string) => void
  formataValor: (valor_total: number) => string
  mudaQuantidade: (id: string, tipo: 'soma' | 'subtrai' ) => void
  toggleLongPressItens: (id: string) => void
  limparSelecao: () => void
  removerItens: (item: ComandaItem[]) => void
  finalizaComanda: (comanda_uuid: string) => void
  setSelectedOption: React.Dispatch<React.SetStateAction<'local' | 'cloud'>>
  setTaxValue: (valor:string) => void
  setTaxState: (tipo:boolean) => void
  setTipoTaxa: (tipo:boolean) => void
  setIp: (ip:string) => void
  setPorta: (porta:string) => void
  setHost: (host:string) => void
  setDatabase: (database:string) => void
  setComandaFinalizada: (tipo:boolean) => void
  formataTaxa: (valor_total: number, valor_taxa: number | string, tipoTaxa: boolean, isTotal: boolean, isTaxOnly: boolean) => string | number
  checaNumeroComanda: (numeroComanda: string) => Promise<string | boolean | undefined>;
  setFiltroStatus: (status: string) => void
  setOrdem: (ordem: string) => void
  setTipoOrdem: (tipo: string) => void
  setInputProcurar: (valor: string) => void
  recarregaComanda: (comanda_uuid: string) => void
  setCaixaId: (caixa_id:number) => void
  consultaCaixa: (caixa_id: number) => void
  efetuarVenda: (nova_venda: Venda) => void
}
// fim da declaração dos tipos

// aqui instanciamos o context (função que permite usar as funções em outros docs)
const ComandaContext = createContext<ComandaContextType | undefined>(undefined)

export const ComandaProvider = ({ children }: { children: ReactNode }) => {

  // estes são os useState's de cada parte, eles adicionam e removem itens dos arrays
  const [comandas, setComandas] = useState<Comanda[]>([])
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [formasPagamento, setFormasPagamento] = useState<Pagamento[]>([])
  const [itensComanda, setItensComanda] = useState<ComandaItem[]>([])
  const [comandaSelecionada, setComandaSelecionada] = useState<Comanda | null>(null);
  const [usuarioSelecionado, setusuarioSelecionado] = useState<Usuario | null>(null);
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [mensagemErro, setMensagemErro] = useState(false)
  const [comandaFinalizada, setComandaFinalizada] = useState(false)

  const [selectedOption, setSelectedOption] = useState<'local' | 'cloud'>('local')
  const [taxValue, setTaxValue] = useState('')
  const [taxState, setTaxState] = useState(false)
  const [tipoTaxa, setTipoTaxa] = useState(false)
  const [ip, setIp] = useState('')
  const [porta, setPorta] = useState('')
  const [host, setHost] = useState('')
  const [database, setDatabase] = useState('')
  const [caixa_id, setCaixaId] = useState(0)

  const [filtroStatus, setFiltroStatus] = useState<string>('todas');
  const [ordem, setOrdem] = useState<string>('numero');
  const [tipoOrdem, setTipoOrdem] = useState<string>('Decrescente');
  const [inputProcurar, setInputProcurar] = useState<string>('');

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
    else if (hora === 'completo') {
      return agora.toISOString(); // ex: "2025-04-17T14:37:22.000Z"
    }
    else{
      // Formatar sem os segundos
      const [dataParte, horaParte] = (hora || "").split("-");
      const horaSemSegundos = (horaParte || "").slice(0, 5);
      return `${dataParte} ${horaSemSegundos}`;
    }
  }

  const formataValor: (valor_total: number) => string = (valor_total) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
    }).format(valor_total);
  };
// ============= Fim Geradores =====================


// ============= Itens =====================

  // essa função traz os itens daquela comanda no banco de dados
  const carregaItens = async () => {
    try {
      const response = await helper.getItensComanda()
      const data: ComandaItem2[] = response
      

      const itens = data.map(item => ({
        item_uuid: String(item.itemuuid || ""),
        item_id: String(item.itenscomandaid || ''),
        item_nome: item.itenscomandaprodutodescricao,
        comanda_uuid: String(item.comandauuid || ""),
        comanda_id: item.itenscomandacomandaid,
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
      const response = await helper.postItemComanda({
        item_uuid: String(novoItem.item_uuid),
        comanda_uuid: novoItem.comanda_uuid,
        comanda_id: novoItem.comanda_id,
        quantidade: novoItem.quantidade,
        valor_unit: novoItem.valor_unit,
        valor_total: novoItem.valor_unit * novoItem.quantidade,
        hora_inclusao: String(novoItem.hora_inclusao),
        item_nome: novoItem.item_nome,
      });
  
      if (response) {
        setItensComanda(prevItens => [...prevItens, novoItem]);
      }
    } catch (error) {
      console.error('Erro ao adicionar itens:', error);
    }
  };

  const removerItens = async (itens: ComandaItem[]) => {
    try {
      for (const item of itens) {
        const response = await helper.deleteItemComanda(
          item.comanda_uuid,
          String(item.item_uuid)
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

  // aqui nós limpamos o array de seleção de itens
  const limpaCarrinho = () => {
    setItensCarrinho([]);
  }

//============= Fim Itens =====================


//============= Comanda =====================

  // essa função adiciona uma comanda nova (ela adiciona primeiro no banco, depois usa a resposta pra adicionar ao array local)
  const adicionarComanda = async (novaComanda: Comanda) => {
    try {
      const response = await helper.postComanda({
        nome_comanda: novaComanda.nome_comanda,
        comanda_uuid: novaComanda.comanda_uuid,
        numero_comanda: Number(novaComanda.numero_comanda),
        hora_abertura: novaComanda.hora_abertura,
        status_comanda: novaComanda.status_comanda,
        valor_total: Number(novaComanda.valor_total),
        usuario_responsavel: String(novaComanda.usuario_responsavel),
        usuario_responsavel_id: novaComanda.usuario_responsavel_id,
      });
  
      if (response) {
        setComandas(prevComandas => [...prevComandas, response]);
      }
    } catch (error) {
      console.error('Erro ao adicionar comanda:', error);
    }
  };
  
  
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
        comanda_uuid: String(item.comandauuid || ""),
        comanda_id: item.comandaid,
        nome_comanda: item.comandadetalhe || "",
        valor_total: item.valor_total_comanda || 0,
        numero_comanda: String(item.comandanumero || ""),
        hora_abertura: String(item.comandaaberturadata || ""),
        status_comanda: String(item.comandastatus || ""),
        usuario_responsavel_id: item.comandaaberturafuncionarioid || 0,
      }));
  
      setComandas(novasComandas);
  
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setMensagemErro(true)
    }
  };

  const finalizaComanda = async (comanda_uuid: string) => {

    try{
      const response = await helper.putComanda(comanda_uuid);
      response.comandastatus == 2 ? setComandaFinalizada(true) : console.log('Erro ao fechar comanda')
    }
    catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const checaNumeroComanda = async (numeroComanda: string) => {
    try {
      console.log("numeroDigitado:", numeroComanda)
      const response = await helper.getComandasAbertas();
  
      // Convertendo todos os valores para números
      const result: number[] = response.map((item: Comanda2) => Number(item.comandanumero));
  
      if (numeroComanda === '') {
        // Procurar o menor número disponível
        let menorDisponivel = 1;
        while (result.includes(menorDisponivel)) {
          menorDisponivel++;
        }
        console.log("Menor número disponível:", menorDisponivel);
        return String(menorDisponivel);
      } else {
        // Checar se já existe
        const existe = result.includes(Number(numeroComanda));
        if (existe) {
          console.log(`O número ${numeroComanda} já está sendo usado.`);
          return false; // ou lançar um erro, ou outro tratamento
        } else {
          console.log(`O número ${numeroComanda} está disponível.`);
          return true;
        }
      }
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  }

  const recarregaComanda = async (comanda_uuid: string) => {
    try {
      const response = await helper.getComandaEspecifica(comanda_uuid);
      const data: Comanda2[] = response;
  
      const item = data[0]
      if (!item) return
  
      const comandaAtualizada: Comanda = {
        comanda_uuid: item.comandauuid,
        comanda_id: item.comandaid,
        nome_comanda: item.comandadetalhe,
        numero_comanda: String(item.comandanumero),
        hora_abertura: item.comandaaberturadata,
        valor_total: item.valor_total_comanda,
        status_comanda: String(item.comandastatus),
        usuario_responsavel_id: item.comandaaberturafuncionarioid,
      };
  
      setComandaSelecionada(comandaAtualizada);
    } catch (e) {
      console.error(e);
    }
  };
  
  
  


//============= Fim Comanda =====================

//============= Produtos =====================

  // aqui trazemos os produtos do banco de dados
  const carregaProdutos = async () => {
    try {
      const response = await helper.getProdutos()
      const data: Produto2[] = response
      
     const produtos = data.map(item => ({
        nome_produto: item.produtodescricao || "",
        id_produto: item.produtoid,
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

const carregaUsuarios = async (cnpj: string) => {
  try {
    const response = await helper.getUsuarios(cnpj)
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

//============= Ajustes =====================



//============= Fim Ajustes =====================

//============= Pagamento =====================

const carregaFormaPagamento = async () => {
  try{
    const response = await helper.getPagamentos()
    const data: Pagamento[] = response

    const pagamentos =  data.map(item => ({   
      formapagamentoid: item.formapagamentoid || 0,
      formapagamentodescricao: item.formapagamentodescricao
     }))

    setFormasPagamento(pagamentos)

  } catch{

  }
}
const formataTaxa = (valor_total: number | string, valor_taxa: number | string, tipoTaxa: boolean, isTotal: boolean, isTaxOnly: boolean) => {
  let taxa = typeof valor_taxa === 'string'
    ? Number(valor_taxa.replace(',', '.'))
    : valor_taxa

  valor_total = typeof valor_total === 'string'
    ? Number(valor_total)
    : valor_total

  if (isNaN(taxa)) taxa = 0
  if (isNaN(valor_total)) valor_total = 0

  const valor = tipoTaxa === false
    ? (taxa / 100) * valor_total
    : taxa

  const totalComTaxa = valor_total + valor

  if (isTaxOnly){
    return Number(valor)
  } 
  
  return formataValor(isTotal ? totalComTaxa : valor)
}

//============= Fim Pagamento =====================

//============= Venda =====================

const consultaCaixa = async (caixa_id: number) => {

  try{
    const response = await helper.getIdMovimentoCaixa(caixa_id)
    const data: Caixa[] = response
    const id = data.map (item  => ({
      caixa_id: item.caixamovid
    }))


  } catch(e){
    console.log(e)
  }
}

const efetuarVenda = async (nova_venda: Venda) => {

  try{
    const response = await helper.postVenda({
      data_venda: nova_venda.data_venda,
      valor_total: nova_venda.valor_total,
      funcionario_id: nova_venda.funcionario_id,
      taxa_servico: nova_venda.taxa_servico})

    const data: Venda[] = response

  } catch(e){
    console.log(e)
  }

}
//============= Fim Venda =====================


//============= Filtro =====================



//============= Fim Filtro =====================


const STORAGE_KEY = 'comandaConfig'



useEffect(() => {
  const loadSettings = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const settings = JSON.parse(json);
        setSelectedOption(settings.selectedOption || 'local')
        setTaxValue(settings.taxValue || '')
        setTaxState(settings.taxState || false)
        setTipoTaxa(settings.tipoTaxa || false)
        setIp(settings.ip || '')
        setPorta(settings.porta || '')
        setHost(settings.host || '')
        setDatabase(settings.database || '')
        setCaixaId(settings.caixa_id || '')
      }
    } catch (e) {
      console.error('Erro ao carregar configurações:', e);
    }
  };

  loadSettings();
}, []);

useEffect(() => {
  const saveConfig = async () => {
    const config = {
      selectedOption,
      taxValue,
      taxState,
      tipoTaxa,
      ip,
      porta,
      host,
      database,
      caixa_id
    }
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(config))
  }
  saveConfig()
}, [selectedOption, taxValue, taxState, tipoTaxa, ip, porta, host, database, caixa_id])


  // aqui precisamos passar as funções que queremos usar em outros documentos
  return (
    <ComandaContext.Provider
      value={{
        itensComanda,
        comandas,
        comandaSelecionada,
        itensCarrinho,
        produtos,
        usuarios,
        usuarioSelecionado,
        selectedItems,
        selectedOption,
        taxValue,
        taxState,
        tipoTaxa,
        ip,
        porta,
        host,
        database,
        mensagemErro,
        formasPagamento,
        comandaFinalizada,
        ordem,
        filtroStatus,
        tipoOrdem,
        inputProcurar,
        caixa_id,
 
        adicionarItens,
        adicionarComanda,
        removerComanda,
        carregaComandas,
        carregaItens,
        carregaProdutos,
        limpaCarrinho,
        adicionarItensCarrinho,
        removerItemCarrinho,
        setComandaSelecionada,
        setusuarioSelecionado,
        gerarIdComanda,
        gerarData,
        carregaUsuarios,
        formataValor,
        mudaQuantidade,
        toggleLongPressItens,
        limparSelecao,
        removerItens,
        finalizaComanda,
        setSelectedOption,
        setTaxValue,
        setTaxState,
        setTipoTaxa,
        setIp,
        setPorta,
        setHost,
        setDatabase,
        carregaFormaPagamento,
        setComandaFinalizada,
        formataTaxa,
        checaNumeroComanda,
        setFiltroStatus,
        setOrdem,
        setTipoOrdem,
        setInputProcurar,
        recarregaComanda,
        setCaixaId,
        consultaCaixa,
        efetuarVenda
      }}
    >
      {children}
    </ComandaContext.Provider>
  );
}

export const useComanda = () => {
  const context = useContext(ComandaContext)
  if (!context) {
    throw new Error('useComanda deve ser usado dentro de um ComandaProvider')
  }
  return context
}

export default ComandaContext

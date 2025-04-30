import Constants from "expo-constants";
import axios from "axios";
import { loadConfig } from '../../src/utils/AppConfig'
interface Comanda {
  nome_comanda: string;
  comanda_uuid: string;
  numero_comanda: number;
  hora_abertura: string;
  status_comanda: string;
  valor_total: number;
  usuario_responsavel: string;
  usuario_responsavel_id: number;
}

interface ItemComanda {
  item_uuid: string;
  comanda_uuid: string;
  comanda_id: number;
  quantidade: number;
  valor_unit: number;
  valor_total: number;
  hora_inclusao: string;
  item_nome: string;
}

interface Venda {
  data_venda:string
  valor_total: number
  funcionario_id:number
  taxa_servico:number
}

export default class Helper {
  BASE_URL: string;

  constructor() {
    this.BASE_URL = `http://${globalThis.appConfig?.ip|| ""}`;
  }
  currentDate(seconds = 0): Date {
    let currentDate = new Date();
    return new Date(
      currentDate.valueOf() - currentDate.getTimezoneOffset() * 60000 + seconds * 1000
    );
  }

  // ** comandas **
  async getComandas() {
    try {
      return (await axios.get(`${this.BASE_URL}/comandas`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async getComandasAbertas() {
    try {
      return (await axios.get(`${this.BASE_URL}/comandas/comandasAbertas`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async getComandaEspecifica(comanda_uuid: string){
    try{
      return (await axios.get(`${this.BASE_URL}/comandas/comandaEspecifica?comanda_uuid=${comanda_uuid}`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async putComanda(comanda_uuid: string) {
    const data = { comanda_uuid };
    try {
      const response = await axios.put(`${this.BASE_URL}/comandas`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (e: any) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e;
    }
  }

  async postComanda(data: Comanda) {
    try {
      const response = await axios.post(`${this.BASE_URL}/comandas`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (e: any) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e;
    }
  }

  // ** fim comanda **

  // ** Item Comanda **

  async getItensComanda() {
    try {
      return (await axios.get(`${this.BASE_URL}/itens`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async postItemComanda(data: ItemComanda) {
    try {
      const response = await axios.post(`${this.BASE_URL}/itens`, data, {
        headers: { 'Content-Type': 'application/json' }
      });
      return response.data;
    } catch (e: any) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e;
    }
  }

  async putItemComanda(item_status: string, comanda_uuid: string, item_uuid: string) {
    const data = { item_status, comanda_uuid, item_uuid };
    try {
      return (await axios.put(`${this.BASE_URL}/itens`, data)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async deleteItemComanda(comanda_uuid: string, item_uuid: string) {
    try {
      const data = { comanda_uuid, item_uuid };
      return (await axios.delete(`${this.BASE_URL}/itens`, { data })).data;
    } catch (e) {
      console.log(e);
    }
  }

  // ** fim Item Comanda **

  // ** Produtos **

  async getProdutos() {
    try {
      return (await axios.get(`${this.BASE_URL}/produtos`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async getProduto(id: string) {
    try {
      return (await axios.get(`${this.BASE_URL}/produtos/${id}`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async postProduto(id: string, data: any) {
    try {
      return (await axios.post(`${this.BASE_URL}/produtos/${id}`, data)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async putProduto(id: string, quantity: number) {
    const data = { gerenciado: true, quantidade: quantity };
    try {
      return (await axios.put(`${this.BASE_URL}/produto/${id}`, data)).data;
    } catch (e) {
      console.log(e);
    }
  }

  // ** fim produtos**

  // ** usuarios **

  async getUsuarios(cnpj: string) {
    try {
      return (await axios.get(`${this.BASE_URL}/usuarios?cnpj=${cnpj}`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async getUsuario(id: string) {
    try {
      return (await axios.get(`${this.BASE_URL}/colaboradores/${id}`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async putUsuario(id: string, quantity: number) {
    const data = { gerenciado: true, quantidade: quantity };
    try {
      return (await axios.put(`${this.BASE_URL}/colaboradores/${id}`, data)).data;
    } catch (e) {
      console.log(e);
    }
  }

  // ** fim usuarios **  

  // ** Empresa **  

  async getEmpresa(id: string) {
    try {
      return (await axios.get(`${this.BASE_URL}/empresas/${id}`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  async putEmpresa(id: string, quantity: number) {
    const data = { gerenciado: true, quantidade: quantity };
    try {
      return (await axios.put(`${this.BASE_URL}/empresas/${id}`, data)).data;
    } catch (e) {
      console.log(e);
    }
  }

  // ** fim Empresa **

  // ** Pagamentos ** 

  async getPagamentos(){
    try {
      return (await axios.get(`${this.BASE_URL}/pagamentos/`)).data;
    } catch (e) {
      console.log(e);
    }
  }

  // ** Venda **

  async getIdMovimentoCaixa(caixa_id: number){
    try{
      return (await axios.get(`${this.BASE_URL}/caixas?caixa_id=${caixa_id}`)).data;

    } catch(e){

    }
  }

  async postVenda(nova_venda: Venda){

    try{
      const response =  (await axios.post(`${this.BASE_URL}/vendas`, nova_venda, {
        headers: { 'Content-Type': 'application/json' }
      }));
      return response.data
    } catch(e) {
      console.error(e)
    }
  }


  // ** Fim Venda **
} 

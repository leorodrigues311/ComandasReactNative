
/*
import * as Constants from "expo-constants";

export default class Helper {
  constructor() {
    this.BASE_URL = Constants.expoConfig?.extra?.BASE_URL;
  }
*/

import axios from "axios";
export default class Helper {
  constructor() {
    const { BASE_URL } ='test'
    this.BASE_URL = BASE_URL
  }

  currentDate(seconds = 0) {
    let currentDate = new Date()

    return currentDate = new Date(
      (currentDate.valueOf() - currentDate.getTimezoneOffset() * 60000) + seconds * 1000,
    )
  }

// ** comandas **

  async getComandas() {
    try{
      return (await axios.get(`http://10.0.0.101:4000/comandas`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async getComanda(id) {
    try{
      return (await axios.get(`${this.BASE_URL}/comanda/${id}`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async putComanda(comanda_uuid) {
    const data = {comanda_uuid}
    try{
      const response = await axios.put('http://10.0.0.101:4000/comandas', data, {
        headers: { 'Content-Type': 'application/json' }
      })
      return response.data;
    } catch (e) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e
    }
  }

  async postComanda(nome_comanda, comanda_uuid, numero_comanda, hora_abertura, status_comanda, valor_total, usuario_responsavel, usuario_responsavel_id) {

    const data = {nome_comanda, comanda_uuid, numero_comanda, hora_abertura, status_comanda, valor_total,  usuario_responsavel, usuario_responsavel_id }
    try {
      const response = await axios.post('http://10.0.0.101:4000/comandas', data, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      return response.data;
    } catch (e) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e
    }
  }
  
  

// ** fim comanda **

// ** Item Comanda **

  async getItensComanda() {
    try{
      return (await axios.get(`http://10.0.0.101:4000/itens`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async postItemComanda(item_uuid, comanda_uuid, comanda_id, quantidade, valor_unit, valor_total, hora_inclusao, item_nome) {
    const data = {item_uuid, comanda_uuid, comanda_id, quantidade, valor_unit, valor_total, hora_inclusao, item_nome}

    try {
      console.log('Enviando para API:', data)
      const response = await axios.post('http://10.0.0.101:4000/itens', data, {
        headers: { 'Content-Type': 'application/json' }
      })
  
      return response.data;
    } catch (e) {
      console.error('Erro ao postar comanda:', e.response?.data || e.message);
      throw e
    }
  }

  async putItemComanda(item_status, comanda_uuid, item_uuid) {
    try{
      const data = {
        item_status: item_status,
        comanda_uuid: comanda_uuid,
        item_uuid: item_uuid,
      }

      return (await axios.put('http://10.0.0.101:4000/itens', data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async deleteItemComanda(comanda_uuid, item_uuid) {
    try {
      const data = {
        comanda_uuid,
        item_uuid,
      };
  
      return (await axios.delete('http://10.0.0.101:4000/itens', {
        data,
      })).data;
    } catch (e) {
      console.log(e);
    }
  }

// ** fim Item Comanda **

// ** Produtos **

async getProdutos() {
    try{
      return (await axios.get(`http://10.0.0.101:4000/produtos`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async getProduto(id) {
    try{
      return (await axios.get(`${this.BASE_URL}/produtos/${id}`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async postProduto(data) {
    try{
      return (await axios.post(`${this.BASE_URL}/produtos/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  
  async putProduto(id, data) {
    try{
      const data = {
        gerenciado: true,
        quantidade: quantity
      }

      return (await axios.put(`${this.BASE_URL}/produto/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

// ** fim produtos**

// ** usuarios **

async getUsuarios(cnpj) {
  try{
    return (await axios.get(`http://10.0.0.101:4000/usuarios?cnpj=${cnpj}`, {
    })).data
  } catch(e){
    console.log(e)
  }
}

  async getUsuario(id) {
    try{
      return (await axios.get(`${this.BASE_URL}/colaboradores/${id}`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async putUsuario(id) {
    try{
      const data = {
        gerenciado: true,
        quantidade: quantity
      }

      return (await axios.put(`${this.BASE_URL}/colaboradores/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

// ** fim usuarios **  

// ** Empresa **  

  async getEmpresa(id) {
    try{
      return (await axios.get(`${this.BASE_URL}/empresas/${id}`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async putEmpresa(id) {
    try{
      const data = {
        gerenciado: true,
        quantidade: quantity
      }

      return (await axios.put(`${this.BASE_URL}/empresas/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  // ** fim Empresa **  


}


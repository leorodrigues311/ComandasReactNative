const axios = require('axios')
require('dotenv').config()
const { client, pool } = require('./database/db.js');

module.exports = class Helper {
  constructor() {
    const { BASE_URL} = process.env
    this.BASE_URL = BASE_URL
  }

  currentDate(seconds = 0) {
    let currentDate = new Date()

    return currentDate = new Date(
      (currentDate.valueOf() - currentDate.getTimezoneOffset() * 60000) + seconds * 1000,
    )
  }

// ** comandas **

  async getComandas(offset = 200) {
    try{
      return (await axios.get(`${this.BASE_URL}/comandas?limit=20&offset=${offset}`, {
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

  async putComanda(id) {
    try{
      const data = {
        gerenciado: true,
        quantidade: quantity
      }

      return (await axios.put(`${this.BASE_URL}/comanda/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async postComanda(data) {
    try{
      return (await axios.post(`${this.BASE_URL}/comanda/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

// ** fim comanda **

// ** Item Comanda **

  async getItemComanda(id) {
    try{
      return (await axios.get(`${this.BASE_URL}/item/${id}`, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async postItemComanda(data) {
    try{
      return (await axios.post(`${this.BASE_URL}/item/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

  async putItemComanda(id) {
    try{
      const data = {
        gerenciado: true,
        quantidade: quantity
      }

      return (await axios.put(`${this.BASE_URL}/item/${id}`, data, {
      })).data
    } catch(e){
      console.log(e)
    }
  }

// ** fim Item Comanda **

// ** Produtos **

async getProdutos(offset = 200) {
    try{
      return (await axios.get(`${this.BASE_URL}/produtos?limit=20&offset=${offset}`, {
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

  async getUsuarios(offset = 200) {
    try{
      return (await axios.get(`${this.BASE_URL}/colaboradores?limit=20&offset=${offset}`, {
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
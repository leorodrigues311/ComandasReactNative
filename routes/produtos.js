const Helper = require('../database/helper/helper.js')
const helper = new Helper()
const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
    const { offset } = req.query
    const produtos = await helper.getProdutos(offset)
  
    res.status(200).send(produtos)
})

router.get('/', async (req, res, next) => {
  const { id } = req.query
  const produtos = await helper.getProduto(id)

  res.status(200).send(produtos)
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const produto = await helper.postProduto(data)

  res.status(200).send(produto)
})

router.put('/', async (req, res, next) => {
  const { id, data } = req.body
  const produto = await helper.putProduto(id, data)

  res.status(200).send(produto)
})

  
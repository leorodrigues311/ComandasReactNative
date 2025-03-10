const Helper = require('../database/helper/helper.js')
const helper = new Helper()
const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
    const { offset } = req.query
    const products = await helper.getProducts(offset)
  
    res.status(200).send(products)
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const product = await helper.postProduct(data)

  res.status(200).send(product)
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const stock = await helper.putStock(id, quantity)

  res.status(200).send(stock)
})

  
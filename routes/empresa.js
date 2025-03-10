const Helper = require('../database/helper/helper.js')
const helper = new Helper()
const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
    const { id } = req.query
    const empresa = await helper.getEmpresa(id)
  
    res.status(200).send(empresa)
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const empresa = await helper.putEmpresa(id, quantity)

  res.status(200).send(empresa)
})

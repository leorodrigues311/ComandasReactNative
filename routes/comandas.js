const Helper = require('../database/helper/helper.js')
const helper = new Helper()
const express = require('express')
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
    const { offset } = req.query
    const comandas = await helper.getComandas(offset)
  
    res.status(200).send(products)
})

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM comandas');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  res.status(200).send(res)
})

router.post('/', async (req, res, next) => {
  const id = req.body
  const comandas = await helper.putComanda(id)

  res.status(200).send(comandas)
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const comandas = await helper.postComanda(id, quantity)

  res.status(200).send(comandas)
})

import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
    const { offset } = req.query
    const itens = await helper.getItemComanda(offset)
  
    res.status(200).send(itens)
})

router.post('/', async (req, res, next) => {
  const data = req.body
  const itens = await helper.postItemComanda(data)

  res.status(200).send(itens)
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const itens = await helper.putItemComanda(id, quantity)

  res.status(200).send(itens)
})

export default router;
import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
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

export default router;
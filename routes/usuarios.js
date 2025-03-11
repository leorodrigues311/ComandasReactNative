import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())


router.get('/', async (req, res, next) => {
    const { offset } = req.query
    const usuarios = await helper.getUsuarios(offset)
  
    res.status(200).send(usuarios)
})

router.post('/', async (req, res, next) => {
  const id = req.body
  const usuario = await helper.getUsuario(id)

  res.status(200).send(usuario)
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const usuario = await helper.putUsuario(id, quantity)

  res.status(200).send(usuario)
})

export default router;
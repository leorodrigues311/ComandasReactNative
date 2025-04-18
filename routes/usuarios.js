import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())


router.get('/', async (req, res, next) => {
  try {
    //const {cnpj} = req.query
    const result = await pool.query('SELECT * FROM funcionarios');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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
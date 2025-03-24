import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM produtos');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
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


export default router;
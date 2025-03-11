import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper();
const router = express.Router();
router.use(express.json());

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

export default router;

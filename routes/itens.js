import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM itens_comanda');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const {id, comanda_id, item_nome, valor_unit, quantidade} = req.body;
    const result = await pool.query(
      `INSERT INTO itens_comanda 
      (id, comanda_id, item_nome, valor_unit, quantidade)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [id, comanda_id, item_nome, valor_unit, quantidade]
    );

    io.emit('comanda-alterada', { action: 'POST', data: result.rows[0] });

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message});
    res.body
  }
})

router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const itens = await helper.putItemComanda(id, quantity)

  res.status(200).send(itens)
})

export default router;
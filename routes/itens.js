import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
import { io } from '../index.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM itens_comanda where item_status = true');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/', async (req, res) => {
  try {
    const {item_uuid, comanda_uuid, item_nome, valor_unit, quantidade, item_status, hora_inclusao} = req.body;
    const result = await pool.query(
      `INSERT INTO itens_comanda 
      (item_uuid, comanda_uuid, item_nome, valor_unit, quantidade, item_status, hora_inclusao)
      VALUES ($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
      [item_uuid, comanda_uuid, item_nome, valor_unit, quantidade, item_status, hora_inclusao]
    );

    io.emit('comanda-alterada', { action: 'POST', data: result.rows[0] });

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message});
    res.body
  }
})

router.put('/', async (req, res, next) => {
  try {
  const { item_status, comanda_uuid, item_uuid } = req.body
  const result = await pool.query(
    `UPDATE itens_comanda SET item_status = $1 WHERE item_uuid = $2 AND comanda_uuid = $3
    RETURNING *`,
    [ item_status, item_uuid, comanda_uuid ]
  )
  io.emit('comanda-alterada', { action: 'PUT', data: result.rows[0] });
  res.json(result.rows[0])
} 
catch (error) {
  res.status(500).json({ error: error.message});
  res.body
}
})

export default router;
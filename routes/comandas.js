import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
import { io } from '../index.js'
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
})

router.post('/', async (req, res) => {

  try {
    
    const {nome_comanda, hora_abertura, status_comanda, numero_comanda, valor_total } = req.body;


    const result = await pool.query(
      `INSERT INTO comandas 
      (nome_comanda, hora_abertura, status_comanda, numero_comanda, valor_total)
      VALUES ($1, $2, $3, $4, $5) 
      RETURNING *`,
      [nome_comanda, hora_abertura, status_comanda, numero_comanda, valor_total]
    );

    io.emit('comanda-alterada', { action: 'POST', data: result.rows[0] });

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({ error: error.message});
    res.body
  }
});


router.put('/', async (req, res, next) => {
  const { id, quantity } = req.body
  const comandas = await helper.postComanda(id, quantity)

  res.status(200).send(comandas)
})

export default router;

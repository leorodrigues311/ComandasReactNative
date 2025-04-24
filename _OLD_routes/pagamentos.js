import Helper from '../database/helper/helper.js'
import express from 'express'
import {client, pool} from '../database/db.js'
import { io } from '../main.js'
const helper = new Helper()
const router = express.Router()
router.use(express.json())

router.get('/', async (req, res, next) => {
  try {
    const result = await pool.query('SELECT * FROM formaspagamento');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


export default router;
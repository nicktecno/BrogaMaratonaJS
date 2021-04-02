const express = require('express');
const Games = require('../models/Games');

const router = express.Router();

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

router.get('/', async (req, res) => {
  const {
    limit, page, fields, orderBy, sortBy, queryBusca,
  } = req.query;

  const criteria = {
    limit: Number(limit) || DEFAULT_LIMIT,
    page: Number(page) || DEFAULT_PAGE,
    fields: fields || null,
    orderBy: orderBy || 'title',
    sortBy: sortBy !== undefined ? Number(sortBy) : 1,
    queryBusca: queryBusca || '',
  };
  const result = await Games.find(criteria);

  res.json({ message: 'Games OK', data: result });
});

router.post('/', async (req, res) => {
  const { body } = req;
  const data = await Games.store(body);
  return res.json({ message: 'Game Stored', data });
});

router.put('/:id', async (req, res) => {
  const { body, params } = req;
  const { id } = params;

  const game = await Games.update(id, body);
  return res.json({ message: 'Game updated', data: game });
});

router.delete('/:id', async (req, res) => {
  const { params } = req;
  const { id } = params;
  const result = await Games.destroy(id);
  return res.json({ message: 'Game deleted', data: result });
});
module.exports = router;

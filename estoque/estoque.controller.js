const express = require('express');
const router = express.Router();
const estoqueService = require('./estoque.service');

// routes
router.get('/estoque', getAll);

module.exports = router;

function getAll(req, res, next) {
    estoqueService.getAll()
        .then(estoque => res.json(estoque))
        .catch(next);
}

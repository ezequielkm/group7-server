const express = require('express');
const router = express.Router();
const movimentacaoService = require('./movimentacao.service');

// routes
router.get('/', getAll);
router.post('/', addMovimentacao);
router.delete('/:id', deleteMovimentacao);

module.exports = router;

function getAll(req, res, next) {
    movimentacaoService.getAll()
        .then(movimentacao => res.json(movimentacao))
        .catch(next);
}

function addMovimentacao(req, res, next) {
    movimentacaoService.addMovimentacao(req.body)
        .then(() => res.json({}))
        .catch(next);
}

function deleteMovimentacao(req, req, next) {    
    movimentacaoService.deleteMovimentacao(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}
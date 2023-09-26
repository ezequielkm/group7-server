const express = require('express');
const router = express.Router();
const movimentacaoService = require('./movimentacao.service');

// routes
router.get('/', getAll);
router.post('/', addMovimentacao);
router.delete('/:id', deleteMovimentacao);
router.put('/:id', editMovimentacao);

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

function deleteMovimentacao(req, res, next) {    
    movimentacaoService.deleteMovimentacao(req.params.id)
        .then(() => res.json({}))
        .catch(next);
}

function editMovimentacao(req, res, next) {
    console.log('EDIT 1 - ' + req.params.id);

    movimentacaoService.editMovimentacao(req.params.id, req.body);

    // movimentacaoService.editMovimentacao(req.params.id)
    //     .then(() => res.json({}))
    //     .catch(next);
}
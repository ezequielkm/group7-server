const Movimentacao = require('models/movimentacao').Movimentacao;

module.exports = {    
    getAll,
    addMovimentacao
};

async function getAll() {
    const movimentacao = await Movimentacao.findAll();
    return movimentacao;
}

async function addMovimentacao({idEstoque, tipo, produto, quantidade, preco, data}) {
    const movimentacao = {
        idEstoque: idEstoque,
        tipo: tipo,
        produto: produto,
        quantidade: quantidade,
        preco: preco,
        data: data
    };
    Movimentacao.create(movimentacao);
}
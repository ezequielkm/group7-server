const Movimentacao = require('models/movimentacao').Movimentacao;

module.exports = {    
    getAll,
    addMovimentacao,
    deleteMovimentacao
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

async function deleteMovimentacao(id) {    
    console.log('AAAAA: 2');

    await Movimentacao.destroy({
        where: {
            id: id
        }
    });
}
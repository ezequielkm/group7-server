const Movimentacao = require('models/movimentacao').Movimentacao;

module.exports = {    
    getAll,
    addMovimentacao,
    deleteMovimentacao,
    editMovimentacao
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
    await Movimentacao.destroy({
        where: {
            id: id
        }
    });
}

async function editMovimentacao(id) {
    console.log('EDIT 2 - ' + id);

    // await Movimentacao.({
    //     where: {
    //         id: id
    //     }
    // });
}
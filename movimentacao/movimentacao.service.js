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

async function addMovimentacao({idEstoque, idProduto, tipo, quantidade, preco, data}) {    
    const movimentacao = {
        idEstoque: idEstoque,
        idProduto: idProduto,
        tipo: tipo,        
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

async function editMovimentacao(id, {tipo, idEstoque, idProduto, quantidade, preco}) {

    const movimentacao = await Movimentacao.scope(null).findOne({where: {id: id}});

    movimentacao.tipo = tipo;
    movimentacao.idEstoque = idEstoque;
    movimentacao.idProduto = idProduto;    
    movimentacao.quantidade = quantidade;
    movimentacao.preco = preco;
    
    movimentacao.save();

    this.getAll();
}

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

async function editMovimentacao(id, {tipo, produto, quantidade, preco}) {
    console.log('EDIT 2 - ' + id);
    console.log('EDIT 2 - ' + tipo);
    console.log('EDIT 2 - ' + produto);
    console.log('EDIT 2 - ' + quantidade);
    console.log('EDIT 2 - ' + preco);
    
    try 
    {
        // let movimentacao = await Movimentacao.findAll({where: {id}});
        
        // movimentacao.tipo = tipo;
        // movimentacao.produto = produto;
        // movimentacao.quantidade = quantidade;
        // movimentacao.preco = preco;
                    
        // movimentacao.save();
    } 
    catch (error) 
    {
        throw error
    }

    // await Movimentacao.({
    //     where: {
    //         id: id
    //     }
    // });
}
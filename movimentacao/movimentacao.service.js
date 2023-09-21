const Movimentacao = require('models/movimentacao').Movimentacao;

module.exports = {    
    getAll
};

async function getAll() {
    const movimentacao = await Movimentacao.findAll();
    return movimentacao;
}

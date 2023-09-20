const Estoque = require('models/estoque').Estoque;

module.exports = {    
    getAll
};

async function getAll() {
    const estoque = await Estoque.findAll();
    return estoque;
}

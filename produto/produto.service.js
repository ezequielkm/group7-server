const {Product} = require("../models/product");

const editProduct = async(id, {tipo, nome, vencimento}) =>
{
    try 
    {
        let product = await Product.findOne({where: {id}})

        product.tipo = tipo
        product.nome = nome
        product.vencimento = vencimento
    
        return product.save()   
    } 
    catch (error) 
    {
        throw error
    }
}

const addProduct = async(user_id, {tipo, nome, vencimento}) =>
{
    try 
    {
        return await Product.create({user_id, tipo, nome, vencimento})
    } 
    catch (error) 
    {
        throw error
    }
}

const getAllProduct = async(user_id) =>
{
    try 
    {
        return await Product.findAll({where: {user_id}});
    } 
    catch (error) 
    {
        throw error
    }
}

const deleteProduct = async(id) =>
{
    try 
    {
        return await Product.destroy({where: {id}})
    } 
    catch (error) 
    {
        throw error
    }
}

const getProduto = async(id) =>
{
    try 
    {
        console.log("AAAAA 3 id: " + id);
        console.log("AAAAA 4 prod: " + await Product.findAll({where: {id}}).nome); 

        return await Product.findAll({where: {id}});
    } 
    catch (error) 
    {
        throw error
    }
}

// async function getProduto(id) {    
//     console.log("AAAAA 3 id: " + id);
//     console.log("AAAAA 4 prod: " + Product.findAll({where: {id: id}}));

//     return Product.findAll({where: {id: id}});
// }

module.exports = {editProduct, addProduct, getAllProduct, deleteProduct, getProduto}
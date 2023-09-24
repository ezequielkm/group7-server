const {Product} = require("../models/product");

const editProduct = async({id, tipo, nome, vencimento}) =>
{
    try 
    {
        let product = await Product.findOne({where: {id}})

        product.tipo = tipo
        product.tipo = nome
        product.tipo = vencimento
    
        product.save()   

        return true
    } 
    catch (error) 
    {
        return error
    }
}

const addProduct = async({tipo, nome, vencimento}) =>
{
    try 
    {
        await Product.create({tipo, nome, vencimento})

        return true
    } 
    catch (error) 
    {
        return error
    }
}

const getAllProduct = async(user_id) =>
{
    try 
    {
        return await Product.findAll({where: {user_id: user_id}});
    } 
    catch (error) 
    {
        return error
    }
}

const deleteProduct = async({id}) =>
{
    try 
    {
        await Product.destroy({where: {id}})

        return true
    } 
    catch (error) 
    {
        return error
    }
}

module.exports = {editProduct, addProduct, getAllProduct, deleteProduct}
const express = require('express');
const router = express.Router();
const productService = require('./produto.service');

router.put('/:id', authentication, editProduct);
router.post('/:id', authentication, addProduct);
router.get('/', authentication, getAllProduct);
router.delete('/:id', authentication, deleteProduct);

const editProduct = async (request, response, next) =>
{
    try 
    {
        productService.editProduct(request.body)
        response.status(200).send({message: "Produto editado com sucesso"})
    } 
    catch (error) 
    {
        response.status(400).send({message: `Houve um problema ao editar o produto: ${error.message}`})
    }
}

const addProduct = async (request, response, next) =>
{
    try 
    {
        productService.addProduct(request.body)
        response.status(200).send({message: "Produto cadastrado com sucesso"})
    } 
    catch (error) 
    {
        response.status(400).send({message: `Houve um problema ao cadastrado o produto: ${error.message}`})
    }
}

const getAllProduct = async (request, response, next) =>
{
    try 
    {
        const productList = productService.getAllProduct(request.user_id)

        if(productList.length == 0)
            response.status(204).send(productList)
        else
            response.status(200).send(productList)
    } 
    catch (error) 
    {
        response.status(400).send({message: `Houve um problema ao editar o produto: ${error.message}`})
    }
}

const deleteProduct = async (request, response, next) =>
{
    try 
    {
        productService.deleteProduct(request.body)
        response.status(200).send({message: "Produto deletado com sucesso"})
    } 
    catch (error) 
    {
        response.status(400).send({message: `Houve um problema ao deletar o produto: ${error.message}`})
    }
}

const authentication = async (request, response, next) =>
{
    const authHeader = request.headers['authorization'],
    token = authHeader && authHeader.split(' ')[1]
  
    if (token == null) return response.sendStatus(401)
  
    jwt.verify(token, secret, (err, user) => {
      if (err) return response.sendStatus(403)
      request.user_id = user.sub
      next();
    })
}

module.exports = router;
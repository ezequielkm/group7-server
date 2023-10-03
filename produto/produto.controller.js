const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { secret } = require('config.json');
const productService = require('./produto.service');

const editProduct = async (request, response, next) =>
{
    try 
    {
        await productService.editProduct(request.params.id, request.body)
        response.status(200).send({message: "Produto editado com sucesso"})
    } 
    catch (error) 
    {
        console.log(error)
        response.status(400).send({message: `Houve um problema ao editar o produto: ${error.message}`})
    }
}

const addProduct = async (request, response, next) =>
{
    try 
    {
        await productService.addProduct(request.user_id, request.body)
        response.status(200).send({message: "Produto cadastrado com sucesso"})
    } 
    catch (error) 
    {
        console.log(error)
        response.status(400).send({message: `Houve um problema ao cadastrar o produto: ${error.message}`})
    }
}

const getAllProduct = async (request, response, next) =>
{
    try 
    {
        const productList = await productService.getAllProduct(request.user_id)

        if(productList.length == 0)
            response.status(204).send(productList)
        else
            response.status(200).send(productList)
    } 
    catch (error) 
    {
        console.log(error)
        response.status(400).send({message: `Houve um problema ao buscar o produto: ${error.message}`})
    }
}

const deleteProduct = async (request, response, next) =>
{
    try 
    {
        await productService.deleteProduct(request.params.id)
        response.status(200).send({message: "Produto deletado com sucesso"})
    } 
    catch (error) 
    {
        console.log(error)
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

const getProduto = async (request, response, next) =>
{
    try 
    {
        console.log("AAAAA 2 req.params.id: " + request.params.id);

        const produto = await productService.getProduto(request.params.id)

        if(!produto)
            response.status(204).send(produto)
        else
            response.status(200).send(produto)
        }
         
    catch (error) 
    {
        console.log(error)
        response.status(400).send({message: `Houve um problema ao buscar o produto: ${error.message}`})
    }
}  

// function getProduto(req, res, next) {        
//     console.log("AAAAA 2 req.params.id: " + req.params.id);
//     productService.getProduto(req.params.id)
//         .then(produto => res.json(produto))
//         .catch(next);
// }

router.put('/:id', authentication, editProduct);
router.post('/', authentication, addProduct);
router.get('/', authentication, getAllProduct);
router.delete('/:id', authentication, deleteProduct);
router.get('/produto/:id', authentication, getProduto);

module.exports = router;
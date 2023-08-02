const p = require('../services/products');



async function getProducts(req, res){
    try{
        const o = await p.getProducts();
        res.send(o);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
}

async function getProduct(req, res){
    try{
        const {id} = req.params;
        const o = await p.getProduct(id);
        res.send(o);
    }
    catch(e)
    {
        res.status(500).send(e);
    }
}

async function addProduct(req, res){
    try{
        const {name, price} = req.body;
        const creationDate = Date.now();
        const {insertedId} = await p.addProduct({name, price, creationDate});
        res.send({
            id: insertedId,
            name,
            price,
            creationDate,
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}

async function updateProduct(req, res){
    try{
        const {id} = req.params;
        const {name, price} = req.body;
        await p.updateProduct(id, {name, price});
        res.send({
            id,
            name,
            price,
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}

async function deleteProduct(req, res){
    try{
        const {id} = req.params;
        await p.deleteProduct(id);
        res.send({
            id,
        });
    }
    catch(e){
        res.status(500).send(e);
    }
}

module.exports = {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct,
}
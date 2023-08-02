const { ObjectId } = require("mongodb");
const { getProductCollection } = require("./collections.js");

async function addProduct(payload)
{
    const result = await getProductCollection().insertOne(payload);
    return result.insertedId;
}

async function getProducts(username)
{
    const cursor = getProductCollection().find({username});
    const products = [];
    await cursor.forEach(p => products.push({
        id: p._id,
        name: p.name,
        price: p.price,
        creationDate: p.creationDate,
    }));
    return products;
}

async function getProduct(username, productId)
{
    return await getProductCollection().findOne({username, _id: new ObjectId(productId)});
}

async function updateProduct(username, productId, payload)
{
    const result = await getProductCollection().updateOne(
        { username, _id: new ObjectId(productId) },
        {
            $set: { ...payload },
        },
        {
            upsert: true
        }
    );
    return result.matchedCount === 1;
}

async function deleteProduct(username, productId)
{
    const result = await getProductCollection().deleteOne({username, _id: new ObjectId(productId)});
    return result.deletedCount === 1;
}

module.exports = {
    addProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}
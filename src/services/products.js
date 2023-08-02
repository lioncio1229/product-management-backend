const { ObjectId } = require("mongodb");
const { getProductCollection } = require("./collections.js");

async function addProduct(payload)
{
    const result = await getProductCollection().insertOne(payload);
    return result.insertedId;
}

async function getProducts()
{
    const cursor = getProductCollection().find();
    const products = [];
    await cursor.forEach(product => products.push(product));
    return products;
}

async function getProduct(productId)
{
    return await getProductCollection().findOne({_id: new ObjectId(productId)});
}

async function updateProduct(productId, payload)
{
    const result = await getProductCollection().updateOne(
        { _id: new ObjectId(productId) },
        {
            $set: { ...payload },
        },
        {
            upsert: true
        }
    );
    return result.matchedCount === 1;
}

async function deleteProduct(productId)
{
    const result = await getProductCollection().deleteOne({_id: new ObjectId(productId)});
    return result.deletedCount === 1;
}

module.exports = {
    addProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct,
}
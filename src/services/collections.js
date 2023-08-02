const { client } =  require("./connection.js");

function getCollectionAtDatabase(collectionName)
{
    try
    {
        return client.db('ProductDB').collection(collectionName);
    }
    catch(e) 
    {
        console.log(e.message);
        throw new Error(e.message);
    }
}

function getUserCollection()
{
    return getCollectionAtDatabase('users');
}

function getProductCollection()
{
    return getCollectionAtDatabase('products');
}

module.exports = {
    getCollectionAtDatabase,
    getUserCollection,
    getProductCollection,
}
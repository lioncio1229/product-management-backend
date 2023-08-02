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

function getUserCollections()
{
    return getCollectionAtDatabase('users');
}

module.exports = {
    getCollectionAtDatabase,
    getUserCollections,
}
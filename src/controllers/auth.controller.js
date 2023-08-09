const { generateAccessToken, isAccessTokenValid } = require('../utils/accessToken');
const {addUser, getUser, isUserExist} = require('../services/users');
const {encrypt, decrypt} = require('../utils/encryption');
const {CustomError, sendErrorResponse} = require('../utils/CustomError');

async function auth(req, res){
    try{
        const {type} = req.query;
        const {username, password} = req.body;
        
        if(type === 'signup')
        {
            const token = generateAccessToken({username, password});
            const exist = await isUserExist(username);

            if(exist)
            {
                throw new CustomError('Username already exist', 403);
            }

            await addUser({username, password: encrypt(password)});
            req.session.accessToken = token
            res.send({});
        }

        else if(type === 'signout')
        {
            req.session.accessToken = null;
            res.status(200).send({});
        }

        else if(type === 'signin')
        {
            if(isAccessTokenValid(req.session.accessToken))
            {
                res.status(200).send({});
                return;
            }
            
            const user = await getUser(username);

            let token;
            if(user)
            {
                const decryptedPassword = decrypt(user.password);
                if(password === decryptedPassword)
                    token = generateAccessToken(user);
                else{
                    throw new CustomError('Invalid Credentials', 401);
                }
            }
            
            if(token)
            {
                req.session.accessToken = token;
                res.status(200).send({});
            }
            else
            {
                throw new CustomError('Please Signup', 401);
            }
        }
    }
    catch(e)
    {
        sendErrorResponse(res, e);
    }
}

async function authenticated(req, res){
    try{
        res.send({username: req.username});
    }
    catch(e)
    {
        res.status(500).send(e);
    }
}

module.exports = {
    auth,
    authenticated,
}
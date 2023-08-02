const { generateAccessToken, isAccessTokenValid } = require('../utils/accessToken');
const {addUser, getUser, isUserExist} = require('../services/users');
const {encrypt, decrypt} = require('../utils/encryption');

async function auth(req, res){
    try{
        const {type} = req.query;
        const {username, password} = req.body;
        
        if(type === 'signup')
        {
            const {fullname} = req.body;
            const token = generateAccessToken({fullname, username, password});
            const exist = await isUserExist(username);

            if(exist)
            {
                res.status(403).send('Username already exist');
                return;
            }

            await addUser({username, fullname, password: encrypt(password)});
            req.session.accessToken = token
            res.send({});
        }

        else if(type === 'signout')
        {
            if(!isAccessTokenValid(req.session.accessToken))
            {
                res.status(200).send('Already Signout');
                return;
            }
            req.session.accessToken = null;
            res.status(200).send('Signout');
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
            }
            
            if(token)
            {
                req.session.accessToken = token;
                res.status(200).send({});
            }
            else
            {
                res.status(401).send('Please Signup');
            }
        }
    }
    catch(e)
    {
        res.status(500).send(e);
    }
}

module.exports = {
    auth,
}
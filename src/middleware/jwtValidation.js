const { verifyAccesstoken } = require('../utils/accessToken.js');

function jwtValidation()
{
    return async (req, res, next) => {
        try{
            const accessToken = req.session.accessToken;
            
            verifyAccesstoken(accessToken, (err, decoded) => {
                if(err) throw new Error('No permission to access the resources. Please sign in first.');
                else req.username = decoded.username;
            });

            next();
        }
        catch(e)
        {
            res.status(498).send(e.message);
        }
    }
}

module.exports = jwtValidation;
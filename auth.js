const jwt = require('jsonwebtoken');
const JWT_SECRET = 'jayp';

function auth(req, res, next){
    const token = req.headers.token;
    console.log(token)
    const user= jwt.verify(token, JWT_SECRET);
    if (user){
       req.userId = user.id
        next();
    }
    else{
        res.json({
            "message":"Invalid Token"
        })
    }
        
    }

    module.exports = {
        auth,
        JWT_SECRET
    }
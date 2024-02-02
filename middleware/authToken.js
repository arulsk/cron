const JWT = require('jsonwebtoken')
const { secret_token } = require("../controllers/userControl");


const authenticate_token = (req,res,next)=>{
    try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        if (!token) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
      
        JWT.verify(token, secret_token, (err, user) => {
          if (err) {
            return res.status(403).json({ error: 'Invalid token' });
          }
          req.user = user;
          next();
        });
      
        
    }catch(err){
        if(err) throw Error(err)
    }
}

module.exports = authenticate_token
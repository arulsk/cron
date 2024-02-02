const JWT = require('jsonwebtoken')
const crypto = require('crypto');
const secret_token = crypto.randomBytes(64).toString('hex');

const genterateAcessToken = (data)=>{
    return JWT.sign({data},secret_token,{expiresIn : '3m'})
  }
  
  const generateRefreshToken = ()=>{
   return crypto.randomBytes(64).toString('hex');
  }
  
const refresh_Tokens = {}
  
  const login = ((req,res)=>{
      //after auth
  try{
      const userName = req.body.userName
      const userEmail = req.body.userEmail
      const UserPassword = req.body.userPassword
      const Access_token = genterateAcessToken({userName,userEmail,UserPassword})
      const Refresh_token = generateRefreshToken()
      refresh_Tokens[Refresh_token] = {userName,userEmail,UserPassword}
      res.json({access_token :Access_token,refresh_token :Refresh_token})
  
  }catch(err){
    console.log(err);
      if(err) throw  err
  }
  
  })
  
  
  const refresh = ((req,res)=>{

    try{
       const refresh = req.body.refresh_token
  
      if(!refresh || !refresh_Tokens[refresh]){
        return res.status(403).json({ error: 'Invalid refresh token' });
      }
      const data = refresh_Tokens[refresh]
      const Access_token = genterateAcessToken(data)
       res.json({Access_token})
    }catch(err){
      if(err) throw err
    }
  })
  

  const protected = ((req,res)=>{
    const user = req.user;
    res.json({ message: 'This is a protected route', user });
  
  })
  
  module.exports = {login,protected,refresh,secret_token};
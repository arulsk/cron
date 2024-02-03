const JWT = require('jsonwebtoken')
const crypto = require('crypto');
const userAuth = require('../models/userModel');
const secret_token = crypto.randomBytes(64).toString('hex');

const genterateAcessToken = (data)=>{
    return JWT.sign({data},secret_token,{expiresIn : '2m'})
  }
  
  const generateRefreshToken = ()=>{
   return crypto.randomBytes(64).toString('hex');
  }
  
const refresh_Tokens = {}
  
const login = (async(req,res)=>{
    
  try{
      const userName = req.body.userName
      const userEmail = req.body.userEmail
      const userPassword = req.body.userPassword
      const role = req.body.role;
      
      if(!userName || !userEmail || !userPassword || !role ){
         return  res.status(500).json({
            Error : "user not entered userName or userEmail or userPassword or role "
          })
      }

      const user = await userAuth.userAuthentiacte(userEmail, userPassword, role);

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password or role' });
      }
      
      const Access_token = await genterateAcessToken({userName,userEmail,userPassword,role})
      const Refresh_token = await generateRefreshToken()
      refresh_Tokens[Refresh_token] = {userName,userEmail,userPassword,role}
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

  const user = ((req,res)=>{
    const userName = req.user.data.userName
    const userEmail= req.user.data.userEmail
    res.json({message : 'user access area',userName,userEmail})
  })
  
  module.exports = {login,protected,refresh,secret_token,user};
  
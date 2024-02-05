const protected = ((req,res)=>{
    const user = req.user;
     res.json({ message: 'This is a protected route', user });
  
  })
module.exports = {protected}
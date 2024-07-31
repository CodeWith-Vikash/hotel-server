const jwt= require('jsonwebtoken')

const jwtAuthMiddleware=(req,res,next)=>{

    // first check rquest headers has authorization or not
    const authorization= req.headers.authorization
    if(!authorization) return  res.status(401).json({error:'token not found'})

    // Extract the jwt token from the request headers
    const token= req.headers.authorization.split(' ')[1]

    if(!token) return res.status(401).json({error:'unauthorized'})
    
    try{
    //   verify the jwt token
       const decoded= jwt.verify(token,process.env.JWT_SECRET)
       next()
    }catch(err){
        console.error(err)
        res.status(401).json({error:'invalid token'})
    }
}

// Function to generate JWT Token
const generateToken=(userData)=>{
    return jwt.sign(userData,process.env.JWT_SECRET)
}

module.exports={
    jwtAuthMiddleware,
    generateToken
}
const express= require('express')
const app= express()
const db=require('./db')
require('dotenv').config()
const port=process.env.PORT || 3000
const LocalStrategy = require('passport-local').Strategy;
const passport=require('passport')
const Person=require('./models/person')

const bodyparser=require('body-parser')
app.use(bodyparser.json())

// middleware function
const logTime=(req,res,next)=>{
    console.log(new Date().toLocaleString()+' request made to : '+req.originalUrl)
    next()
}

app.use(logTime)


passport.use(new LocalStrategy(async (username,password,done)=>{
    try{
        console.log('resived credentials:', username,password)
        const user=await Person.findOne({username:username})
        if(!user){
            return done(null,false,{message:'incorrect username'})
        }
        const isPasswordMatch= await user.comparePassword(password)
        if(isPasswordMatch){
            return done(null,user)
        }else{
            return done(null,false,{message:'incorrect password'})
        }
    }catch(err){
        return done(err)
    }
}))

app.use(passport.initialize())
const localAuthMiddleware=passport.authenticate('local',{session:false})

app.get('/',(req,res)=>{
    res.send('Hello world')
})


const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)


app.listen(port)
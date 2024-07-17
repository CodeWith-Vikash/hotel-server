const express= require('express')
const app= express()
const db=require('./db')
require('dotenv').config()
const port=process.env.PORT || 3000

const bodyparser=require('body-parser')
app.use(bodyparser.json())

app.get('/',(req,res)=>{
    res.send('Welcom to hotel data server')
    res.send('you can use endpoints "/person" and "/menu"')
})


const personRoutes=require('./routes/personRoutes')
const menuRoutes=require('./routes/menuRoutes')
app.use('/person',personRoutes)
app.use('/menu',menuRoutes)


app.listen(port)

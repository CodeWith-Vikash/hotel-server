const express= require('express')
const router= express.Router()
const menu= require('../models/menu')

router.post('/',async (req,res)=>{
    try{
        const data=req.body
        const newMenu= new menu(data)
        const savedMenu= await newMenu.save()
        console.log('data saved')
        res.status(200).json(savedMenu)
    }catch(err){
        console.log(err)
        res.status(500).json(
            'internal server errror'
        )
    }
})

router.get('/',async (req,res)=>{
    try{
        let data= await menu.find()
        console.log('data fetched')
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json('internal server error')
    }
})

router.get('/:tasteType',async (req,res)=>{
    try{
        const tasteType=req.params.tasteType
        if(tasteType=='sweet'||tasteType=='sour'||tasteType=='spicy'){
            const data= await menu.find({taste:tasteType})
            res.status(200).json(data)
        }else{
            res.status(404).json('invalid taste type')
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports=router
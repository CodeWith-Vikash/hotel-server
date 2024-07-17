const express= require('express')
const router=express.Router()
const person=require('../models/person')


// saving data to mongodb
router.post('/',async (req,res)=>{
    try{
        const data=req.body
        const newPerson= new person(data)
        const savedPerson= await newPerson.save()
        console.log('data saved')
        res.status(200).json(savedPerson)
    }catch(err){
        console.log(err)
        res.status(500).json('internal server errror')
    }
})

// getting data from mongodb
router.get('/',async (req,res)=>{
    try{
        let data = await person.find()
        console.log('data fetched')
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(500).json('internal server errror')
    }
})

// dynamic routing 
router.get('/:workType', async (req,res)=>{
    try{
        const workType= req.params.workType
        if(workType=='chef' || workType=='manager' || workType=='waiter'){
            const data= await person.find({work:workType})
            res.status(200).json(data)
        }else{
            res.status(404).json('invalid workType')
        }
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})

// updated data
router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id
        const updatedPersonData=req.body
        const response=await person.findByIdAndUpdate(personId,updatedPersonData,{
            new:true,
            runValidators:true
        })
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data updated')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server Error'})
    }
})

// delete data

router.delete('/:id',async (req,res)=>{
    try{
        const personId= req.params.id
        const response= await person.findByIdAndDelete(personId)
        if(!response){
            return res.status(404).json({error:'person not found'})
        }
        console.log('data updated')
        res.status(200).json(response)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'internal server error'})
    }
})

module.exports=router
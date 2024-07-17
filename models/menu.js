const mongoose= require('mongoose')

const menuSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:Array
    },
    num_sales:{
        type:Number,
        default:0
    },
    taste:{
        type:String,
        enum:['sweet','sour','spicy']
    }
})

const menu= mongoose.model('menu',menuSchema)

module.exports=menu
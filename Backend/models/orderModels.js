const mangoose =require('mongoose')

const oderSchema=new mangoose.Schema({
    cartItems:Array,
    amount:String,
    status:String,
    createdAT:String
})
 
const orderModel = mangoose.model('order',oderSchema );

module.exports  = orderModel;
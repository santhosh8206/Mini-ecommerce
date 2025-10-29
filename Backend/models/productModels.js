const mangoose =require('mongoose');

const productSchema= new mangoose.Schema({
    name :String,
    price :String,
    description :String,
    ratings :String,
    images :[
        {
            image:String
        }
    ],
    category :String,
    seller :String,
    stock:String,
    num0fReviews :String,
    createdAt:String
 })

const productModel= mangoose.model('Product',productSchema);

module.exports = productModel;
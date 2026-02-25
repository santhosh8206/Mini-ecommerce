const mangoose=require('mongoose');

const mobileSchema=mangoose.Schema({
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
});

const mobilesModel=mangoose.model('mobiles',mobileSchema)
module.exports=mobilesModel;
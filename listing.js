const mongoose=require("mongoose");

//created a Schema.
const ListSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:String,
    image:{
        type:String,
        default:"https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg",
        set:(v)=> v===" "? "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg":v,
    },
    price:Number,
    country:String,
});

const listing=mongoose.model("listing",ListSchema);
module.exports=listing;
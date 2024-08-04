const mongoose=require("mongoose");
const Newdata=require("./data.js");
const listing=require("../Database/listing.js");
const MONGO_URL="mongodb://127.0.0.1:27017/person";

main().then(()=>{
    console.log("connected to database");
}).catch(err =>{
    console.log(err);
});

async function main(){
    await mongoose.connect(MONGO_URL);
}

const intData=async()=>{
    await listing.deleteMany({});
    await listing.insertMany(Newdata.data);
    console.log("data insert Successfully!");
};
intData();
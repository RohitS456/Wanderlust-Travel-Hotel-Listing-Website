const express=require("express");
const app=express();
const path=require("path");
app.set("view engine","ejs");
app.use(express.urlencoded({extended:true}));
//Ejs file are require
app.set("views",path.join(__dirname,"views"));
const methodOverride=require("method-override");
app.use(methodOverride("_method"));
const ejsMate=require("ejs-mate");
app.engine('ejs',ejsMate);
//CSS file is required 
app.use(express.static(path.join(__dirname,"/public")));

const mongoose=require("mongoose");
//requiring file from Database folder
const listing=require("./Database/listing.js");
//MongoDB Link
const MONGO_URL="mongodb://127.0.0.1:27017/person";

main().then(()=>{
    console.log("connected to database");
}).catch(err =>{
    console.log(err);
})
//Connection of Mongoose
async function main(){
    await mongoose.connect(MONGO_URL);
}


app.get("/listing",async (req,res)=>{

    const result=await listing.find({});
    res.render("index.ejs",{result});
});
//creating new 
app.get("/listing/new",(req,res)=>{
   res.render("New.ejs");
});
//Adding the new data in DB
app.post("/listing",async(req,res)=>{
    const{title,description,image,price,country}=req.body;
    const newListing=new listing({
        title:title,
        description:description,
        image:image,
        price:price,
        country:country,
    });
    await newListing.save();
    res.redirect("/listing");
});

//finding detail of data from his ID
app.get("/listing/:id", async(req,res)=>{
    const {id}=req.params;
   const Idres= await listing.findById(id);
   res.render("show.ejs",{Idres});
});
//edit data from id
app.get("/listing/:id/edit", async (req,res)=>{
    const {id}=req.params;
    const data= await listing.findById(id);
    res.render("Edit.ejs",{data});
})

//editing route 
app.put("/listing/:id", async(req,res)=>{
    const {id}=req.params;
    await listing.findByIdAndUpdate(id,{
        title:req.body.title,
        description:req.body.description,
        image:req.body.image,
        price:req.body.price,
        country:req.body.country,
    });
    res.redirect(`/listing/${id}`);
});

//Deleting the data
app.delete("/listing/:id", async (req,res)=>{
    const {id}=req.params;
  
 await listing.findByIdAndDelete(id);

 res.redirect("/listing");
 
})

// app.get("/testSchema", async (req,res)=>{
//     const sampleData=new listing({
//         title:"Rohit",
//         description:"A Good person in a world.",
//         image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOuxrvcNMfGLh73uKP1QqYpKoCB0JLXiBMvA&s",
//         price:1200,
//         country:"Odisha,India",
//     });
//    await sampleData.save();
//    console.log("Data is saved!");
//    res.send("Data is Saved :)");
// })
app.listen(8080,()=>{
    console.log("server is running on port 8080");
})
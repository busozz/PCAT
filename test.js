const mongoose = require("mongoose")
const Schema = mongoose.Schema

//connect DB
mongoose.connect("mongodb://127.0.0.1:27017/p-cat-test-db")

//create schema
const PhotoSchema = new Schema({    // Şablon oluşturduk.        
    title:String,
    description:String,
})


const Photo = mongoose.model("Photo",PhotoSchema)  // oluşturduğumuz şablonu modele dönüştürdü


// // create a Photo
// Photo.create({
//     title:"Photo 1 ",
//     description:"Photo 1 description Lorem Ipsum"
// })


// read a photo 

// Photo.find ({},(err,data)=>{
//     console.log(data);
// })


// update Photo

const id = "62ff421389c7d8cb04aa1810"

Photo.findByIdAndUpdate(id,{
    title:"Photo 1 updated",
    description:"Photo 1 description updated"
    },
    (err,data)=>{
        console.log(data);
    }
)


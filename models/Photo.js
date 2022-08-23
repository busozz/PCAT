const mongoose = require("mongoose")
const Schema = mongoose.Schema


const PhotoSchema = new Schema({    // Şablon oluşturduk.        
    title:String,
    description:String,
    image:String,
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

const Photo = mongoose.model("Photo",PhotoSchema)

module.exports = Photo // Dosyayı başka yerde kullanmak için export ettik

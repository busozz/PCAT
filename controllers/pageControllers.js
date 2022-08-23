
const Photo = require("../models/Photo.js")

exports.getAboutPage =(req,res) => {
    res.render("about")  
}

exports.getEditPage = (req,res) => {
    res.render("add")  
}



exports.getAddPage = async (req,res) => {
    const photo = await Photo.findOne({_id:req.params.id})
    res.render("edit",{
        photo
    })  
}
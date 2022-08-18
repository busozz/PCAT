const express = require("express")
const path = require("path")

const app = express()


app.use(express.static('public'))           // public isimli dosyadaki içerikler statik diye gösterdik

app.get("/",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"temp/index.html"))     
})




const port = 3000

app.listen(port,()=>{
    console.log(`Sunucu ${port}'unda başlatıldı`);
})


const express = require("express")
const mongoose = require("mongoose")
const ejs = require("ejs")
const fileUpload = require("express-fileupload")
const methodOverride = require('method-override');
const photoController = require("./controllers/photoControllers")
const pageController = require("./controllers/pageControllers")



const app = express()

mongoose.connect("mongodb+srv://Busoz:nW6xL5v4D66YJPwd@cluster0.7htk81x.mongodb.net/?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("DB CONNECTED!");
}).catch((err)=>{
    console.log(err);
})


// Template Engine
app.set("view engine","ejs")        // template'i ejs olarak göstermek için bu kod default olarak kullanılır.


// MiddleWares
app.use(express.static('public'))           // public isimli dosyadaki içerikler statik diye gösterdik
app.use(express.urlencoded({extended:true}))  // url deki datayı okumamızı sağlar.
app.use(express.json())     // urldeki datayı json formatına çevirir.
app.use(fileUpload())       
app.use(methodOverride('_method',{
    methods:["POST","GET"]
}));




/* Get ile kullanıcı benden bir şey almak ister.Site sayfası gibi.
   Post ile kullanıcı bana bir şey göndermek ister.Fotoğraf yüklemek gibi.
*/



// app.get("/", (req,res) => { 
//     //res.sendFile(path.resolve(__dirname,"temp/index.html"))     
//     res.render("index")       // indexi işlemek için yapılır. ama render ile direkt ejs dökümanları çekebildik.
// })


// Routes 

app.get("/",photoController.getAllPhotos)
app.get("/photo/:id", photoController.getPhoto)
app.post("/photos", photoController.createPhoto)
app.put("/photos/:id",photoController.updatePhoto)
app.delete('/photo/:id', photoController.deletePhotos);
app.get("/about",pageController.getAboutPage )
app.get("/add", pageController.getEditPage)
app.get("/photo/edit/:id", pageController.getEditPage)




// app.get("/photo/:id", async (req,res) => {                      //id' ye göre sayfa yönlendirilmesini yaptık
//     const photo = await Photo.findById(req.params.id)           // id parametresine göre database teki verileri getirdik.
//     res.render("photo",{
//         photo                                                   // bu verileri photo sayfasına kullanmak için gönderdik.
//     })
// })



// app.post("/photos", async(req,res) => {  // photos: form içindeki action yönledirmesini burda kullanıyoruz.
//     await Photo.create(req.body);
//     res.redirect("/") 
// })






const port = process.env.PORT || 5000

app.listen(port,()=>{
    console.log(`Sunucu ${port}'unda başlatıldı`);
})



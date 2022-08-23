const path = require("path")
const fs = require("fs")
const Photo = require("../models/Photo.js")


// exports.getAllPhotos = async (req,res)=> {
//     const sentPhotos = await Photo.find({}).sort({dateCreated:-1}) // database içindeki tüm bilgileri sentPhotosa aktardık.
//     res.render("index",{
//         sentPhotos                           // sentPhotosu anasayfaya yolladık.Bunu index.ejs de kullanacagız.
//     })
// }

exports.getAllPhotos = async (req,res)=> {

    const currentPage = req.query.page || 1;             // Başlangıç sayfamız veya ilk sayfamız.
    const photosPerPage = 3                              // Her sayfada bulunan fotoğraf sayısı
    const totalPhotos = await Photo.find().countDocuments()        // Toplam fotoğraf sayısı

    const sentPhotos = await Photo.find({})             // Fotoğrafları alıyoruz  
    .sort({dateCreated:-1})                              // Fotoğrafları sıralıyoruz
    .skip((currentPage-1) * photosPerPage)                 // Her sayfanın kendi fotoğrafları
    .limit(photosPerPage)                          // Her sayfada olmasını istediğimi F. sayısını sınırlıyoruz.

    
    res.render("index",{
        sentPhotos,
        currentPage,
        totalPages: Math.ceil(totalPhotos/photosPerPage)
    })
}




exports.getPhoto = async (req,res) => {                      
    const photo = await Photo.findById(req.params.id)           
    res.render("photo",{
        photo                                                 
    })
}


exports.createPhoto = (req,res) => {

    const uploadDir = 'public/uploads';

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    let uploadeImage = req.files.image     // Sayfada yüklenilen resmi burdan yakaladık.
    let uploadPath = __dirname + "/../public/uploads/" + uploadeImage.name      // Bu resmi yüklemek istediğim klasör yolunu oluşturdum. Yani resmi , sonrasında burada saklanmasını istiyorum.

    uploadeImage.mv(uploadPath, async () => {           // mv (move) fonksiyonu ile çektğim resim verisini nereye yüklemek istediğimi ilk parametrede yazıyorum

        await Photo.create({
            ...req.body,
            image: "/uploads/" + uploadeImage.name        // ikinci parametrede ise image ve diğer title ve description verisini veritabanına gönderdim
        })                                                // resmi gönderirken resmi yüklediğim klasörden çekip database'e yükledim.

        res.redirect("/")
    })
}



exports.updatePhoto = async (req,res) => {
    const photo = await Photo.findOne({_id:req.params.id})
    photo.title = req.body.title
    photo.description = req.body.description
    photo.save()

    res.redirect(`/photo/${req.params.id}`)

}


exports.deletePhotos = async (req, res) => {
    const photo = await Photo.findOne({ _id: req.params.id });
    let deletedImage = __dirname + '/../public' + photo.image;
    fs.unlinkSync(deletedImage);
    await Photo.findByIdAndRemove(req.params.id);
    res.redirect('/');
  }
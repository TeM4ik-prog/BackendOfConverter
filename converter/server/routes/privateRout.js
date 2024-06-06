
const { Router } = require("express")
let express = require("express")


let multer = require('multer');
const { Main } = require("../convertScript/cli");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage//временное хранилище
});
const destinationUploads = "public/uploads"



let PrivateRouter = Router()



PrivateRouter.post("/converSrickers", upload.array('images', 5), async (req, res) => {
    let imgs_ar = req.files

    let ar_paths = await Main(imgs_ar)

    // for (const file of imgs_ar) {


    //     console.log(file)
    // }


    console.log(ar_paths)


    // `./public/stickers/${path.parse(sticker.originalname).name}.gif`

    res.json({ ar_paths })
})


module.exports = PrivateRouter
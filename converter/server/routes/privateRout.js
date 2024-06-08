
const { Router } = require("express")
let express = require("express")


let multer = require('multer');
const { Main } = require("../convertScript/cli");
const { Sticker } = require("../sequelize/models/models");
const { CreateOrFindUncategorized, FindUserByName } = require("../sequelize/functions/functions");
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage//временное хранилище
});
const destinationUploads = "public/uploads"



let PrivateRouter = Router()


PrivateRouter.post("/getUserData", async (req, res) => {
    let username = req.session.username

    if (username) {
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        return res.status(200).json(user_data)
    }
    res.end()
})

PrivateRouter.post("/getUserStickers", async (req, res) => {
    let username = req.session.username
    if (username) {
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        let stickers = await user_data.getUserSticks();

        res.status(200).json(stickers)
    }
    res.end()
})

PrivateRouter.post("/getUserFavorites", async (req, res) => {
    let username = req.session.username
    if (username) {
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        let stickers = await user_data.getFavorite();

        res.status(200).json(stickers)
    }
    res.end()
})





PrivateRouter.post("/convertStickers", upload.array('images', 5), async (req, res) => {


    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        let imgs_ar = req.files
        let ar_paths = await Main(imgs_ar)

        // let ar_paths = [{ url: '../stickers/AnimatedSticker.gif', confirmed: false },
        // { url: '../stickers/AnimatedSticker4.gif', confirmed: false },
        // { url: '../stickers/AnimatedSticker1.gif', confirmed: false }]
        // console.log(ar_paths)



        res.status(200).json({ ar_paths })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})

PrivateRouter.post("/addStickerToBd", upload.array(), async (req, res) => {
    // let { } = req.body

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        let { path, categoryId, title } = Object.assign({}, req.body)//убирает ключ null prototype 
        console.log(path, categoryId, title)

        const sticker = await Sticker.create({ url: path, title })
        await sticker.setCategory(categoryId)

        await user_data.addUserSticks(sticker)


        console.log(sticker)

        res.end()
    } catch (error) {
        console.log(error)
        res.status(400).end()

    }
})


PrivateRouter.post("/addStickerToFavorites",  async (req, res) => {
    let { stickerId } = req.body

    console.log(stickerId)

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })

        if (!user_data) return res.status(500).json({ message: "Войдите" })
        if (await user_data.hasUserSticks(stickerId)) return res.status(500).json({ message: `продукт Ваш` });
        if (await user_data.hasFavorite(stickerId)) return res.status(500).json({ message: `продукт уже есть в корзине` });

        const sticker = await Sticker.findByPk(stickerId);
        await user_data.addFavorite(sticker)

        res.status(200).end()
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})

PrivateRouter.post("/deleteStickerFromFavorites", async (req, res) => {
    let { stickerId } = req.body;
    console.log(stickerId)

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.end()

        const sticker = await Sticker.findByPk(stickerId);

        await user_data.removeFavorite(sticker)

        res.status(200).json({ massage: `продукт удален из корзины` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: `ошибка при удалении из корзины` })
    }
});








PrivateRouter.post("/logout", (req, res) => {
    req.session.destroy()

    res.end()
})






module.exports = PrivateRouter

const { Router } = require("express")
let express = require("express")


let multer = require('multer');
const { Main } = require("../convertScript/cli");
const { Sticker, StickerPack, User } = require("../sequelize/models/models");
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



PrivateRouter.post("/getUserFavorites", async (req, res) => {
    return res.status(400).json("Временно недоступно")

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

        // let ar_paths = [{ url: '/stickers/AnimatedSticker.gif', confirmed: false },
        // { url: '/stickers/AnimatedSticker4.gif', confirmed: false },
        //     // { url: '../stickers/AnimatedSticker1.gif', confirmed: false}
        // ]
        console.log(ar_paths)



        res.status(200).json({ ar_paths })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})

PrivateRouter.post("/addStickerToDb", upload.array(), async (req, res) => {
    // let { } = req.body

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.status(500).json({ message: "Войдите" })

        let { path, title, packId } = Object.assign({}, req.body)//убирает ключ null prototype 
        console.log(path, title, packId)

        const sticker = await Sticker.create({
            url: path,
            title,
            StickerPackId: packId
        })



        // sticker
        // await user_data.addUserSticks(sticker)

        res.status(200).json({ message: 'Стикер сохранен' })
    } catch (error) {
        console.log(error)
        res.status(400).json({ message: 'Ошибка сохранения' })

    }
})


PrivateRouter.post("/addStickerToFavorites", async (req, res) => {
    let { stickerId } = req.body

    console.log(stickerId)

    return res.status(400).json({ message: `Временно недоступно` })

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })

        if (!user_data) return res.status(500).json({ message: "Войдите" })
        // if (await user_data.hasUserSticks(stickerId)) return res.status(500).json({ message: `продукт Ваш` });
        // if (await user_data.hasFavorite(stickerId)) return res.status(500).json({ message: `продукт уже есть в корзине` });

        const sticker = await Sticker.findByPk(stickerId);

        console.log(sticker)

        await user_data.addFavorite(sticker)

        res.status(200).json({ message: "Стикер добавлен в избранные" })
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
        if (!user_data) return res.status(500).json({ message: "Войдите" })

        const sticker = await Sticker.findByPk(stickerId);

        await user_data.removeFavorite(sticker)

        res.status(200).json({ message: `продукт удален из корзины` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: `ошибка при удалении из корзины` })
    }
});



PrivateRouter.post("/checkIsStickerBelongsToUser", async (req, res) => {
    let { stickerId } = req.body;
    console.log(stickerId)

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.status(500).json({ message: "Войдите" })


        const sticker = await Sticker.findByPk(stickerId, {
            include: [{
                model: StickerPack,
                as: 'StickerPack'
            }]
        });

        const userWhoHasSticker = await User.findByPk(user_data.id, {
            include: [{
                model: StickerPack,
                where: { id: sticker.StickerPack.id }
            }]
        });

        if (userWhoHasSticker) {
            return res.status(200).json({ message: `Этот стикер Ваш, можете изменить его`, sticker })
        }
        else {
            return res.status(400).json({ message: "Этот стикер НЕ Ваш, НЕЛЬЗЯ изменить его" })
        }

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка при загрузке' })
    }
});

PrivateRouter.post("/getStickerPackDetailed", async (req, res) => {
    let { stickerPackId } = req.body;
    let isBelongsToUser = false

    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        // if (!user_data) return res.status(500).json({ message: "Войдите" })


        const stickerPack = await StickerPack.findOne({
            where: { id: stickerPackId },
            include: [{
                model: Sticker,
                as: 'Stickers'
            }]
        });


        if (!stickerPack) {
            return res.status(400).json({ message: 'Стикерпак не найден' })
        }

        if (user_data && stickerPack.UserId == user_data.id) isBelongsToUser = true
        let responseObject = stickerPack.toJSON();
        responseObject.isBelongsToUser = isBelongsToUser


        res.status(200).json(responseObject)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Ошибка при загрузке' })
    }
});

PrivateRouter.put("/changeStickerInfo", upload.array({}), async (req, res) => {



    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.status(500).json({ message: "Войдите" })

        let { stickerId, title } = Object.assign({}, req.body)

        console.log(title, stickerId)

        let sticker = await Sticker.findByPk(stickerId)

        await sticker.update({ title: title })


        res.status(200).json({ massage: `стикер изменен` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: `ошибка при изменении` })

    }
});



PrivateRouter.post("/getUserPacks", async (req, res) => {
    let username = req.session.username
    if (username) {
        // let user_data = await FindUserByName({ username })

        let user_data = await User.findOne({
            where: { username: String(username) },
            include: {
                model: StickerPack,
                include: {
                    model: Sticker,
                    as: 'Stickers',
                    limit: 1
                }
            }
        });
        console.log(user_data)
        if (!user_data) return res.end()

        let stickersPacks = await user_data.StickerPacks;

        res.status(200).json(stickersPacks)
    }
    res.end()
})


PrivateRouter.post("/createStickerPack", upload.array({}), async (req, res) => {


    try {
        let username = req.session.username
        let user_data = await FindUserByName({ username })
        if (!user_data) return res.status(500).json({ message: "Войдите" })

        let { packName, categoryId } = Object.assign({}, req.body)
        console.log(packName, categoryId)

        let createdStickerPack = await StickerPack.create({
            packName,
            UserId: user_data.id // Устанавливаем внешний ключ
        })

        await createdStickerPack.setCategory(categoryId)
        console.log(createdStickerPack)


        res.status(200).json({ massage: `стикерпак создан` });
    } catch (error) {
        console.log(error)
        res.status(500).json({ massage: `ошибка при создании` })

    }
});







PrivateRouter.post("/logout", (req, res) => {
    req.session.destroy()

    res.end()
})






module.exports = PrivateRouter
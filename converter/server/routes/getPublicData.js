let express = require("express");
const { Sticker, Category, StickerPack } = require("../sequelize/models/models");
const { Op } = require("sequelize");


let GetPublicDataRout = express.Router()

GetPublicDataRout.post("/getCategories", async (req, res) => {
    const categories = await Category.findAll()

    res.json(categories)
})



// GetPublicDataRout.post("/getStickers", async (req, res) => {
//     let { categoryId } = req.body

//     console.log(categoryId)
//     try {

//         let stickers = []
//         let categoryName = null
//         if (categoryId) {
//             let category = await Category.findByPk(categoryId);
//             categoryName = category.name

//             stickers = await category.getStickers();
//         } else {
//             stickers = await Sticker.findAll();
//         }


//         res.status(200).json({ stickers, categoryName })
//     } catch (error) {
//         console.log(error)
//         res.status(400).end()
//     }
// })


GetPublicDataRout.post("/getStickerPacks", async (req, res) => {
    let { categoryId, paramsMap } = req.body

    console.log(paramsMap)
    try {

        let stickerPacks = []
        let categoryName = null
        if (categoryId) {
            let category = await Category.findByPk(categoryId);
            categoryName = category.name

            stickerPacks = await category.getStickerPacks({
                where: {
                    packName: {
                        [Op.like]: `%${paramsMap.stickersSearch}%`
                    },
                },

                include: {
                    model: Sticker,
                    as: 'Stickers',
                    limit: 1

                }
            });
        } else {
            stickerPacks = await StickerPack.findAll({
                where: {
                    packName: {
                        [Op.like]: `%${paramsMap.stickersSearch}%`
                    },
                },

                include: {
                    model: Sticker,
                    as: 'Stickers',
                    limit: 1

                }
            })
        }



        res.status(200).json({ stickerPacks, categoryName })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})



module.exports = {
    GetPublicDataRout,

}
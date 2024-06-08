let express = require("express");
const { Sticker, Category } = require("../sequelize/models/models");


let GetPublicDataRout = express.Router()

GetPublicDataRout.post("/getCategories", async (req, res) => {
    const categories = await Category.findAll()

    res.json(categories)
})



GetPublicDataRout.post("/getStickers", async (req, res) => {
    let { categoryId } = req.body

    console.log(categoryId)
    try {

        let stickers = []
        let categoryName = null
        if (categoryId) {
            let category = await Category.findByPk(categoryId);
            categoryName = category.name

            stickers = await category.getStickers();
        } else {
            stickers = await Sticker.findAll();
        }


        res.status(200).json({ stickers, categoryName })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
})



module.exports = {
    GetPublicDataRout,

}
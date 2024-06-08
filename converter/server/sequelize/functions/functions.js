const { where } = require("sequelize");
const { StickerPack, Category, User } = require("../models/models");
const { importantCategories } = require("../config/Categories");

async function OnCreateCategories() {
    for (const categoryName of importantCategories) {
        await Category.findOrCreate({ where: { name: categoryName } });
    }
}

async function CreateOrFindUncategorized() {
    let [uncategorized, created] = await Category.findOrCreate({ where: { name: "uncategorized" } })
    return uncategorized
}



async function FindUserByName({ username, getPassword = false }) {
    if (getPassword) {
        return await User.findOne({
            where: { username: String(username) }
        });
    }

    return await User.findOne({
        where: { username: String(username) },
        attributes: { exclude: ['password'] }
    });
}


async function CreateUser({ username, password }) {
    return await User.create({ username, password });
}




module.exports = {

    OnCreateCategories,
    CreateOrFindUncategorized,

    CreateUser,
    FindUserByName
}
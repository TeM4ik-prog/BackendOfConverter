const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/SequelizeConfig");



const FavoritesStickers = sequelize.define('Favorites', {}, {
    tableName: 'Favorites',

    onDelete: 'CASCADE'
});

const UserStickers = sequelize.define('UserStickers', {}, {
    tableName: 'UserStickers',

    onDelete: 'CASCADE'
});





const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: DataTypes.STRING,
    money: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    }
})


const Sticker = sequelize.define('Sticker', {
    stickerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
})

const Category = sequelize.define('Category', {
    categoryId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

});


let StickerPack = sequelize.define('StickerPack', {

})

//для избранных стикеров
User.belongsToMany(Sticker, { through: FavoritesStickers, as: "Favorite", onDelete: 'CASCADE' });
Sticker.belongsToMany(User, { through: FavoritesStickers, as: "Favorite", onDelete: 'CASCADE' });

// для стикеров пользователя
User.belongsToMany(Sticker, { through: UserStickers, as: "UserSticks", onDelete: 'CASCADE' });
Sticker.belongsToMany(User, { through: UserStickers, as: "UserSticks", onDelete: 'CASCADE' });


// для стикерпаков
StickerPack.hasMany(Sticker, { onDelete: 'CASCADE' });
Sticker.belongsTo(StickerPack, { onDelete: 'CASCADE' });


// для категорий товаров
Category.hasMany(Sticker, { onDelete: 'CASCADE' });
Sticker.belongsTo(Category, { onDelete: 'CASCADE' });




module.exports = {
    Sticker,
    StickerPack,
    Category,
    User,

    UserStickers,
    FavoritesStickers
}
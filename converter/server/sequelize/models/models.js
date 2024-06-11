const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/SequelizeConfig");



// const FavoritePacks = sequelize.define('FavoritePacks', {}, {
//     // tableName: 'FavoriteSticks',
//     timestamps: true,
//     onDelete: 'CASCADE'
// });





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
}, {
    tableName: 'User',
    onDelete: 'CASCADE'
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

    // onDelete: 'CASCADE'
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

}, {
    tableName: 'Category',
    onDelete: 'CASCADE'
});


const StickerPack = sequelize.define('StickerPack', {

    packName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // packImg: 
}, {
    tableName: 'StickerPack',
    onDelete: 'CASCADE'
});


// // для избранных стикеров
// User.belongsToMany(StickerPack, { through: FavoritePacks, as: "Favorite", foreignKey: 'UserId' });
// StickerPack.belongsToMany(User, { through: FavoritePacks, as: "Favorite", foreignKey: 'stickerId' });



// для стикпаков пользователя
User.hasMany(StickerPack, { foreignKey: 'UserId', onDelete: 'CASCADE' });
StickerPack.belongsTo(User, { foreignKey: 'UserId', onDelete: 'CASCADE' });

// // для стикеров в стикерпаке
StickerPack.hasMany(Sticker, { as: 'Stickers', foreignKey: 'StickerPackId', onDelete: 'CASCADE' });
Sticker.belongsTo(StickerPack, { as: 'StickerPack', foreignKey: 'StickerPackId', onDelete: 'CASCADE' });



// // для категорий товаров
Category.hasMany(StickerPack, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });
StickerPack.belongsTo(Category, { foreignKey: 'CategoryId', onDelete: 'CASCADE' });




module.exports = {
    Sticker,
    StickerPack,
    Category,
    User,

    // UserStickers,
    // FavoritesStickers
}
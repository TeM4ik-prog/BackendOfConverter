// const { OnCreateCategories } = require("../sequelize/FnsSquelize/functions");
// const { sequelize } = require("../sequelize/config/SequelizeConfig");
// const { Category, Product, User } = require("../sequelize/models/models");


// async function DBO_authenticate(req, res, next) {
//     try {
//         //для очистки бд

//         // await sequelize.sync({ force: true });
//         // await sequelize.authenticate();

//         // await Product.destroy({ truncate: true });
//         // await Category.destroy({ truncate: true });
//         // await User.destroy({ truncate: true });

//         console.log('База данных синхронизирована');
//         next();
//     } catch (error) {
//         console.error('Ошибка при синхронизации базы данных:', error);
//         res.status(500).send('Ошибка при синхронизации базы данных');
//     }
// }


// module.exports = {
//     DBO_authenticate
// }
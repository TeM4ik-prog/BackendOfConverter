const express = require('express');
const { CreateUser, FindUserByName } = require('../sequelize/functions/functions');


let UserEntryRoute = express.Router()

UserEntryRoute.post("/login", async (req, res) => {
    let { username, password } = req.body

    try {
        let user = await FindUserByName({ username, getPassword: true })

        if (user.password == password) {
            req.session.username = username
            res.status(200).json({ massage: `пользователь ${username} успешно вошел` });
        }
        else {
            res.status(400).json({ errText: "Неправильный пароль" })
        }

    } catch (error) {
        res.status(400).json({ errText: "Пользователь не найден" })

    }


})



UserEntryRoute.post("/register", async (req, res) => {
    let { username, password } = req.body
    console.log({ username, password })

    try {
        await CreateUser({ username, password })
        req.session.username = username

        res.status(200).json({ massage: `пользователь ${username} добавлен` });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            res.status(400).json({ errText: "Пользователь с таким именем уже существует" });
        } else {
            console.error('Ошибка при создании пользователя:', error);
            res.status(500).json({ massage: 'Ошибка при создании пользователя' })
        }
    }

})



module.exports = {
    UserEntryRoute
}
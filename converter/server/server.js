let express = require("express")

let path = require("path")
const PrivateRouter = require("./routes/privateRout")
const { sequelize } = require("./sequelize/config/SequelizeConfig");
const { CreateOrFindUncategorized, OnCreateCategories } = require("./sequelize/functions/functions");
const { GetPublicDataRout } = require("./routes/getPublicData");
const { UserEntryRoute } = require("./routes/UserEntry");
const bodyParser = require("body-parser");
const { Auth_session } = require("./All_middleware/auth_middleware");

const PORT = process.env.PORT || 3000;
let app = express()

app.use('/stickers', express.static(path.join(__dirname, 'public/stickers')));
app.use(express.static(path.join(__dirname, "./public")))


// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(bodyParser.json());


app.use(Auth_session())

app.use(UserEntryRoute)
app.use("/private", PrivateRouter)
app.use("/data", GetPublicDataRout)

async function startServer() {
  try {
    await sequelize.authenticate();

    await sequelize.sync({ force: true });//удаление всех бд
    
    console.log('Соединение с базой данных установлено');


    await CreateOrFindUncategorized()
    await OnCreateCategories();

    app.listen(PORT, () => {
      console.log(`Сервер запущен на порту ${PORT}`);
    });
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error);
  }
}

startServer();

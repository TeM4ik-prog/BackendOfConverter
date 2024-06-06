let express = require("express")

let path = require("path")
const PrivateRouter = require("./routes/privateRout")



let app = express()



app.use(express.static(path.join(__dirname, "./public")))


const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.use(PrivateRouter)



app.listen(PORT, () => {
  console.log("Сервер запущен!")
})
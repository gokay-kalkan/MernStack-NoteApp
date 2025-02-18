const {hataYakalama} = require("./middlewares/errorMiddleware")
const baglan = require("./config/db")
const colors = require("colors")


const express = require('express');
require('dotenv').config();

const PORT = process.env.PORT // Eğer .env yoksa 5000 kullan
const app = express();
app.use(express.urlencoded({extended: false}))
app.use(express.json());

app.use('/api/notlar',require('./routes/notRoute'));
app.use('/api/kullanicilar', require('./routes/kullaniciRoute'));
app.use(hataYakalama)
baglan()

app.listen(PORT, ()=>{console.log(`Server ${PORT} üzerinden yayında`.magenta.italic);})

const asyncHandler = require("express-async-handler");
const kullaniciModel = require("../models/kullaniciModel");
const jwt = require("jsonwebtoken")

const kullaniciKontrol = asyncHandler(async(req, res, next)=>{
    let sifrelenmisToken;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            sifrelenmisToken = req.headers.authorization.split(' ')[1]
            const token = jwt.verify(sifrelenmisToken,process.env.JWT_SECRET)

            //request'e user ekleyerek tokenı yazıyoruz
            req.user = await kullaniciModel.findById(token.id).select('-parola')
            next()
        } catch (error) {
            res.status(401)
            throw new Error('giriş yapılamaz')
        }
    }

    if(!sifrelenmisToken){
        res.status(401)
        throw new Error('giriş yapılamaz token bulunamadı')
    }
})

module.exports = {kullaniciKontrol}

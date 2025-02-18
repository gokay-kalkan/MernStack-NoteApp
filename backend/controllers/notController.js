const asyncHandler = require("express-async-handler");
const notModel = require("../models/notModel");
const kullaniciModel = require("../models/kullaniciModel");
const getNotlar = asyncHandler(async (req, res) => {
  //kullanıcı sadece kendi notunu görecek. Requestte çözülmüş tokenın içindeki gelen id ile eşleşmeli
  const notlar = await notModel.find({kullanici: req.user.id}).sort({createdAt:-1});
  res.status(200).json(notlar);
});

const setNotlar = asyncHandler(async (req, res) => {
  if (!req.body.baslik || !req.body.aciklama) {
    res.status(400);
    throw new Error("Lütfen başlık ve açıklama alanlarını giriniz");
  }

  const not = await notModel.create({
    baslik: req.body.baslik,
    aciklama: req.body.aciklama,
    oncelik: req.body.oncelik,
    kullanici: req.user.id
  
  });

  console.log("Eklenen Not:", not);

  res.status(200).json(not);
});

const updateNotlar = asyncHandler(async (req, res) => {

  const not = await notModel.findById(req.params.id);
  const kullanici = await kullaniciModel.findById(req.user.id)

  if(!kullanici){
    res.status(400)
    throw new Error("Kullanıcı bulunamadı")
  }

  if (!not) {
    res.status(400);
    throw new Error("Not bulunamadı");
  }

  //giriş yapan kullanıcının idsi ile veritabanındaki id eşleşiyor mu
  if(not.kullanici.toString()!==kullanici.id){
    res.status(400)
    throw new Error("kullanıcı yetkili değil")
  }

  const guncellendi = await notModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(guncellendi);
});

const deleteNotlar = asyncHandler(async (req, res) => {
  const not = await notModel.findById(req.params.id);
  console.log("Not:", not);
  const kullanici = await kullaniciModel.findById(req.user.id)

  if(!kullanici){
    res.status(400)
    throw new Error("Kullanıcı bulunamadı")
  }

  if (!not) {
    res.status(400);
    throw new Error("Not bulunamadı");
  }

  if(not.kullanici.toString()!==kullanici.id){
    res.status(400)
    throw new Error("kullanıcı yetkili değil")
  }


  await not.deleteOne();
  res.status(200).json({id: req.params.id});
});

module.exports = {
  getNotlar,
  setNotlar,
  updateNotlar,
  deleteNotlar,
};
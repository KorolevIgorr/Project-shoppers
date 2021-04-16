const Check = require('../model/check');
const BagColor = require('../model/bagColor');
const Color = require('../model/color');
const Material = require('../model/material');
const BagModel = require('../model/bagModel');
const BagSize = require('../model/bagSize');
const Image = require('../model/image');
const Text = require('../model/text');
const { Router } = require('express');
const router = Router();



router.post('/', async (req, res) => {
  const { model, bagColor, material, bagSize } = req.body;
  const finalBag = await BagModel.findOne({ name: model });
  const finalBagColor = await BagColor.findOne({ name: bagColor });
  const finalMaterial = await Material.findOne({ name: material });
  const finalSize = await BagSize.findOne({ bagModel: model, sizeName: bagSize });
  let numBags = 500;
  console.log(finalBagColor)
  console.log(finalMaterial)
  console.log(finalSize)

  const check = await Check.create({
    bagModel: finalBag,
    bagColor: finalBagColor,
    material: finalMaterial,
    sizeName: finalSize.sizeName,
    numBags: numBags,
    price:
      (finalBagColor.price + finalMaterial.price + finalSize.price) * numBags,
  });
  // res.render('customer', {check});
  res.render('uploadImg', {model})
});

router.post('/upload', async (req, res) => {
  const check = await Check.findOne({}, {}, { sort: { 'updatedAt' : -1 } }).populate('bagModel')
  let {image} = req.files;
  image.mv(__dirname.replace('/routes', '') + '/public/myImg/' + 'clientsImg.jpg', (err) => {
    res.render("uploadImg", {myimage: image.name, model: check.bagModel.name});
  });
});

module.exports = router;

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
  console.log(req.body);
  const finalBag = await BagModel.findOne({ name: model });
  const finalBagColor = await BagColor.findOne({ name: bagColor });
  const finalMaterial = await Material.findOne({ name: material });
  const finalSize = await BagSize.findOne({ bagModel: model, sizeName: bagSize });
  let numBags = 500;
  const check = await Check.create({
    bagModel: finalBag,
    bagColor: finalBagColor,
    material: finalMaterial,
    sizeName: finalSize.sizeName,
    numBags: numBags,
    price:
      (finalBagColor.price + finalMaterial.price + finalSize.price) * numBags,
  });
  res.render('customer', {check});
});

module.exports = router;

// { _id: 60788cc3132af69c8631a30e, bagModel: { _id: 607863f3dcb30a931aae0908, name: 'model1', image: '/image-bags/model1.jpeg', changableHandles: false, changableBottom: false, __v: 0 }, bagColor: { _id: 607863f2dcb30a931aae08fe, name: 'red', price: 1, __v: 0 }, material: { _id: 607863f2dcb30a931aae0904, name: 'Спанбонд', price: 1, image: 'img1', __v: 0 }, numBags: 500, price: 6500, createdAt: 2021-04-15T18:58:11.947Z, updatedAt: 2021-04-15T18:58:11.947Z, __v: 0 }

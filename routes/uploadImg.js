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
  console.log(finalSize);
  const check = await Check.create({
    bagModel: finalBag,
    bagColor: finalBagColor,
    material: finalMaterial,
    sizeName: finalSize.sizeName,
    numBags: numBags,
    price:
      (finalBagColor.price + finalMaterial.price + finalSize.price) * numBags,
  });
  console.log(check)
  res.redirect('/cart');
});

module.exports = router;

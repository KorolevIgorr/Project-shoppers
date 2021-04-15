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
  const finalSize = await BagSize.findOne({ bagModel: model });
  const check = await Check.create({
    bagModel: finalBag,
    bagColor: finalBagColor,
    material: finalMaterial,
    sizeName: finalSize.name,
    numBags: 500,
    price: 1000,
  });
  res.redirect('/contacts');
});

module.exports = router;

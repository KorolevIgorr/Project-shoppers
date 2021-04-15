const { Router, response } = require('express');
const router = Router();
// const mongoose = require('mongoose');
const BagModel = require('../model/bagModel');
const ImageModel = require('../model/image');
// const ColorModel = require('../model/color');

const BagColor = require('../model/bagModel');
const Color = require('../model/color');
const Material = require('../model/material');
const BagModel = require('../model/bagModel');
const BagSize = require('../model/bagSize');
const Image = require('../model/image');
const Text = require('../model/text');
const Check = require('../model/check');

router.get('/', async (req, res) => {
  const bagModels = await BagModel.find();
  const bagColors = await BagColor.find();
  const materials = await Material.find();
  const colors = await Color.find();
  const firstModelSizesArr = await BagSize.find({bagModel: bagModels[0].name})
  const height = firstModelSizesArr[0].height
  const width = firstModelSizesArr[0].width
  const depth = firstModelSizesArr[0].depth
  const handleSize = firstModelSizesArr[0].handleSize
  
  res.render('orderFormOne', {bagModels, bagColors, materials, sizes: firstModelSizesArr, colors, height, width, depth, handleSize}); // ПОМЕНЯЙ НАЗВАНИЕ, КАК У ИГОРЯ!!!
});

router.post('/upload', (req, res) => {
  let { image } = req.files;
  image.mv(__dirname + '/public/' + image.name, (err) => {
    res.render('index', { image: image.name });
  });
});

router.post('/bags', async (req, res) => {
  console.log(req.body)
  const bag = await BagModel.findOne(req.body);
  const image = await ImageModel.findOne({name: `/image-bags/${req.body.name}.jpeg`});
  res.send({bag, image}).status(200);
});

router.post('/card');

module.exports = router;

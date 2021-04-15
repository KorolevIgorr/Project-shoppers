const { Router, response } = require('express');
const router = Router();
// const mongoose = require('mongoose');
const BagModel = require('../model/bagModel');
const ImageModel = require('../model/image');
// const ColorModel = require('../model/color');

router.get('/', (req, res) => {
  res.render('orderFormOne');
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

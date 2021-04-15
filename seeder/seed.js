const mongoose = require('mongoose');
const BagColor = require('../model/bagColor');
const Color = require('../model/color');
const Material = require('../model/material');
const BagModel = require('../model/bagModel');
const BagSize = require('../model/bagSize');
const Image = require('../model/image');
const Text = require('../model/text');
const Check = require('../model/check');

const bagColors = [
  {
    name: 'red',
    price: 1,
  },
  {
    name: 'blue',
    price: 2,
  },
  {
    name: 'yellow',
    price: 3,
  },
];

const colors = [
  {
    name: 'red',
    price: 1,
  },
  {
    name: 'blue',
    price: 2,
  },
  {
    name: 'yellow',
    price: 3,
  },
];

const materials = [
  {
    name: 'Спанбонд',
    price: 1,
    image: 'img1',
  },
  {
    name: 'Бязь',
    price: 2,
    image: 'img2',
  },
  {
    name: 'Саржа',
    price: 3,
    image: 'img3',
  },
  {
    name: 'Двунитка',
    price: 4,
    image: 'img4',
  },
];

const bagModels = [
  {
    name: 'model1',
    image: 'img1',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model2',
    image: 'img2',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model3',
    image: 'img3',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model4',
    image: 'img4',
    changableHandles: true,
    changableBottom: true,
  },
];

const bagSizes = [
  {
    bagModel: 'model1',
    sizeName: 'small',
    price: 1,
    height: 1,
    width: 1,
    depth: 1,
    handleSize: 1,
  },
  {
    bagModel: 'model2',
    sizeName: 'medium',
    price: 2,
    height: 2,
    width: 2,
    depth: 2,
    handleSize: 2,
  },
  {
    bagModel: 'model3',
    sizeName: 'big',
    price: 3,
    height: 3,
    width: 3,
    depth: 3,
    handleSize: 3,
  },
  {
    bagModel: 'model4',
    sizeName: 'small',
    price: 4,
    height: 4,
    width: 4,
    depth: 4,
    handleSize: 4,
  },
];

async function createCheck() {
  await BagColor.insertMany(bagColors);
  await Color.insertMany(colors);
  await Material.insertMany(materials);
  await BagModel.insertMany(bagModels);
  await BagSize.insertMany(bagSizes);

  const bag = await BagModel.findOne({ name: 'model1' });
  const bagColor = await BagColor.findOne({ name: 'red' });
  const material = await Material.findOne({ name: 'Спанбонд' });
  const size = await BagSize.findOne({ bagModel: bag.name });
  const color = await Color.findOne({ name: 'red' });

  const text = await Text.create({
    name: 'text',
    font: 'helveta',
    bold: true,
    italic: true,
    color,
    area: 200,
  });
  const image = await Image.create({
    name: 'image',
    colors: [color],
    area: 200,
  });

  Check.create({
    bagModel: bag,
    bagColor,
    material,
    size,
    text,
    image,
    numBags: 500,
    price: 1000,
  });
}

async function createBags() {
  await Image.insertMany([
    {name: '/image-bags/model1.jpeg'},
    {name: '/image-bags/model2.jpeg'},
  ])
}
createBags()
// createCheck();

mongoose.connect(
  'mongodb://localhost:27017/shopper',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('mongoose connected');
  }
);

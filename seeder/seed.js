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
    image: '/image-bags/model1.jpeg',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model2',
    image: '/image-bags/model2.jpeg',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model3',
    image: '/image-bags/model3.jpeg',
    changableHandles: false,
    changableBottom: false,
  },
  {
    name: 'model4',
    image: '/image-bags/model4.jpeg',
    changableHandles: true,
    changableBottom: true,
  },
];

const bagSizes = [
  {
    bagModel: 'model1',
    sizeName: 'small',
    price: 11,
    height: 11,
    width: 11,
    depth: 11,
    handleSize: 11,
  },
  {
    bagModel: 'model1',
    sizeName: 'medium',
    price: 12,
    height: 12,
    width: 12,
    depth: 12,
    handleSize: 12,
  },
  {
    bagModel: 'model1',
    sizeName: 'big',
    price: 13,
    height: 13,
    width: 13,
    depth: 13,
    handleSize: 13,
  },
  {
    bagModel: 'model2',
    sizeName: 'small',
    price: 21,
    height: 21,
    width: 21,
    depth: 21,
    handleSize: 21,
  },
  {
    bagModel: 'model2',
    sizeName: 'medium',
    price: 22,
    height: 22,
    width: 22,
    depth: 22,
    handleSize: 22,
  },
  {
    bagModel: 'model2',
    sizeName: 'big',
    price: 23,
    height: 23,
    width: 23,
    depth: 23,
    handleSize: 23,
  },
  {
    bagModel: 'model3',
    sizeName: 'small',
    price: 31,
    height: 31,
    width: 31,
    depth: 31,
    handleSize: 31,
  },
  {
    bagModel: 'model3',
    sizeName: 'medium',
    price: 32,
    height: 32,
    width: 32,
    depth: 32,
    handleSize: 32,
  },
  {
    bagModel: 'model3',
    sizeName: 'big',
    price: 33,
    height: 33,
    width: 33,
    depth: 33,
    handleSize: 33,
  },
  {
    bagModel: 'model4',
    sizeName: 'small',
    price: 41,
    height: 41,
    width: 41,
    depth: 41,
    handleSize: 41,
  },
  {
    bagModel: 'model4',
    sizeName: 'medium',
    price: 42,
    height: 42,
    width: 42,
    depth: 42,
    handleSize: 42,
  },
  {
    bagModel: 'model4',
    sizeName: 'big',
    price: 43,
    height: 43,
    width: 43,
    depth: 43,
    handleSize: 43,
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

createCheck();

mongoose.connect(
  'mongodb://localhost:27017/shopper',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('mongoose connected');
  }
);

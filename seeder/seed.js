const mongoose = require('mongoose');
const Color = require('../model/color')
const Material = require('../model/material')
const BagModel = require('../model/bagModel')
const Size = require('../model/size')


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
  }
]

Color.insertMany(colors);

const materials = [
  {
    name: 'Спанбонд',
    price: 1,
    image: 'img1'
  },
  {
    name: 'Бязь',
    price: 2,
    image: 'img2'
  },
  {
    name: 'Саржа',
    price: 3,
    image: 'img3'
  },
  {
    name: 'Двунитка',
    price: 4,
    image: 'img4'
  }
]

Material.insertMany(materials);

const bagModels = [
  {
    name: "model1",
    image: 'img1',
    changableHandles: false,
    changableBottom: false
  },
  {
    name: "model2",
    image: 'img2',
    changableHandles: false,
    changableBottom: false
  },
  {
    name: "model3",
    image: 'img3',
    changableHandles: false,
    changableBottom: false
  },
  {
    name: "model4",
    image: 'img4',
    changableHandles: true,
    changableBottom: true
  }
]

BagModel.insertMany(bagModels);

const sizes = [
  {
    bagModel: "model1",
    size: 'small',
    price: 11,
    heighth: 11,
    width: 11,
    depth: 11,
    handleSize: 11
  },
  {
    bagModel: "model1",
    size: 'medium',
    price: 12,
    heighth: 12,
    width: 12,
    depth: 12,
    handleSize: 12
  },
  {
    bagModel: "model1",
    size: 'big',
    price: 13,
    heighth: 13,
    width: 13,
    depth: 13,
    handleSize: 13
  },
  {
    bagModel: "model2",
    size: 'small',
    price: 21,
    heighth: 21,
    width: 21,
    depth: 21,
    handleSize: 21
  },
  {
    bagModel: "model2",
    size: 'medium',
    price: 22,
    heighth: 22,
    width: 22,
    depth: 22,
    handleSize: 22
  },
  {
    bagModel: "model2",
    size: 'big',
    price: 23,
    heighth: 23,
    width: 23,
    depth: 23,
    handleSize: 23
  },
  {
    bagModel: "model3",
    size: 'small',
    price: 31,
    heighth: 31,
    width: 31,
    depth: 31,
    handleSize: 31
  },
  {
    bagModel: "model3",
    size: 'medium',
    price: 32,
    heighth: 32,
    width: 32,
    depth: 32,
    handleSize: 32
  },
  {
    bagModel: "model3",
    size: 'big',
    price: 33,
    heighth: 33,
    width: 33,
    depth: 33,
    handleSize: 33
  },
  {
    bagModel: "model4",
    size: 'small',
    price: 41,
    heighth: 41,
    width: 41,
    depth: 41,
    handleSize: 41
  },
  {
    bagModel: "model4",
    size: 'medium',
    price: 42,
    heighth: 42,
    width: 42,
    depth: 42,
    handleSize: 42
  },
  {
    bagModel: "model4",
    size: 'big',
    price: 43,
    heighth: 43,
    width: 43,
    depth: 43,
    handleSize: 43
  },
]

Size.insertMany(sizes);

mongoose.connect('mongodb://localhost:27017/shopper', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
 console.log('mongoose connected');
});

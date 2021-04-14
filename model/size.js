const {Schema, model} = require('mongoose')

const sizeSchema = new Schema({
  bagModel: String,
  sizeName: String, //small, medium, big, individualized
  price: Number,
  heighth: Number,
  width: Number,
  depth: Number,
  handleSize: Number
})

const size = model('Size', sizeSchema);

module.exports = size;

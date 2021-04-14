const {Schema, model} = require('mongoose')

const colorSchema = new Schema({
  name: String,
  price: Number,
})

const color = model('Color', colorSchema);

module.exports = color;

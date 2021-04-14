const {Schema, model} = require('mongoose')

const checkSchema = new Schema({
  bagModel: {
    type: Schema.Types.ObjectId,
    ref="BagModel"
  },
  color: {
    type: Schema.Types.ObjectId,
    ref="Color"
  },
  material: {
    type: Schema.Types.ObjectId,
    ref="Material"
  },
  size: {
    type: Schema.Types.ObjectId,
    ref="Size"
  },
  price: Number
})

const check = model('Check', checkSchema);

module.exports = check;

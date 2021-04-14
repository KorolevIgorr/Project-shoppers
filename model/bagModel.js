const {Schema, model} = require('mongoose')

const modelSchema = new Schema({
  name: String,
  image: String,
  changableHandles: Boolean,
  changableBottom: Boolean
})

const bagModel = model('BagModel', modelSchema);

module.exports = bagModel;

const Check = require('../model/check')

const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const check = await Check.findOne({}, {}, { sort: { 'updatedAt' : -1 } })
  .populate('bagModel')
  .populate('bagColor')
  .populate('material')
  .populate('size')
  .populate('text')
  .populate('image')
  .populate({
    path: 'text',
    populate: { path: 'color' },
  })
  .populate({
    path: 'image',
    populate: { path: 'colors' },
  })
  console.log(check)
  res.render('customer', {check}); // ПОМЕНЯЙ НАЗВАНИЕ, КАК И ИГОРЯ!!!
});

module.exports = router;

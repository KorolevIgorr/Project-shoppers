const Check = require('../model/check');
const write = require('../reading + writing/readingMongoose');
const main = require('../mailer/mailer');
const { Router } = require('express');
const router = Router();

router.get('/', async (req, res) => {
  const check = await Check.findOne({}, {}, { sort: { updatedAt: -1 } })
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
    });
  res.render('customer', { check }); // ПОМЕНЯЙ НАЗВАНИЕ, КАК И ИГОРЯ!!!
});

router.post('/complete-order', (req, res) => {
  console.log(req.body)
  const {name, lastName, email, adres} = req.body
  write();

  main(name, lastName, email, adres).catch(console.error);
  res.redirect('/done');
});

module.exports = router;

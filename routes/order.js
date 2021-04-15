const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('orderFormOne');
});

router.post('/upload', (req, res) => {
  let { image } = req.files;
  image.mv(__dirname + '/public/' + image.name, (err) => {
    res.render('index', { image: image.name });
  });
});

router.post('/card')

module.exports = router;

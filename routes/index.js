const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.redirect('/order');
});

router.get('/done', (req, res) => {
  res.render('done');
});

module.exports = router;

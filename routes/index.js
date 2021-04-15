const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.redirect('/order');
});

module.exports = router;

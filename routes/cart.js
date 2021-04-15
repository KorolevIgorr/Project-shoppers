const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('customer'); // ПОМЕНЯЙ НАЗВАНИЕ, КАК И ИГОРЯ!!!
});

module.exports = router;

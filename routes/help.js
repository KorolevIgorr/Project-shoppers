const { Router } = require('express');
const router = Router();

router.get('/', (req, res) => {
  res.render('help'); // ПОМЕНЯЙ НАЗВАНИЕ, КАК И ИГОРЯ!!!
});

module.exports = router;

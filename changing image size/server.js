const express = require('express')
const app = express()

app.use(express.static('public'))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render("index")
})

app.listen(3000)

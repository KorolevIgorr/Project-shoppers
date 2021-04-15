const express = require('express')
const app = express()
const morgan = require('morgan')

app.use(express.static('public'));
app.set('view engine', 'hbs');
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.render("index")
})

const fileUpload = require('express-fileupload')
app.use(fileUpload());

app.post('/upload', (req, res) => {
  let {image} = req.files;
  image.mv(__dirname + '/public/' + image.name, (err) => {
    res.render("index", {image: image.name});
  });
});

app.listen(3000);

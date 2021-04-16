const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();
const hbs = require('hbs');
const path = require('path');
const fileUpload = require('express-fileupload');
const MongoClient = require('mongodb').MongoClient;

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const helpRouter = require('./routes/help');
const contactsRouter = require('./routes/contacts');
const uploadimgRouter = require('./routes/uploadImg');

const port = process.env.PORT || 4256;
const dbPath = process.env.DB_HOST + process.env.DB_PORT + process.env.DB_NAME;
const uri = process.env.DB_ATLAS_PATH;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// const DBname = 'shopper';
const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());

app.use('/contacts', contactsRouter);
app.use('/uploadImg', uploadimgRouter);
app.use('/help', helpRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server port ${port} is ready`);
  mongoose.connect(
    uri,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    },
    () => {
      console.log('DB is ready');
    }
  );
});

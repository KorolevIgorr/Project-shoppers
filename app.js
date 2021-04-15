const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const hbs = require('hbs');
const path = require('path');
const fileUpload = require('express-fileupload');

const indexRouter = require('./routes/index');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
const helpRouter = require('./routes/help');
const conditionsRouter = require('./routes/conditions');
const contactsRouter = require('./routes/contacts');

const port = 3000;
const DBname = 'shoppers';
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
app.use('/conditions', conditionsRouter);
app.use('/help', helpRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/', indexRouter);

app.listen(port, () => {
  console.log(`Server port ${port} is ready`);
  mongoose.connect(
    `mongodb://localhost:27017/${DBname}`,
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

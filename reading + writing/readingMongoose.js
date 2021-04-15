const mongoose = require('mongoose');
const fonts = {
  Roboto: {
    normal: 'pdf/fonts/Roboto-Italic.ttf',
    bold: 'pdf/fonts/Roboto-Medium.ttf',
    italics: 'pdf/fonts/Roboto-Italic.ttf',
    bolditalics: 'pdf/fonts/Roboto-MediumItalic.ttf',
  },
};
const PdfPrinter = require('pdfmake');
const printer = new PdfPrinter(fonts);
const fs = require('fs');

const Check = require('../model/check');
const BagColor = require('../model/bagColor');
const Color = require('../model/color');
const Material = require('../model/material');
const BagModel = require('../model/bagModel');
const BagSize = require('../model/bagSize');
const Text = require('../model/text');
const Image = require('../model/image');

async function write() {
  const check = await Check.findOne()
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

  const imgColorNameArr = check.image.colors.map((el) => el.name).join(', ');
  const imgColorPrice = check.image.colors.reduce(
    (acc, el) => acc + el.price,
    0
  );

  let str = `BAG
type: ${check.bagModel.name}
color: ${check.bagColor.name} --------------------- ${check.bagColor.price}₽ 
material: ${check.material.name} --------------------- ${check.material.price}₽ 
size: ${check.size.sizeName} --------------------- ${check.size.price}₽ 
  height: ${check.size.height}, 
  width: ${check.size.width}, 
  depth: ${check.size.depth}, 
  length of straps: ${check.size.handleSize}
  `;

  if (check.image) {
    str += `
IMAGE
colors: ${imgColorNameArr} --------------------- ${imgColorPrice}₽ 
area: ${check.image.area} --------------------- ${check.image.area * 3}₽
`;
  }
  if (check.text) {
    str += `
TEXT
text: ${check.text.name}
color: ${check.text.color.name} --------------------- ${check.text.color.price}₽
font: ${check.text.font}
bold: ${check.text.bold}
italic: ${check.text.italic}
area: ${check.text.area} --------------------- ${check.text.area * 3}₽
`;
  }
  str += `
price of one bag: ${check.numBags}₽
number of bags bought: ${check.numBags}  
total price: --------------------- ${check.price * check.numBags}₽`;

  let docDefinition = {
    content: [
      {
        text: str,
      },
    ],
  };
  const pdfDoc = printer.createPdfKitDocument(docDefinition /*, options */);
  pdfDoc.pipe(fs.createWriteStream('./pdf/pdfs/Спецификация.pdf'));
  pdfDoc.end();
}

write()
async function findNewestCheck() {
  const a = await Check.findOne({}, {}, { sort: { 'updatedAt' : -1 } })
  console.log(a)
}

// findNewestCheck()

mongoose.connect(
  'mongodb://localhost:27017/shopper',
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('mongoose connected');
  }
);

module.exports = write;

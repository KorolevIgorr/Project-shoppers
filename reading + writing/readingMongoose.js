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
  const check = await Check.findOne({}, {}, { sort: { updatedAt: -1 } })
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

  console.log(check);

  let modelName = check.bagModel.name;
  let colorBag = check.bagColor.name;
  let materialName = check.material.name;
  let limit = check.numBags;
  let priceName = check.price;

  let str = `Спецификация\n\nНазвание сумки: --------------------- ${modelName}\nЦвет сумки: --------------------- ${colorBag}\nМатериал сумки: --------------------- ${materialName}\nТираж: --------------------- ${limit}\nСтоимость: --------------------- ${priceName}`;

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

write();
async function findNewestCheck() {
  const a = await Check.findOne({}, {}, { sort: { updatedAt: -1 } });
  console.log(a);
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

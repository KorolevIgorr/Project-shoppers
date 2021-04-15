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

const color = 'красный'

let docDefinition = {
  content: [
    {
      text: `Цвет ${color}`,
    },
    {
      text: 'выф',
    },
  ],
};

// let options = {
//   // ...
// };

const pdfDoc = printer.createPdfKitDocument(docDefinition /*, options */);
pdfDoc.pipe(fs.createWriteStream('./pdf/pdfs/Спецификация.pdf'));
pdfDoc.end();

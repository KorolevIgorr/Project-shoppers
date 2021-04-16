'use strict';
const nodemailer = require('nodemailer');

async function main(name, lastname, email, phone, adres) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: 'shopper-store@yandex.ru',
      pass: 'passwordforshopperstore',
    },
  });

  let info = await transporter.sendMail({
    from: 'shopper-store@yandex.ru',
    to: 'zvoznikovandrey@gmail.com',
    subject: 'Спецификация',
    text: `Добрый день. Во вложении спецификация и картинка для печати\nИнформация о заказе:\nИмя: ${name}\nФамилия: ${lastname}\nE-mail: ${email}\nТелефон: ${phone}\nАдрес доставки: ${adres}`,
    attachments: [
      {
        path: './pdf/pdfs/Спецификация.pdf',
      },
      { path: `./public/myImg/clientsImg.jpg` },
    ],
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = main;

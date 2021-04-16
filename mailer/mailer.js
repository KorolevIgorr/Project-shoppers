'use strict';
const nodemailer = require('nodemailer');
require('dotenv').config();

async function main(name, lastname, email, phone, adres) {
  let transporter = nodemailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
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

"use strict";
const nodemailer = require("nodemailer");

async function main() {
  // let testAccount = await nodemailer.createTestAccount('smtps://USERNAME%40gmail.com:PASSWORD@smtp.gmail.com');

  let transporter = nodemailer.createTransport({
    host: "smtp.yandex.ru",
    port: 465,
    secure: true, 
    auth: {
      user: 'shopper-store@yandex.ru',
      pass: 'passwordforshopperstore',
    },
  });


  let info = await transporter.sendMail({
    from: 'shopper-store@yandex.ru', 
    to: "zvoznikovandrey@gmail.com",
    subject: "Спецификация",
    text: "Добрый день. Во вложении спецификация",
    attachments: {
      path: './pdf/pdfs/Спецификация.pdf'
    }
    // html: "<b>Hello world?</b>",
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);

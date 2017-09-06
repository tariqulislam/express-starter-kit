let nodemailer = require('nodemailer');
require('dotenv').config();

module.exports.GmailTransport = nodemailer.createTransport({
    service:process.env.MAIL_SERVICE_NAME,
    host:process.env.MAIL_SERVICE_HOST,
    secure:process.env.MAIL_SERVICE_SECURE,
    port: process.env.MAIL_SERVICE_PORT,
    auth: {
      user: process.env.MAIL_USER_NAME,
      pass: process.env.MAIL_USER_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
});


module.exports.MailGunTransport = nodemailer.createTransport({
  service:process.env.MAIL_SERVICE_NAME,
  host:process.env.MAIL_SERVICE_HOST,
  secure:process.env.MAIL_SERVICE_SECURE,
  port: process.env.MAIL_SERVICE_PORT,
  auth: {
    user: process.env.MAIL_USER_NAME,
    pass: process.env.MAIL_USER_PASS
  }
});

module.exports.ViewOptions = (transport, hbs) => {

  transport.use('compile', hbs({
    viewPath: 'views/email',
    extName: '.hbs'
  }));

}

module.exports.HelperOptions = (from,to,subject,html,text) => {
   return {
     from: from,
     to: to,
     subject: subject,
     html: html,
     text:text
   }
}

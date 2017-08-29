var express = require('express');
var router = express.Router();
var MailConfig = require('../config/mail');

var hbs = require('nodemailer-express-handlebars');
var transport = MailConfig.GmailTransport;
MailConfig.ViewOptions(transport,hbs);

router.get('/template',(req,res,next) => {
  /** Must be required **/
  let HelperOptions = {
    from: '"Tariqul islam" <tariqul@apptacore.io>',
    to: 'tariqul@itconquest.com',
    subject: 'Hellow world!',
    template: 'check',
    context: {
      name:"tariqul_islam",
      email: "tariqul.islam.rony@gmail.com"
    }
  };
  transport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }

    console.log("email is send");
    console.log(info);
    res.json(info)
  });

});

router.get('/normal', (req,res,next) => {

  let HelperOptions = {
    from: '"Tariqul islam" <tariqul@apptacore.io>',
    to: 'tariqul@itconquest.com',
    subject: 'Hellow world!',
    text: "this is normal mail from express starter kit",
    html: "<h4> Help me to imporve my coding</h4>"
  };

  transport.sendMail(HelperOptions, (error,info) => {
    if(error) {
      console.log(error);
      res.json(error);
    }

    console.log("email is send");
    console.log(info);
    res.json(info)
  });
})

module.exports = router;

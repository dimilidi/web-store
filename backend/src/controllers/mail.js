const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
        user: 'tattoochase80@gmail.com',
        pass: 'baqcgodkbzblfysy'
    }
});

let mailOptions = {
    from: 'tattoochase80@gmail.com',
    to: 'tattoochase80@gmail.com',
    subject: 'Test',
    text: 'Hello World!'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error.message);
    }
    console.log('success');
});
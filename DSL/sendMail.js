const nodemailer = require('nodemailer');
const Email_pass = 'tcxwowmpyttvdiyc';
const Eamil_address = 'amirkohjani.iot@gmail.com';
const controller = {
    sendMial: (data, next) => {
        var trasporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: Eamil_address,
                pass: Email_pass
            }
        });
        // console.log("token in Email :", Email.token);
        // const data = jwt.decode(Email.token)
        // console.log(data)
        const token = data.token;
        // const url = "http://localhost:3000/auth/resetPassword?token=" + token;
        var mailOptions = {
            from: 'amirkohjani.iot@gmail.com',
            to: data.to,
            subject: data.subject,
            text: data.text,
            html: `<h3>${data.text}</h3>`
        };
        trasporter.sendMail(mailOptions, function (err, info) {
            if (err) next(err)
            else {
                next(null, info)
            }
        })
    }

}

module.exports = controller;
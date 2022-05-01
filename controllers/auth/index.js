const nodemailer = require("nodemailer");
const redis = require("redis");
const sendEmail = require("../../DSL/sendMail");
const REDIS_PORT = process.env.PORT || 6379;
// const redisClient = redis.createClient('redis://:eIB7LtyJkVbj02WPa7VCVWHj@linda.iran.liara.ir:34311/0');
const redisClient = redis.createClient(REDIS_PORT);


const controller = {
  // sendMail :(data,callback)=>{
  //     var trasporter = nodemailer.createTransport({
  //         service:'gmail',
  //         auth:{
  //             user:'amirkohjani.iot@gmail.com',
  //             pass:'tcxwowmpyttvdiyc'
  //         }
  //     });
  //     const token =Math.floor(Math.random()*9999);
  //     // const url  = "http://localhost:3000/login?token="+token;
  //     var mailOptions ={
  //         from:'amirkohjani.iot@gmail.com',
  //         to:'amir.mdm19@gmail.com',
  //         subject:'test Email from Node Js Server',
  //         html: `<h1>wellcome , your number is : ${token}</h1>`
  //     };
  //     trasporter.sendMail(mailOptions,function (err,info) {
  //         if (err) callback(err,null);
  //         else {
  //             callback(null,info)
  //         }
  //     })
  // },
  sendmail: (data, callback) => {
    const token = data.token;
    
    const Email = {
      to: data.userEmail,
      subject: "کد اهراز هویت اسکیلاس !",
      text: `سلام دوست عزیز
            کد تایید اسکیلاس شما 
             می باشد <h2>${token}</h2>
            
            `,
    };
    sendEmail.sendMial(Email, (err, result) => {
      if (err) callback(err);
      else {
        const result = {
          token,
        };
        callback(null, result);
      }
    });
  },
  sendSMS: (data, callback) => {
    //send data to SMS Server

    //call back function

    callback(null, data);
  },
  generateToken: (phone, callback) => {
    const token = Math.floor(Math.random() * 9999);

    //save token and phone in redis
    redisClient.setex(phone, 3600, token);
    console.log(`${phone} : ${token}, saved in redis`);
    //send token token
    callback(token);
  },
  validationToke : (data, callback)=>{
      const {email,numberValid} = data;
      console.log(data);
      redisClient.get(email,(err,data)=>{
          if(err) callback(err)
          else {
              if(data==numberValid) callback(null,true)
              else if (data!==numberValid) callback(null,false);          }
      })
  }
};

module.exports = controller;

const _ = require("lodash");
const bcrypt = require("bcrypt");
const usersRepo = require("../../DAL/user.repo");
const SMS = require("../auth");
var USER_DATA = {};
// const sendEmail = require('../../More/sendemail')
const jwt = require("jsonwebtoken");
const controller = {
  login: (req, res) => {
    const credentials = _.pick(req.body, ["email", "password"]);
    credentials.email = credentials.email.toLowerCase();
    // console.log(credentials)
    usersRepo.findeByNumberEmailAddress(credentials.email, (err, user) => {
      if (err) {
        console.log('error tihs')
        res.status(500).send(err);
      } else if (!user) {
        console.log("user not found");
        res.status(404).send({ msg: "this username not Esits" });
      } else {
        bcrypt
          .compare(credentials.password, user.password)
          .then((isMaych) => {
            console.log(isMaych);
            if (isMaych) {
              usersRepo.genToken(user.email, (err, token) => {
                if (err) {
                  console.log('1');
                  res.status(500).send(err);}
                else {
                  user.token = token;
                  delete user.tokens;
                  delete user.password;
                  delete user.personal;
                  console.log(user);
                  res.send(user);
                }
              });
            } else {
              res.status(400).send({ msg: "password not Match !" });
            }
          })
          .catch((err) => {
            console.log('2')
            res.status(500).send(err);
          });
      }
    });
  },
  register: (req, res) => {
    // console.log(req.body);
    // const credentials = _.pick(req.body, ["phone"]);
    const credentials = _.pick(req.body, ["email"]);
    credentials.email = credentials.email.toLowerCase();
    console.log(credentials);
    //check user exsits

    // usersRepo.findeByNumberPhonenumber(credentials.phone, (err, user) => {
    usersRepo.findeByNumberEmailAddress(credentials.email, (err, user) => {
      if (err) {
        res.status(500).send(err);
        console.log("1");
      } else if (user) {
        // console.log('this phone number exsist')
        console.log("this Email Address exsist");
        // res.send({status:400, msg: "this phone esits" });
        res.send({ status: 400, msg: "this Email esits" });
      } else {
        //SMS VALIDATION
        SMS.generateToken(credentials.email, (token) => {
          const data = {
            // userPhone: credentials.phone,
            userEmail: credentials.email,
            token: token,
          };
          // SMS.sendSMS(data, (err, result) => {
          //   if (err) res.status(500).send(err);
          //   else {
          //     console.log(result);
          //     res.send("SMS Token Sended");
          //   }
          // });
          SMS.sendmail(data, (err, result) => {
            if (err) {
              res.status(500).send(err);
              console.log(err);
            } else {
              //redis
              // USER_DATA = { credentials, token: result.token };
              // console.log(USER_DATA);
              res.send("email sended");
            }
          });
        });
      }
    });
  },
  validRegistration: (req, res) => {
    // const credentials = _.pick(req.body, ["numberValid", "phone"]);
    const credentials = _.pick(req.body, ["numberValid", "email"]);
    // console.log(credentials);

    SMS.validationToke(credentials, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        if (result == false) {
          res.status(400).send("The number entered is incorrect");
        } else if (result == true) {
          res.status(200).send("The entered number is correct");
        }
      }
    });
  },
  confirmRegistration: (req, res) => {
    const credentials = _.pick(req.body, ["password", "email", "Data"]);
    credentials.email = credentials.email.toLowerCase();

    console.log(credentials);
    // usersRepo.findeByNumberPhonenumber(credentials.Data.phone, (err, user) => {
    usersRepo.findeByNumberEmailAddress(credentials.email, (err, user) => {
      if (err) {
        console.log("error");
        res.status(500).send(err);
      } else if (!user) {
        const salt = bcrypt.genSaltSync(10);
        bcrypt.hash(credentials.password, salt).then((hashedPassword) => {
          usersRepo.creat(
            {
              // phone: credentials.phone,
              Data: credentials.Data,
              password: hashedPassword,
              email: credentials.email,
            },
            (err, result) => {
              if (err) res.status(500).send(err);
              else {
                // usersRepo.findeByNumberPhonenumber(
                usersRepo.findeByNumberEmailAddress(
                  // credentials.phone,
                  credentials.email,
                  (err, user) => {
                    console.log("user :", user);
                    if (err) res.status(500).send(err);
                    else {
                      // usersRepo.genToken(user.phone,(err, token)=>{
                      usersRepo.genToken(user.email, (err, token) => {
                        if (err) res.status(500).send(err);
                        else {
                          user.token = token;
                          delete user.password;
                          res.send(user);
                        }
                      });
                    }
                  }
                );
              }
            }
          );
        });
      }
    });
  },

  //-----------------------------------------896192-----------------------
  //generate salt

  //----------------

  // forgetPassword: (req, res) => {
  //     const credentials = _.pick(req.body, ['username', 'email']);
  //     console.log(credentials.email)
  //     credentials.username = credentials.username.toLowerCase();
  //     credentials.email = credentials.email.toLowerCase();
  //     usersRepo.findbyusername(credentials.username, (err, user) => {
  //         if (err) res.status(500).send(err)
  //         else if (!user) res.send('user Not Found')
  //         else {
  //             console.log("user found")
  //             usersRepo.genTokenRestPass(user, (err, toke) => {
  //                 if (err) res.status(500).send(err);
  //                 else {
  //                     console.log("token gen : ", toke.toString())
  //                     const email = {
  //                         to: credentials.email,
  //                         subject: 'rest password',
  //                         text: 'hay .... link reset password :\n',
  //                         token: toke.toString()
  //                     }
  //                     sendEmail.sendMial(email, (err, result) => {
  //                         if (err) res.status(500).send(err)
  //                         else {
  //                             console.log("email sened")
  //                             res.send(result);
  //                         }
  //                     })

  //                 }
  //             })
  //         }
  //     })
  // },
  // resetPassword: (req, res) => {
  //     const credentials = _.pick(req.body, ['password', 'Repassword', 'token']);
  //     if (credentials) {
  //         const tokenDecoded = jwt.decode(credentials.token)
  //         usersRepo.findbyusername(tokenDecoded.username.toString(), (err, user) => {
  //             if (err) res.status(500).send(err)
  //             else {
  //                 delete user.restpasstoken
  //                 const salt = bcrypt.genSaltSync(10);
  //                 bcrypt.hash(credentials.password, salt).then(hashedpassword => {
  //                     user.password = hashedpassword
  //                     usersRepo.update(user, (err, result) => {
  //                         if (err) res.status(500).send(err)
  //                         else {
  //                             res.send('pass updated !')
  //                         }
  //                     })
  //                 }).catch(err => {
  //                     res.status(500).send(err)
  //                 })
  //             }
  //         })
  //         //  usersRepo.findbyusername(tokenDecoded.username)
  //     } else {
  //         res.status(400).send(new Error('not found data'))
  //     }

  // }

  // if (credentials.numberValid == JSON.stringify(USER_DATA.token)) {
  //   //----confrim registerion
  //   const salt = bcrypt.genSaltSync(10);
  //   //  //hash password
  //   //  //salat exp :djlfh24ot-034wef6534#$%T$#Tfg3465f034
  //   bcrypt
  //     .hash(USER_DATA.credentials.password, salt)
  //     .then((hashedPassword) => {
  //       //save the user
  //       usersRepo.creat(
  //         { username: USER_DATA.credentials.email, password: hashedPassword },
  //         (err, result) => {
  //           if (err) {
  //             res.status(500).send(err);
  //             console.log("2");
  //           } else {
  //             console.info("result is :", result);
  //             usersRepo.findbyusername(
  //               USER_DATA.credentials.email,
  //               (err, user) => {
  //                 if (err) {
  //                   res.status(500).send(err);
  //                   console.log("3");
  //                 } else {
  //                   usersRepo.genToken(user.username, (err, token) => {
  //                     if (err) {
  //                       res.status(500).send(err);
  //                       console.log("4");
  //                     } else {
  //                       user.token = token;
  //                       delete user.password;

  //                       console.log(user);
  //                       res.send(user);
  //                     }
  //                   });
  //                 }
  //               }
  //             );
  //           }
  //         }
  //       );
  //     })
  //     .catch((ree) => {
  //       res.status(500).send(ree);
  //       console.log("5");
  //     });
  // } else {
  //   //----error registerion
  // }
};
module.exports = controller;

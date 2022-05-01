const baseRepo = require('./base.repo')
const jwt = require('jsonwebtoken')
const mongodb = require('mongodb')
const objectId = require('mongodb').ObjectID;
const repo = {
    creat: (credentials, next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                db.collection('users').insertOne(credentials, next)
            }
        })
    },
    //find by username
    findbyusername: (username, next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                console.log(username)
                db.collection('users').findOne({username}, next)
            }
        })
    },

    //fine by number phone
    findeByNumberPhonenumber: (phone,next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                db.collection('users').findOne({phone}, next)
            }
        })
    },
    findeByNumberEmailAddress: (email,next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                db.collection('users').findOne({email}, next)
            }
        })
    },
    
    findeByUserType: (type,next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                db.collection('users').findOne({type}, next)
            }
        })
    },
    //gen Token
    genToken: function (email, next) {
        // this.findeByNumberPhonenumber(phone, (err, user) => {
        this.findeByNumberEmailAddress(email, (err, user) => {
            if (err) next(err)
            else if (!user) next(new Error('user not found'))
            else {
                const token = jwt.sign({_id: user._id, username: user.name}, "qweRtyin45820@3$%^&*-");
                console.log('token',token);
                user.tokens = user.tokens || [];
                user.tokens.push(token);
                // console.log("user token : "+user.token)
                this.update(user, (err, result) => {
                    if (err) next(err)
                    else next(null, token);
                })
            }

        })
    },
    genTokenRestPass: function (user, next) {
        const token = jwt.sign({username: user.username}, '133564582');
        user.restpasstoken = token;
        this.update(user, (err, result) => {
            if (err) next(err)
            else next(null, token);
        })
    }
    ,
    //Update User
    update: (user, next) => {
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                const obId = new Object(user._id)
                delete user._id
                db.collection('users').updateOne({_id: obId}, {$set: user}, next)
            }
        })
    },
    fetchAll: (next) => {
        //connect to db
        baseRepo.connect((err, db) => {
            if (err) next(err)
            else {
                //find all          send to controller
                db.collection('users').find({}).toArray(next)
            }
        })


    },
    setNewTodo: (userId, next) => {
        baseRepo.connect((e, db) => {
            if (e) next(e)
            else {
                const objectId = new mongodb.ObjectID(userId);
                db.collection('users').updateOne({_id: objectId}, {$set: {newPost: 'new'}}, next)
            }
        })
    },
    unSetNewPost: (username, next) => {
        //   console.log(user)
        baseRepo.connect((e, db) => {
            if (e) next(e)
            else {


                db.collection('users').updateOne({username}, {$set: {newPost: 'old'}}, next)
            }
        })
    }
}

module.exports = repo;
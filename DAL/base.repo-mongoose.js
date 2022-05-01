const mongoose = require('mongoose');

const dbURL = 'mongodb://localhost:27017/skillas';

const connect= (err,next) => {
    mongoose.connect(dbURL,{useNewUrlParser: true, useUnifiedTopology: true })
    .then(next)
    .catch(err)
}
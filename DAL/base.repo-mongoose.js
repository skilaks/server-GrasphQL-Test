const mongoose = require('mongoose');

// const dbURL = 'mongodb://localhost:27017/skillas';

const connect= (next) => {
    mongoose.connect(process.env.LOCAL_URI,{useNewUrlParser: true, useUnifiedTopology: true })
    .then((connection) =>next(null, connection))
    .catch(err=>next(err,null))
}

module.exports = connect;
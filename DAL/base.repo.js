const mongodb = require('mongodb');
let theDb = undefined;
//const  Cs = 'mongodb+srv://todoAppKohjani:09366690202@cluster0-crk4d.mongodb.net/test?retryWrites=true&w=majority';
const Cs='mongodb://localhost:27017/skillas'
const skillas_db = 'mongodb://root:pa9ult7Qawxz8GxNmriqIRNN@linda.iran.liara.ir:32588/my-app?authSource=admin&replicaSet=rs0'
const connect = (next) => {

    if (theDb) {
        next(null, theDb);
        return;
    }
//connect to mongoDB
    mongodb.connect(Cs, (err, client) => {
        if (err) next(err);
        else {
            theDb = client.db();
            next(null, theDb);
        }
    })
}
module.exports.connect = connect;
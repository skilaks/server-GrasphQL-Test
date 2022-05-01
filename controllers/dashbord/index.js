const _ = require('lodash');
const userRepo = require('../../DAL/user.repo');
const controller = {
    getUser:(req,res)=>{
        const credentials = _.pick(req.body,"email");
        userRepo.findbyusername(credentials.username,(err,user)=>{
            if(err){res.status(500).send(err)}
            else if(!user) {
                 res.status(500).send('user Not Found')
            }else{
                console.log(user);
                res.send(user)
            }
        })
    },
    getUserByType:(req,res) => {
        const credentials = _.pick(req.body,"type");
        userRepo.findeByUserType(credentials.type,(err,users) => {
            if (err){res.status(500).end(err)}
            else {
                res.send(users)
            }
        })
    }
}

module.exports = controller;
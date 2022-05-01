const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    confirmation: {
        type: 'boolean',
        default: false,
    },
    firstName: {
        type: 'string',
        lowercase:true,
        required: true

    },
    lastName: {
        type: 'string',
        lowercase:true,
        required: true

    },
    nationalCode: {
        type: "string",
        unique: true,
        validate: function (v) { return /\d{10}/.test(v); }

    },
    email: {
        type: "string",
        uniqe: true
    },
    phoneNumber: {
        type: "string",
        unique: true,
        validate: function (v) { return /\d{11}/.test(v); }

    },
    password: {
        type: "string",
        unique: true
    },
    accountType: {
        type: "string",
        required: true,
        enum:{
            values:["teacher","student","admin"],message:'{VALUE} is not supported!'
        },
        dergee: {
            type: "string",
            required:function (){
                return this.accountType=="teacher"
            },
            enum:{values:["دیپلم","کاردانی","کارشناسی","کارشناسی ارشد","دکتری"],message:'{VALUE} is not supported!'}
        }
    },
    grade:{
        type:"string",
        required:function(){return this.accountType=="student"},
        enum:{values:["دبستان","دبیرستان","فنی حرفه ای","دانشگاه"],message:'{VALUE} is not supported!'}
    },
    fieldStudy:{
        type: 'string',
        required:function(){return this.accountType=="teacher"}
    },
    brithDay:{
        type: 'string'
    },
        address:{
            type: 'string',
            default:'-'
        },
        tokens:{
            type: 'string',
        },
        workExperience:{
            type:'boolean',
            required:function(){return this.accountType=="teacher"}
        }

})
// userModel.virtual('fullName').get(function () { return this.name.first + " " + this.name.last })
module.exports = mongoose.model('users', userSchema);
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  age: {
    type: number,
    required: true,
  },
  phone: {
    type: number,
    required: true,
  },
  courses: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  workExperience: {
    type: Boolean,
    required: true,
  },
  typeOfTeaching: {
    type: Object,
    required: true,
  },
  descriptionOfRegistration:{
    type:String,
    required:true,
},

});

const User = mongoose.model('User',userSchema);
module.exports = User;

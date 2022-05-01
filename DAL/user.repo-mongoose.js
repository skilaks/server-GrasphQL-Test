const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("./models/user");
const repo = {
  creat: (credential, next) => {
    const user = new User({
      name: credential.name,
      lastName: credential.lastName,
      password: credential.password,
      type: credential.type,
      age: credential.age,
      phone: credential.phone,
      courses: credential.course,
      education: credential.education,
      workExperience: credential.workExperience,
      typeOfTeaching: credential.typeOfTeaching,
      descriptionOfRegistration: credential.descriptionOfRegistration,
    });
    user.save()
    .then(res=>next(null, res))
    .catch(err=>next(err));
  },
  findByphone:(credential,next)=>{
      
  }
};

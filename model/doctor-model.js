const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const doctor = new Schema({
  email: {
    type: String,
    required: true,
    unique: [true, 'Email is alreday taken'],

    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email address");
      }
    },
  },
  userName:{type:String, required:[true, 'User Name is required']},
  password: {
    type: String,
    required: true,
  },
  tokens:[
    {token:{type:String}}
  ]
});

doctor.statics.loginWithEmailAndPassword = async (data) => {
  const doctor = await Applicant.findOne({ email: data.email });
  if (!doctor) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, doctor.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return doctor;

}

doctor.methods.toJSON = function(){
  const doctor = this
  const doctorObject = doctor.toObject()

  delete doctorObject.tokens
  delete doctorObject.password

  return doctorObject
}

doctor.methods.generateToken = async function(){
  const doctor = this

  const token = jwt.sign({id:doctor._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  doctor.tokens = doctor.tokens.concat({token})
  await doctor.save()
  return token
}

const Applicant = mongoose.model("doctor", doctor);

module.exports = Applicant;

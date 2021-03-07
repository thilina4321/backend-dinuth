const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');


const applicant = new Schema({
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
  password: {
    type: String,
    required: true,
  },
  userName:{type:String, required:[true, 'User Name is required']},
  tokens:[
    {token:{type:String}}
  ]
});

applicant.statics.loginWithEmailAndPassword = async (data) => {
  const applicant = await Applicant.findOne({ email: data.email });
  if (!applicant) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, applicant.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return applicant;

}

applicant.methods.toJSON = function(){
  const applicant = this
  const applicantObject = applicant.toObject()

  delete applicantObject.tokens
  delete applicantObject.password

  return applicantObject
}

applicant.methods.generateToken = async function(){
  const applicant = this

  const token = jwt.sign({id:applicant._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  applicant.tokens = applicant.tokens.concat({token})
  await applicant.save()
  return token
}

const Applicant = mongoose.model("applicant", applicant);

module.exports = Applicant;

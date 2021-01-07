const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const instructor = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
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
  tokens:[
    {token:{type:String}}
  ]
});

instructor.statics.loginWithEmailAndPassword = async (data) => {
  const instructor = await Instructor.findOne({ email: data.email });
  if (!instructor) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, instructor.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return instructor;

}

instructor.methods.toJSON = function(){
  const instructor = this
  const instructorObject = instructor.toObject()

  delete instructorObject.tokens
  delete instructorObject.password

  return instructorObject
}

instructor.methods.generateToken = async function(){
  const instructor = this

  const token = jwt.sign({id:instructor._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  instructor.tokens = instructor.tokens.concat({token})
  await instructor.save()
  return token
}

const Instructor = mongoose.model("instructor", instructor);

module.exports = Instructor;

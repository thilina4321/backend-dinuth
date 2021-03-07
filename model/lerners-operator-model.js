const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const lernersOperator = new Schema({
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

lernersOperator.statics.loginWithEmailAndPassword = async (data) => {
  const lernersOperator = await LernesOperator.findOne({ email: data.email });
  if (!lernersOperator) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, lernersOperator.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return lernersOperator;

}

lernersOperator.methods.toJSON = function(){
  const lernersOperator = this
  const lernersOperatorObject = lernersOperator.toObject()

  delete lernersOperatorObject.tokens
  delete lernersOperatorObject.password

  return lernersOperatorObject
}

lernersOperator.methods.generateToken = async function(){
  const lernersOperator = this

  const token = jwt.sign({id:lernersOperator._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  lernersOperator.tokens = lernersOperator.tokens.concat({token})
  await lernersOperator.save()
  return token
}

const LernesOperator = mongoose.model("lernersOperator", lernersOperator);

module.exports = LernesOperator;

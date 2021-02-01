const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const labOperator = new Schema({
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

labOperator.statics.loginWithEmailAndPassword = async (data) => {
  const labOperator = await Applicant.findOne({ email: data.email });
  if (!labOperator) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, labOperator.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return labOperator;

}

labOperator.methods.toJSON = function(){
  const labOperator = this
  const labOperatorObject = labOperator.toObject()

  delete labOperatorObject.tokens
  delete labOperatorObject.password

  return labOperatorObject
}

labOperator.methods.generateToken = async function(){
  const labOperator = this

  const token = jwt.sign({id:labOperator._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  labOperator.tokens = labOperator.tokens.concat({token})
  await labOperator.save()
  return token
}

const Applicant = mongoose.model("labOperator", labOperator);

module.exports = Applicant;

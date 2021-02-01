const validator = require("validator");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const dmtOperator = new Schema({
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

dmtOperator.statics.loginWithEmailAndPassword = async (data) => {
  const dmtOperator = await Applicant.findOne({ email: data.email });
  if (!dmtOperator) {
    throw new Error("Loging failed");
  }

    const compare = await bcrypt.compare(data.password, dmtOperator.password);
    if (!compare) {
      throw new Error("Invalid password");
    }

    return dmtOperator;

}

dmtOperator.methods.toJSON = function(){
  const dmtOperator = this
  const dmtOperatorObject = dmtOperator.toObject()

  delete dmtOperatorObject.tokens
  delete dmtOperatorObject.password

  return dmtOperatorObject
}

dmtOperator.methods.generateToken = async function(){
  const dmtOperator = this

  const token = jwt.sign({id:dmtOperator._id}, 'dinuthAndTeam' , {expiresIn:'1h'})
  dmtOperator.tokens = dmtOperator.tokens.concat({token})
  await dmtOperator.save()
  return token
}

const Applicant = mongoose.model("dmtOperator", dmtOperator);

module.exports = Applicant;

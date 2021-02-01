const bcrypt = require("bcryptjs");
const LernesOperator = require('../model/lerners-operator-model');


exports.login = async (req, res) => {
  const data = req.body;
  try {
    const applicant = await LernesOperator.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    console.log('log 1');
    const token = await applicant.generateToken()
    console.log('log 2');
    res.status(200).send({lernerOperator: applicant, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};

const bcrypt = require("bcryptjs");
const LabOperator = require('../model/lab-operator-model');



exports.login = async (req, res) => {
  const data = req.body;
  try {
    const applicant = await LabOperator.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    const token = await applicant.generateToken()
    res.status(200).send({labOperator: applicant, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};

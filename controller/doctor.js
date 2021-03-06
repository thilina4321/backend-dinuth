const bcrypt = require("bcryptjs");
const Doctor = require('../model/doctor-model');



exports.login = async (req, res) => {
  const data = req.body;
  try {
    const applicant = await Doctor.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    const token = await applicant.generateToken()
    res.status(200).send({doctor: applicant, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};

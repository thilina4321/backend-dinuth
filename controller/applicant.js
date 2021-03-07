const bcrypt = require("bcryptjs");
const Applicant = require('../model/applicant');

exports.signup = async (req, res) => {
  const data = req.body;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const applicant = await Applicant.create({ email: data.email, password: hash });
    const savedApplicant = await applicant.save();

    return res.status(201).send(savedApplicant);
} catch (error) {
      return res.status(403).send({error:error.message});
    
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  try {
    const applicant = await Applicant.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    const token = await applicant.generateToken()
    res.status(200).send({applicant: applicant, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};

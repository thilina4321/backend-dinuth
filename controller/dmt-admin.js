const bcrypt = require("bcryptjs");
const DmtAdmin = require('../model/dmt-operator-model');
const LernesOperator = require('../model/lerners-operator-model')
const LabOperator = require('../model/lab-operator-model')
const Doctor = require('../model/doctor-model')

exports.signup = async (req, res) => {
  const data = req.body;
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const applicant = await DmtAdmin.create({ email: data.email, password: hash });
    const savedApplicant = await applicant.save();

    return res.status(201).send(savedApplicant);
} catch (error) {
      return res.status(403).send('Email already taken');
     
  }
};

exports.login = async (req, res) => {
  const data = req.body;
  try {
    const dmtAdmin = await DmtAdmin.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });
    const token = await dmtAdmin.generateToken()
    res.status(200).send({dmtAdmin: dmtAdmin, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};


exports.createDoctor = async (req, res) => {
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 8);
      const doctor = await Doctor.create({ email: data.email, password: hash });
      const savedApplicant = await doctor.save();
  
      return res.status(201).send(savedApplicant);
  } catch (error) {
        return res.status(403).send('Email already taken');
      
    }
  };
  

  exports.createLabOperator = async (req, res) => {
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 8);
      const applicant = await LabOperator.create({ email: data.email, password: hash });
      const savedApplicant = await applicant.save();
  
      return res.status(201).send(savedApplicant);
  } catch (error) {
        return res.status(403).send('Email already taken');
      
    }
  };
  

  exports.createLernersOperator = async (req, res) => {
    const data = req.body;
    try {
      const hash = await bcrypt.hash(data.password, 8);
      const applicant = await LernesOperator.create({ email: data.email, password: hash });
      const savedApplicant = await applicant.save();
  
      return res.status(201).send(savedApplicant);
  } catch (error) {
        return res.status(403).send('Email already taken');
      
    }
  };
  
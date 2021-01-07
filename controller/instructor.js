const bcrypt = require("bcryptjs");
const Instructor = require('../model/instructor');

exports.signup = async (req, res) => {
  const data = req.body;
  console.log(data);
  try {
    const hash = await bcrypt.hash(data.password, 8);
    const instructor = await Instructor.create({ email: data.email, password: hash });
    const savedInstructor = await instructor.save();

    return res.status(201).send(savedInstructor);
  } catch (error) {
    return res.status(403).send('Email already taken');

  }
};

exports.login = async (req, res) => {
  const data = req.body;
  
  try {
    const instructor = await Instructor.loginWithEmailAndPassword({
      email: data.email,
      password: data.password,
    });

    const token = await instructor.generateToken()
    res.status(200).send({instructor: instructor, token})

  } catch (err) {
      console.log(err.message);
    return res.status(403).send({error:err.message})
  }
};

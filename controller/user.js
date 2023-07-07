const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require("../models/user.js")




const register = async(req,res) =>{
  console.log('register')
    try{
        const salt = await bcrypt.genSalt(10) 
        const hashedPass = await bcrypt.hash(req.body.password,salt)

        const newUser = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            phone: req.body.phone,
            email: req.body.email,
            password: hashedPass,
        })
        const result = await newUser.save()
        const {password, ...data}= await result.toJSON()
        res.send(data)
        

    }
    catch(error){
        res.send(error)
    }
}
const login = async (req, res) => {
  try {
    const user = await User.findOne({
      phone: req.body.phone,
    });

    if (!user) {
      return res.status(404).send({
        message: 'User not found',
      });
    }

    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).send({
        message: 'Invalid password',
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      'secret',
    );
    res.cookie('jwt',token,{
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 1 day
  })
    delete user.password

    res.status(200).send({
      message: 'Login successful',
      user: user,
    });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred',
      error: error.message,
    });
  }
};

const user = async (req, res) => {
  try {
    const user = await User.find();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred', error: error.message });
  }
  };

module.exports = {
   register,
   login,
   user
}
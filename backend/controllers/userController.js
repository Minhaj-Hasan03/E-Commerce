
import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

//creating a token of user login remember ;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//Here add logic , allow user login on website or create account

//Route for user Login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (!user) {
      res.json({ success: false, message: "user doesnt exist" });
    }

    const hash = await bcrypt.compare(password, user.password);
    if (hash) {
      const token = createToken(user._id);
      res.json({ success: true, token });
    }else{
      res.json({success:false, message:"invalid credentials"})
    }


  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for user Register

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body; //Taking the name ,email , password form body

    const existEmail = await userModel.findOne({ email });
    const existName = await userModel.findOne({ name });

    if (existName) {
      return res.json({ success: false, message: "username already exist" });
    }
    console.log(existName);

    if (existEmail) {
      return res.json({ success: false, message: "User already exist" });
    }

    if (!validator.isEmail(email)) {
      // chenking email validator by validator libary
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password length minimum 8 ",
      });
    }

    //Hasing user password by bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const token = createToken(user._id);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Route for Admin Login
const adminLogin = async (req, res) => {
  try {
    
    const {email, password } = req.body ;

    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
       const token = jwt.sign(email+password, process.env.JWT_SECRET)
       res.json({success:true, token})
    }else{
      res.json({success:false, message:"Invalid credential"})
    }

  } catch (error) {
    res.json({success:false, message:error.message})
  }
};

export { loginUser, registerUser, adminLogin };

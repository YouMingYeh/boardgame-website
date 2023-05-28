import bcrypt from "bcrypt";
//encrypt pwd
import jwt from "jsonwebtoken";
//auth
import User from "../models/User.js";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      department,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const isDupeEmail = await User.findOne({ email: email });
    if (isDupeEmail) {
      return res.status(400).json({ msg: "duplicate email" });
    }
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      department,
      Facebook: "to be filled...",
      Instagram: "to be filled...",
      selfIntro: "to be filled...",
      participation: {},
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const email = req.body.email;
    const user = await User.findOne({ email: email });
    // console.log(user);
    if (!user) {
      // console.log("!user");
      const newUser = new User({
        firstName: req.body.given_name,
        lastName: req.body.family_name,
        email: req.body.email,
        password: "to be filled...",
        picturePath: req.body.picture,
        friends: [],
        department: "...",
        Facebook: "to be filled...",
        Instagram: "to be filled...",
        selfIntro: "to be filled...",
        participation: {},
      });
      const savedUser = await newUser.save();
      console.log(savedUser);
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, savedUser });
    } else {
      
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.status(200).json({ token, user });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

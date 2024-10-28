import pkg from "bcryptjs";
import User from "../model/userModel.js";
import jwt from "jsonwebtoken";
import produceMsg from "../kafka/producer.js";
const { genSalt, hash } = pkg;

export const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist)
      return res
        .status(500)
        .send({ message: "User is Already Registered :::", userExist: true });
    const salt = await genSalt(10);
    const hashedPwd = await hash(password, salt);
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPwd,
    });
    await newUser.save();
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    const message = JSON.stringify({
      id: newUser._id.toString(),
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      password: newUser.password,
    });
    await produceMsg("user-registered", message);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000,
      })
      .send({
        message: "User Registered Successfully :",
        token,
        registered: true,
        userDet: message,
      });
  } catch (error) {
    console.log("err in Signup Process :", error);
    res.status(500).json({ error: "Error is happening while SignUp" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(500).send({
        message: "User is Not Exists ! Try Register.",
        notExist: true,
      });
    }
    const passwordMatch = pkg.compare(password, user.password);
    if (!passwordMatch) {
      res
        .status(500)
        .send({ message: "Password Mismatch !!", passwordMismatch: true });
    }
    const token = jwt.sign({ id: user._id, email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .cookie("token", token, { httpOnly: true, maxAge: 60 * 60 * 24 * 1000 })
      .send({
        message: "User Logged In :)",
        token: token,
        logged: true,
        userDet: user,
      });
  } catch (error) {
    console.log("Error While Login :-: ", error);
    res.status(500).send("Error Interrup while login :", error);
  }
};

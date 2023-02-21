const express = require("express");

const userSchema = require("../model/usermodel");

const token = require("../utils/jsonToken");

const { hashPassword, comparePassword } = require("../utils/passcheck");
// const jwt = require("jsonwebtoken")

const signupUser = async (req, res) => {
  try {
    const { username, email, password, cpassword } = req.body;

    console.log(username, email, password, cpassword)
    let exist = await userSchema.findOne({ email: email });
    if (exist) {
      return res.status(400).json("user alredy exist");
    }
    // console.log("p :" + password);
    // console.log("cp :" + cpassword);
    if (password != cpassword) {
      return res.status(400).json("password doesn't match");
    }
    hashed = await hashPassword(password, cpassword);
    let signupUser = new userSchema({
      username,
      email,
      password: hashed,
      cpassword: hashed,
    });
    await signupUser.save();
    res.status(200).json(signupUser);
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    let existUser = await userSchema.findOne({ email: email });
    if (!existUser) {
      res.status(400).json("user not exist");
    }
    const isMatch = await comparePassword(password, existUser.password);

    if (!isMatch) {
      res.status(403).json("password does not match");
    }
    let payload = {
      user: {
        id: existUser.id,
      },
    };
    const logUser = await userSchema.findOne({ email });
    let jwttoken = token(logUser._id);

    res.status(200).json({ message: "user loged in with token", jwttoken });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

const protected = async (req, res) => {
  try {
    let exist = await userSchema.findById(req.user.id);
    if (!exist) {
      res.status(400).json("user not found");
    }
    res.json(exist);
  } catch (err) {
    res.status(500).json("internal server error");
  }
};

module.exports = { signupUser, loginUser, protected };

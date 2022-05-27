const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secret = process.env.FIRST_SECRET_KEY;

module.exports = {
  create: (req, res) => {
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => res.json(err));
  },
  findAll: (req, res) => {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.json({ error: err }));
  },
  findOne: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((user) => res.json(user))
      .catch((err) => res.json(err));
  },
  update: (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch((err) => res.json(err));
  },
  delete: (req, res) => {
    User.findOneAndDelete({ _id: req.params.id })
      .then((deleteConfirmation) => res.json(deleteConfirmation))
      .catch((err) => res.json(err));
  },
  register: (req, res) => {
    User.create(req.body)
      .then((user) => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.FIRST_SECRET_KEY
        );

        res
          .cookie("usertoken", userToken, secret, {
            httpOnly: true,
          })
          .json({ msg: "success!", user: user });
      })
      .catch((err) => res.json(err));
  },
  login: async (req, res) => {
    const user = await User.findOne({ "user.email": req.body.email });
    //const user = await User.findOne({ user: { email: req.body.email } });
    console.log(user);
    console.log(req.body);
    if (user === null) {
      // email not found in users collection
      return res.sendStatus(400);
    }

    // if we made it this far, we found a user with this email address
    // let's compare the supplied password to the hashed password in the database
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.user.password
    );

    if (!correctPassword) {
      console.log("hi");
      // password wasn't a match!
      return res.sendStatus(400);
    }
    //res.json({ msg: "success", id: user._id });
    //if we made it this far, the password was correct
    const userToken = jwt.sign(
      {
        id: user.user._id,
      },
      process.env.FIRST_SECRET_KEY
    );

    //note that the response object allows chained calls to cookie and json
    res
      .cookie("userToken", userToken, secret, {
        httpOnly: true,
      })
      .json({ msg: "success!", id: user._id });
  },
};

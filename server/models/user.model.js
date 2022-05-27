const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    user: {
      firstName: {
        type: String,
        required: [true, "First Name is required"],
        minlength: [2, "First Name must be at least 2 characters"],
      },
      lastName: {
        type: String,
        required: [true, "Last Name is required"],
        minlength: [2, "Last Name must be at least 2 characters"],
      },
      userName: {
        type: String,
        required: [true, "User Name is required"],
      },
      email: {
        type: String,
        validate: {
          validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
          message: "Please enter a valid email",
        },
      },
      password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters"],
      },
      bio: {
        type: String,
      },
      location: {
        type: String,
      },
    },
    post: [],
    likes: [],
    retweets: [],
    messages: [],
    tweets: [],
    followers: [],
    following: [],
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.user.password, 10).then((hash) => {
    this.user.password = hash;
    next();
  });
});

//CONFIRM PASSWORD
// add this after UserSchema is defined
UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

const User = mongoose.model("User", UserSchema);

module.exports = User;

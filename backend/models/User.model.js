import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  name: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId;
    },
  },

  phone: {
    type: String,
    unique: false,
    required: function () {
      return !this.googleId;
    },
    match: [/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"],
  },

  googleId: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.model.js";
import { blackListedToken } from "../middleware/auth.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
// ==================== REGISTER ====================
export const registerUser = async (req, res) => {
  try {
    const { name, password, email, phone, isAdmin } = req.body;

    if (!name || !password || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all fields" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      name,
      password: hash,
      phone,
      isAdmin,
      verified: false,
    });
    await newUser.save();

    const { password: _, ...userWithoutPass } = newUser._doc;

    res.status(201).json({
      success: true,
      message: "Registration successful!",
      data: userWithoutPass,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages[0] });
    }
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ message: `${field} already exists` });
    }
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ==================== LOGIN ====================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password: _, ...userWithoutPass } = user._doc;

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: userWithoutPass,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
};

// ==================== LOGOUT ====================
export const logoutUser = (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(400).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];
  blackListedToken(token);

  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ==================== GET USER ====================
export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, data: user, message: "User profile" });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      success: false,
    });
  }
};
export const googleAuth = async (req, res) => {
  try {
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name, sub } = payload;
    let user = await User.findOne({ email });
    if (!user) {
      user = newUser({ name, email, googleId: sub });
      await user.save();
    }
    const authtoken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    res.json({
      token: authtoken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "Google login successful",
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

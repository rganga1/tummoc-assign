import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import colors from "colors";

const signUpController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(`${email},${password}`.yellow.inverse);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      email,
      name,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    // Generate JWT token
    const token = generateToken(newUser);
    // Set the token as an HTTP-only cookie
    res.cookie("jwt", token, { httpOnly: true });
    // Return a response
    res.send("Logged in successfully!");
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
const signInController = async (req, res) => {
  console.log(`${req.body.email}`.blue.inverse);
  const token = generateToken({ email: req.body.email });
  // Set the token as an HTTP-only cookie
  res.cookie("jwt", token, { httpOnly: true });
  // Return a response
  res.send("Logged in successfully!");
};

const googleAuthController = async (req, res) => {
  try {
    const { email, name, password } = req.body;
    console.log(`${email},${password}`.yellow.inverse);
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.cookie("jwt", token, { httpOnly: true });
      return res.send("Logged in successfully!");
    }

    // Create a new user
    const newUser = new User({
      email: profile.email,
      name: profile.name,
    });

    // Save the user to the database
    await newUser.save();
    // Generate JWT token
    const token = generateToken(newUser);
    // Set the token as an HTTP-only cookie
    res.cookie("jwt", token, { httpOnly: true });
    // Return a response
    res.send("Logged in successfully!");
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

// Generate JWT token
function generateToken(user) {
  const payload = {
    email: user.email,
  };
  // console.log("here in token".red.inverse);
  const secretKey = process.env.SECRET_KEY; // Replace with your secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  // console.log("still in token".green.inverse);
  return token;
}

export { signUpController, signInController, googleAuthController };

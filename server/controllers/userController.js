const signUpController = async (req, res) => {
  try {
    const { email, password } = req.body;

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
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();
    // Generate JWT token
    const token = generateToken(user);
    // Respond with the token
    res.status(200).json({ token });
  } catch (err) {
    console.error("Error signing up:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};


// Generate JWT token
function generateToken(user) {
  const payload = {
    userId: user._id,
    email: user.email
  };
  const secretKey = process.env.SECRET_KEY; // Replace with your secret key
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}


export { signUpController };

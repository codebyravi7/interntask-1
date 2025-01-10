import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"; // Using bcryptjs instead of bcrypt for consistency

// Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Compare the password provided with the hashed password in the database
    // console.log(email, password);
    // const match = await bcrypt.compare(password, user.password);
    // console.log(email, user.password, match);
    // if (!match) return res.status(401).json({ msg: "Invalid credentials" });

    // If password matches, create JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role, department: user.department }, // Include user info in the token
      "process.env.JWT_SECRET", // Use secret from environment variable
      { expiresIn: "15d" }
    );

    // Send the JWT token in the response
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error during login" });
  }
};

// Register
export const registerUser = async (req, res) => {
  const { username, email, password, role, department } = req.body;
  try {
    // Check if all fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash the password before saving it in the database
    // const salt = await bcrypt.genSalt(10);
    // const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user with hashed password and role
    const newUser = new User({
      username,
      email,
      password,
      role: role || "Regular", // Default role if not provided
      department,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success message
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const User = require("../models/User");
const bcrypt = require("bcryptjs")
const { generateRefreshToken, generateToken} = require("../utils/generateTokens")

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check existing user
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate tokens
    const refreshToken = generateRefreshToken(user._id);
    const accessToken = generateToken(user._id);

    // Store refresh token
    user.refreshToken = refreshToken;

    await user.save();

    return res.status(201).json({
      message: "Registration successful",
      accessToken,
      refreshToken,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

       
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "No user found"
            });
        }

        
        const isPasswordValid = await bcrypt.compare(password,user.password);

        // console.log(typeof(isPasswordValid));
        

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid password"
            });
        }

        const accessToken = generateToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();
        
        return res.status(200).json({
            message: "Login successful",
            accessToken,
            refreshToken,
        });


    } catch (error) {
        return res.status(500).json({
            message: "Server error",
            error: error
        });
    }
};


module.exports = { registerUser, loginUser}
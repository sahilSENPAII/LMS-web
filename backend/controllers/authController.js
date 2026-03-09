const bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    res.json({
        message: "User created",
        email,
        hashedPassword
    });
};
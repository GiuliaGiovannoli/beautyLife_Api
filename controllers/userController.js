const User = require('../models/User')

const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')
const gravatar = require("gravatar");

const { validationResult } = require("express-validator");


/* @usage : Register a User
    @url : /api/users/register
    @fields : firstName,lastName , email , password
    @method : POST
    @access : PUBLIC */

const registerUser = async (request, response) => {
    let errors = validationResult(request);

    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    try {
        let { firstName, lastName, email, password } = request.body;
        // check if the user is exists
        let user = await User.findOne({ email: email });
        if (user) {
            return response
                .status(401)
                .json({ errors: [{ msg: "User already exists ! " }] });
        }

        // encode the password
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);

        // gravtar image
        let avatar = gravatar.url(email, {
            s: "300",
            r: "pg",
            d: "mm",
        });

        // address
        let address = {
            flat: " ",
            landmark: " ",
            street: " ",
            city: " ",
            state: " ",
            country: " ",
            pin: " ",
            mobile: " ",
        };

        // save user to db
        user = new User({ firstName, lastName, email, password, avatar, address });
        user = await user.save();
        response.status(200).json({ msg: "Registration is Successful" });
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
}

/* @usage : Login a User
    @url : /api/users/login
    @fields : email , password
    @method : POST
    @access : PUBLIC */

const loginUser = async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    try {
        let { email, password } = request.body;
        let user = await User.findOne({ email: email });
        if (!user) {
            return response
                .status(401)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        // check password
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response
                .status(401)
                .json({ errors: [{ msg: "Invalid Credentials" }] });
        }
        // create a token
        let payload = {
            user: {
                id: user.id,
                name: user.name,
            },
        };
        jwt.sign(
            payload,
            process.env.JWT_SECRET_KEY,
            { expiresIn: 360000000 },
            (err, token) => {
                if (err) throw err;
                response.status(200).json({
                    msg: "Login is Successful",
                    token: token,
					user : user
                });
            }
        );
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
}

const getUserInfo = async (request, response) => {
    try {
        let user = await User.findById(request.user.id);
        response.status(200).json({ user: user });
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
}


const updateAdress = async (request, response) => {
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(401).json({ errors: errors.array() });
    }
    try {
        const {
            flat,
            street,
            landmark,
            city,
            state,
            country,
            pin,
            mobile,
        } = request.body;
        let address = {
            flat: flat,
            street: street,
            landmark: landmark,
            city: city,
            state: state,
            country: country,
            pin: pin,
            mobile: mobile,
        };

        let user = await User.findById(request.user.id);
        user.address = address;
        user = await user.save();
        response.status(200).json({
            msg: "Address is Updated",
            user: user,
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ errors: [{ msg: error.message }] });
    }
}
module.exports = {
    registerUser: registerUser,
    loginUser: loginUser,
    getUserInfo: getUserInfo,
    updateAdress: updateAdress
}
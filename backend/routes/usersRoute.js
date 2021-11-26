const express = require('express');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const usersRoute = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const expressAsyncHandler = require('express-async-handler');


usersRoute.post('/register', asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email: email });
    if (userExists) {
        throw new Error('User already exists');
    }
    const userCreated = await User.create({ name, email, password });
    res.json({
        _id: userCreated._id,
        name: userCreated.name,
        email: userCreated.email,
        password: userCreated.password,
        token: generateToken(userCreated._id)
    });
})

);

usersRoute.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (user && (await user.isPasswordMatch(password))) {
        res.status(201);
        res.status(200);
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id)
        });
    }
    else {
        res.status(401);
        throw new Error('Invalid Credentials');
    }

}));

usersRoute.put('/update', (req, res) => {
    res.send('Update Route')
});
usersRoute.delete('/:id', (req, res) => {
    res.send('Delete Route')
});
usersRoute.get(
    '/',
    authMiddleware,
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({});

        if (users) {
            res.status(200).json(users);
        } else {
            res.status(500);

            throw new Error('No users found at the moment');
        }
    })
);
module.exports = usersRoute;
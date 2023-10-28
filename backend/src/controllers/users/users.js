import User from '../../models/users/users.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();

const signUp = async (req, res) => {
    try {
        const { name, password, userType } = req.body;
        const user = await User.findOne({
            $and: [{ name }],
        });
        if (user) {
            return res.status(409).json({ message: 'User already exist' });
        }
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, password: hashedPassword, userType });
            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user._id, userType: user.userType }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        const id = user._id
        const type = user.userType

        const userData = { id, type }

        res.status(200).json({ message: "User Login Successfully", token, userData });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const userList = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

export default {
    signUp,
    login,
    userList
}
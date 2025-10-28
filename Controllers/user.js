import { User } from '../Models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const userReg = async (req, res) => {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.json({ message: "user alredy exist", success: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await User.create({ name, email, password: hashedPassword });
    res.json({ message: "User Registered Successfully..!", user, success: true });
}


export const userLogin = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) return res.json({ message: "User does not exists..!", success: true });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.json({ message: "password is incoreect please enter right password", success: false });

    const token = jwt.sign({ userId: user._id }, process.env.JWT , {
        expiresIn: '365d'
    })

    res.json({ message: `Welcome ${user.name}`, token, success: true, });
}


export const getAllUsers = async (req, res) => {
    let users = await User.find();
    if (users) return res.json(users);
    res.json({ message: "no users exists" });
};

export const userProfile = async(req,res) =>{
    let userId = req.user;
    res.json(userId);
}
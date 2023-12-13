import { Controller } from '~/type';
import { UserModel } from '../models/database'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const login: Controller = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "please fill in the fields!" });
    }
    try {
        const foundUser = await UserModel.findOne({ email });
        if (!foundUser) {
            return res
                .status(400)
                .json({ success: false, message: "email or password is not exact" });
        }

        const verifyPassword = bcrypt.compareSync(password, foundUser.password);
        if (!verifyPassword) {
            return res
                .status(400)
                .json({ success: false, message: "username or password is not exact" });
        }
        const accessToken = await jwt.sign(
            { id: foundUser._id },
            process.env.SECRET_TOKEN || ''
        );
        return res.status(200).json({ success: true, accessToken, message: "Login success!", user: foundUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server error!" });
    }
}

const createUser: Controller = async (req, res) => {
    const { email, password, address, phone } = req.body;
    if (!email || !password) {
        return res.json({ success: false, message: "please fill in the fields!" });
    }
    try {

        const validateEmail = (email: string) => {
            return String(email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        };
        if (!validateEmail(email)) {
            return res.json({ success: false, message: "this is not email" });
        }
        const FoundEmail = await UserModel.findOne({ email });
        if (FoundEmail) {
            return res.json({
                success: false,
                message: "Please choose another email",
            });
        }
        // if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        //     return res.json({
        //         success: false,
        //         message:
        //             "Password should contains at least 8 from the mentioned characters, one upper case, one lower case, one digit",
        //     });
        // }
        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = new UserModel({
            password: hashPassword,
            email,
            address,
            phone
        });
        const userSave = await newUser.save();
        const accessToken = jwt.sign(
            { id: newUser._id },
            process.env.SECRET_TOKEN || ''
        );
        return res.status(200).json({ success: true, accessToken, message: "Register success!", user: userSave });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "server error!" });
    }
}

const getAllUser: Controller = async (req, res) => {
    try {
        const Users = await UserModel.find().sort({ createdAt: -1 })
        res.status(200).json(Users)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the User" })

    }
}

const getProfile: Controller = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId)
            .select("-password")
            .select("-email");
        return res.status(200).json({ success: true, info: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

const getUser: Controller = async (req, res) => {
    try {
        const User = await UserModel.findById(req.params.id)
        res.status(200).json(User)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to get the User" })

    }
}


const searchUser: Controller = async (req, res) => {
    try {
        const result = await UserModel.aggregate(
            [
                {
                    $search: {
                        index: "default",
                        text: {
                            query: req.params.key,
                            path: {
                                wildcard: "*"
                            }
                        }
                    }
                }
            ]
        )
        return res.status(200).json(result)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "failed to search the User" })

    }
}






export {
    createUser,
    getAllUser,
    getUser,
    searchUser,
    login,
    getProfile
}
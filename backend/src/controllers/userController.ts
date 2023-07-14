import { sample_users } from "../data";
import User from "../models/User";
import jwt from 'jsonwebtoken';




// SEED USERS DATA INTO DB
/** @type {import("express").RequestHandler} */
export  async function seedUsers(req:any, res:any) {
    const foodsCount = await User.countDocuments();
    if(foodsCount> 0){
      res.send("Seed is already done!");
      return;
    }

    await User.create(sample_users);
    res.send("Seed Is Done!");
}

// LOGIN
export async function login(req:any, res:any) {
    const {email, password} = req.body;
    const user = await User.findOne({email, password});

    if(user) {
        res.send(generateTokenResponse(user))
    } else {
        res.status(400).send('Username or password is not valid!')
    }
}


const generateTokenResponse = (user:any) =>{
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "MyTokenSecret", {
        expiresIn:"30d"
    });

    user.token = token;
    return user;
}
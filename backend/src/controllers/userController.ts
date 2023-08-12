import { sample_users } from "../data";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import { Order } from "../models/Order";

interface TokenPayload extends JwtPayload {
  id: string;
}

// SEED USERS DATA INTO DB
/** @type {import("express").RequestHandler} */
export async function seedUsers(req: Request, res: Response) {
  const foodsCount = await User.countDocuments();
  if (foodsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await User.create(sample_users);
  res.send("Seed Is Done!");
}


// LOGIN
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("Username or password is invalid!");
  }
}

// REGISTER
export async function register(req: Request, res: Response) {
  const { name, email, password, address, phone, avatar } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    res.status(400).send("User is already exist, please login!");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: IUser = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    phone,
    avatar,
    isAdmin: false,
  };

  const dbUser = await User.create(newUser);
  res.send(generateTokenResponse(dbUser));
}

// TOKEN
const generateTokenResponse = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_KEY!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    avatar: user.avatar,
    phone: user.phone,
    isAdmin: user.isAdmin,
    token: token,
  };
};

// CHECK PASSWORD
async function checkPassword(password: string, user: IUser) {
  return await bcrypt.compare(password, user.password);
}

// EDIT ACCOUNT
export async function editAccount(req: any, res: Response) {
  const user = await User.findById(req.user.id);

  const { password, newPassword, avatar, ...others } = req.body;

  // Change password
  if (user) {
    if (password && newPassword) {
      const correctPassword = await checkPassword(password, user);
      if (correctPassword) {
        user.password = newPassword;
      }
    }
  }

  // cloudinary configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET,
  });

 
 // Change avatar
 if (user && avatar) {
  const upload = await cloudinary.uploader.upload(avatar);
  user.avatar = upload.secure_url;
} else if (user && avatar === '') {
  // If avatar is an empty string, delete the avatar
  user.avatar = '';
}

 
  // Change other items
  if (user) {
    for (const key in others) {
      (user as IUser)[key] = others[key];
    }

    
    await user.save();

    // Send the updated user object with the token back to the client
    const updatedUser = user.toObject();
    updatedUser.token = req.headers.access_token;
    res.status(200).json(updatedUser);
  } else {
    res.status(404).send("User not found.");
  }
}

// LOGOUT
export const logout = async (req:any, res:any) => {
  res.status(204).json();
}

// DELETE ACCOUNT
export const deleteAccount = async (req:any, res:any) => {
  const userId = await User.findById(req.user.id);

  await Order.deleteMany({ user: userId });

  // Delete the user
  await User.deleteOne({ _id: userId });

  res.status(204).json();
}


// GET ALL ORDERS
export async function getAllOrders(req: any, res: any) {
  const userId = req.user.id;  
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userOrders = await user.getAllOrders();
  res.status(200).json(userOrders);
}
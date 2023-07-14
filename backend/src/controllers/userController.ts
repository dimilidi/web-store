import { sample_users } from "../data";
import User, { IUser } from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { log } from "console";

// SEED USERS DATA INTO DB
/** @type {import("express").RequestHandler} */
export async function seedUsers(req: any, res: any) {
  const foodsCount = await User.countDocuments();
  if (foodsCount > 0) {
    res.send("Seed is already done!");
    return;
  }

  await User.create(sample_users);
  res.send("Seed Is Done!");
}

// LOGIN
export async function login(req: any, res: any) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(400).send("Username or password is invalid!");
  }
}

// REGISTER
export async function register(req: any, res: any) {
  const { name, email, password, address } = req.body;
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
    isAdmin: user.isAdmin,
    token: token,
  };
};

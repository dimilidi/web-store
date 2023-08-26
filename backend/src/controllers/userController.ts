import { sample_users } from "../data";
import User, { IUser } from "../models/User";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response } from "express";
import { v2 as cloudinary } from "cloudinary";
import { Order } from "../models/Order";
import Role from "../models/Role";
import { createError } from "../middlewares/error";
import { createSuccess } from "../middlewares/success";
import UserToken from "../models/UserToken";
import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import { log } from "console";

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
export async function login(req: Request, res: Response, next: any) {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).populate("roles", "role").exec();

  if (user && (await checkPassword(password, user))) {
    const { roles } = user;
    console.log(user);

    return next(
      createSuccess(
        200,
        "User logged in successfully.",
        generateTokenResponse(user)
      )
    );
  } else {
    return next(createError(400, "Username or password is invalid!"));
  }
}

// REGISTER
export async function register(req: Request, res: Response, next: any) {
  const role = await Role.find({ role: "User" });
  const { name, email, password, address, phone } = req.body;
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
    roles: role,
  };

  const dbUser = await User.create(newUser);
  // res.send(generateTokenResponse(dbUser));
  return next(
    createSuccess(
      201,
      "User registered successfully.",
      generateTokenResponse(dbUser)
    )
  );
}

// REGISTER ADMIN
export async function registerAdmin(req: Request, res: Response, next: any) {
  const role = await Role.find();
  const { name, email, password, address, phone } = req.body;
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
    isAdmin: true,
    roles: role,
  };

  const dbUser = await User.create(newUser);
  // res.send(generateTokenResponse(dbUser));
  return next(
    createSuccess(
      201,
      "Admin registered successfully.",
      generateTokenResponse(dbUser)
    )
  );
}

// TOKEN
const generateTokenResponse = (user: IUser) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
      roles: user.roles,
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
    roles: user.roles,
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
  } else if (user && avatar === "") {
    // If avatar is an empty string, delete the avatar
    user.avatar = "";
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
export const logout = async (req: any, res: any) => {
  res.status(204).json();
};

// DELETE ACCOUNT
export const deleteAccount = async (req: any, res: any) => {
  const userId = await User.findById(req.user.id);

  await Order.deleteMany({ user: userId });

  // Delete the user
  await User.deleteOne({ _id: userId });

  res.status(204).json();
};

// GET ALL ORDERS
export async function getAllOrders(req: any, res: any) {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const userOrders = await user.getAllOrders();
  res.status(200).json(userOrders);
}

// GET ALL USERS
export async function getAllUsers(req: any, res: any, next: any) {
  const users = await User.find();
  return next(createSuccess(201, "All Users", users));
}

// GET USER BY ID
export async function getUserById(req: any, res: any, next: any) {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(createError(404, "User not found"));
  return next(createSuccess(200, "Single User", user));
}

// SEND EMAIL
export async function sendEmail(req: any, res: any, next: any) {
  const email = req.body.email;
  const user = await User.findOne({
    email: { $regex: "^" + email + "$", $options: "i" },
  });

  if (!user) {
    return next(createError(404, "User not found to reset the email"));
  }

  const payload = { email: user.email };
  const expiryTime = 300;
  const token = jwt.sign(payload, process.env.TOKEN_KEY!, {
    expiresIn: expiryTime,
  });

  const newToken = new UserToken({
    userId: user.id,
    token,
  });

  const mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "lliddim86@gmail.com",
      pass: "epzuzttxokcgwkyq",
    },
  });

  const mailDetails = {
    from: "lliddim86@gmail.com",
    to: email,
    subject: "Reset password",
    html: `
    <html>
    <head>
      <title>Password Reset Request</title>
    </head>
    <body>
      <h1>Password Reset Request</h1>
      <p>Dear ${user.name},</p>
      <p>We have received a request to reset your password for your Web Store account. To complete the password reset process, please click on the button below. </p>
      <a href="${process.env.LIVE_URL}/reset/${token}">
  <button style="background-color: #4caf50; color: white; padding: 14px 20px; border: none; cursor: pointer; border-radius: 4px;">
    Reset Password
  </button>
</a>
      <p>Please note that this email is only valid for 5 minuties. If you did not request a password reset, please disregard this message.</p>
      <p>Thank you,</p>
      <p>Web Store Team</p>
    </body>
    </html>
    `,
  };

  mailTransporter.sendMail(mailDetails, async (err, data) => {
    if (err) {
      console.log(err);
      return next(createError(500, "Something went wrong."));
    } else {
      await newToken.save();
      return next(createSuccess(200, "Email sent successfully."));
    }
  });
}

// RESET PASSWORD
export async function resetPassword(req: any, res: any, next: any) {
  const token = req.body.token;
  const newPassword = req.body.password;

  jwt.verify(token, process.env.TOKEN_KEY!, async (err: any, data: any) => {
    if (err) {
      return next(createError(500, "Reset Link is Expired"));
    } else {
      const response = data;
      const user = await User.findOne({
        email: { $regex: "^" + response.email + "$", $options: "i" },
      });
      const salt =  bcrypt.genSaltSync(10);
      const encryptedPassword = await bcrypt.hash(newPassword, salt);

      try {
        if (user) {
          user.password = encryptedPassword;

          await user.save();
          const updatedUser = user.toObject();
      
          return next(
            createSuccess(200, "Password Reset Success.", updatedUser)
          );
        }
      } catch (error) {
        return next(
          createError(500, "Something went wrong while resetting the password.")
        );
      }
    }
  });
}

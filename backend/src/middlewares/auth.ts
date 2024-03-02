import { verify } from "jsonwebtoken";
import { createError } from "./error";
import User, { TokenPayload } from "../models/User";
import { log } from "console";

export async function verifyToken(req: any, res: any, next: any) {
  const token = req.headers.access_token as string;
  if (!token) return next(createError(401, "You are not authenticated."));

  try {
    const user = verify(token, process.env.TOKEN_KEY!);
    console.log(user);

    req.user = user;
    next();
  } catch (error) {
    return next(createError(403, "Token is not valid."));
  }
}

export async function verifyUser(req: any, res: any, next: any) {
  try {
    await verifyToken(req, res, next);
    const user = req.user;

    if (user) {
      next();
    } else {
      return next(createError(403, "You are not authorized."));
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Internal Server Error"));
  }
}

export async function verifyAdmin(req: any, res: any, next: any) {
  try {
    await verifyToken(req, res, next);

    if (req.user?.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised."));
    }
  } catch (error) {
    console.log(error);
    return next(createError(500, "Internal Server Error"));
  }
}

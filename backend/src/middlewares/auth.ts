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
  } catch (error) {
    return next(createError(403, "Token is not valid."));
  }

  next();
}

export async function verifyUser(req: any, res: any, next: any) {
  await verifyToken(req, res, (token: any) => {
    const user = req.user;

    if (user ) {
      req.user = user;
      next();
    } else {
      return next(createError(403, "You are not authorized."));
    }
  });
}

export function verifyAdmin(req: any, res: any, next: any) {
  verifyToken(req, res, () => {
    if (req.user?.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorised."));
    }
  });
}

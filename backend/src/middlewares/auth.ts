import { verify } from "jsonwebtoken";
import User from '../models/User'


export default async function(req: any, res: any, next: any) {
    const token = req.headers.access_token as string;
    if(!token) return res.status(401).send();    

    try {
        const user = verify(token, process.env.TOKEN_KEY!);
        req.user = user;        

    } catch (error) {
        res.status(401).send();
    }
    
    next();
}
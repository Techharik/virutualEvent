import jwt from "jsonwebtoken"
import { IUser } from "../models/userModels";

import { JWT_TIME, JWT_SECRET } from "../config/config";

export const createToken = (user: IUser) => {
    if (!JWT_SECRET) return undefined;
    if (!JWT_TIME) return undefined;


    const token = jwt.sign(
        {
            data: user._id
        },
        JWT_SECRET!,
        { expiresIn: JWT_TIME }
    )
    return token

}
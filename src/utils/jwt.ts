import jwt from "jsonwebtoken"
import { JWT_TIME, JWT_SECRET } from "../config/config";
import { UserEntityType } from "../domain/entities/UserEntityType";

export const createToken = (user: UserEntityType) => {
    if (!JWT_SECRET) return undefined;
    if (!JWT_TIME) return undefined;


    const token = jwt.sign(
        {
            id: user.id
        },
        JWT_SECRET!,
        { expiresIn: JWT_TIME }
    )
    return token

}
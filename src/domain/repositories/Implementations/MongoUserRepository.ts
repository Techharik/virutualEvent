import UserModel from "../../../models/userModels";
import { User } from "../../entities/User";
import { UserEntityType } from "../../entities/UserEntityType";
import { IUserRepository } from "../IUserRepository";


export class MongoUserRepository implements IUserRepository {
    async createUser(user: UserEntityType): Promise<UserEntityType> {
        const created = await UserModel.create({
            name: user.name,
            email: user.email,
            password: user.password
        })
        return new User(created._id.toString(), created.name, created.email, created.password)
    }

    async findByEmail(email: string): Promise<UserEntityType | null> {
        const result = await UserModel.findOne({ email }).select("+password")
        return result ? new User(result._id.toString(), result.name, result.email, result.password) : null
    }

}
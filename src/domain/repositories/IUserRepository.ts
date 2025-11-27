import { UserEntityType } from "../entities/UserEntityType"

export interface IUserRepository {
    createUser(user: UserEntityType): Promise<UserEntityType>;
    findByEmail(email: string): Promise<UserEntityType | null>;

}
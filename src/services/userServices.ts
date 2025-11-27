
//user services

import { User } from "../domain/entities/User";
import { IUserRepository } from "../domain/repositories/IUserRepository";
import { IUserValidator } from "../domain/validators/IUserValidator";
import { ConflictError } from "../utils/errorHandler";

export class UserService {
    constructor(private validator: IUserValidator, private repo: IUserRepository) { }

    //register
    register = async (data: any) => {
        //validate the data
        const dto = this.validator.vaildateRegister(data)
        //check the data exists
        const exists = await this.repo.findByEmail(dto.email);
        if (exists) throw new ConflictError("Email already exists");


        //entity
        const user = new User('', dto.name, dto.email, dto.password);

        //db
        const result = await this.repo.createUser(user)

        return result
    }
}
import { LoginDTO, RegisterDTO } from "./dto/registorDTO";

export interface IUserValidator {
    vaildateRegister(user: any): RegisterDTO;
    validateLogin(data: any): LoginDTO;
}
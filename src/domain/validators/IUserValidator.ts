import { RegisterDTO } from "./dto/registorDTO";

export interface IUserValidator {
    vaildateRegister(user: any): RegisterDTO;
}
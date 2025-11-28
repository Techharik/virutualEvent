import { z } from 'zod';
import { IUserValidator } from './IUserValidator';
import { LoginDTO, RegisterDTO } from './dto/registorDTO';
import { loginSchema, registerShema } from '../../schemaTypes/userTypes';
import { ValidationError } from '../../utils/errorHandler';


export class ZodUserValidator implements IUserValidator {

    vaildateRegister(user: any): RegisterDTO {
        const result = registerShema.safeParse(user)

        if (!result.success) {
            const msg = result.error.issues[0].message
            console.log(msg, 'mmm')
            throw new ValidationError(msg)
        }
        return result.data
    }
    validateLogin(data: any): LoginDTO {
        const result = loginSchema.safeParse(data);
        if (!result.success) {
            const msg = result.error?.issues[0].message
            throw new ValidationError(msg)
        }
        return result.data;
    }

}
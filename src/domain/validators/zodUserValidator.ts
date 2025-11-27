import { z } from 'zod';
import { IUserValidator } from './IUserValidator';
import { RegisterDTO } from './dto/registorDTO';
import { registerShema } from '../../types/userTypes';
import { ValidationError } from '../../utils/errorHandler';


export class ZodUserValidator implements IUserValidator {
    vaildateRegister(user: any): RegisterDTO {
        const result = registerShema.safeParse(user)

        if (!result.success) {
            const msg = result.error.issues[0].message
            throw new ValidationError(msg)
        }
        return result.data
    }
}
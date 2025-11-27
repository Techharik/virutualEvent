import { ValidationError } from "../../utils/errorHandler";
import { UserEntityType } from "./UserEntityType";
import bcrypt from 'bcrypt';

export class User implements UserEntityType {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public password: string
    ) {

        this.email = email.toLowerCase();
    }

    changeEmail(newEmail: string) {
        this.email = newEmail.toLowerCase()
    }

    verfiyPassword(candidate: string): Promise<boolean> {
        return bcrypt.compare(candidate, this.password)
    }
}
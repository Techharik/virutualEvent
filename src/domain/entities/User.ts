import { ValidationError } from "../../utils/errorHandler";
import { UserEntityType } from "./UserEntityType";

export class User implements UserEntityType {
    constructor(

        public id: string,
        public name: string,
        public email: string,
        public password: string
    ) {
        if (password.includes(name)) {
            throw new ValidationError("Password cannot contain name")
        }
        this.email = email.toLowerCase();
    }

    changeEmail(newEmail: string) {
        this.email = newEmail.toLowerCase()
    }
}
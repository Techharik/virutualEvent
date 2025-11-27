export interface UserEntityType {
    id: string;
    name: string;
    email: string;
    password: string;
    verfiyPassword: (candidate: string) => Promise<boolean>
}
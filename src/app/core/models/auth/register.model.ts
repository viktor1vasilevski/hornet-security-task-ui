import { LoginModel } from "./login.model";

export interface RegisterModel extends LoginModel {
    firstName: string;
    lastName: string;
}
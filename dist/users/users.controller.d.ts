import { UsersService } from "./users.service";
import { User } from "./users.model";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(user: any): Promise<User[]>;
    getProfile(user: any): Promise<User>;
    updatePassword(user: any, password: string): Promise<any>;
}

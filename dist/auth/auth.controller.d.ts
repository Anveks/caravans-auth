import { AuthService } from "./auth.service";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(name: string, email: string, password: string, address: string): Promise<import("src/users/users.model").User>;
    login(email: string, password: string): Promise<string>;
    logout(): Promise<{
        success: boolean;
        message: string;
    }>;
}

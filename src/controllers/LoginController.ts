import { Request, Response } from "express";
import { LoginService } from "../services/LoginService";
import { plainToInstance } from "class-transformer";
import { LoginDto } from "../dtos/LoginDto";

export class LoginController {

    loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    async signin(req: Request, res: Response): Promise<void> {
        try {
            const data = plainToInstance(LoginDto, req.body);
            const token = await this.loginService.signin(data);
            res.status(200).json({ accessToken: token});
        }catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : 'ao criar o token' });
        }
    }
}
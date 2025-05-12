
import { Router } from 'express';
import { UserRepository } from '../repositorys/userRepository';
import { ContatoDto } from '../dtos/ContatoDto';
import { validateDto } from '../middleware/validatorDtos';
import { LoginDto } from '../dtos/LoginDto';
import { LoginService } from '../services/LoginService';
import { LoginController } from '../controllers/LoginController';


const loginRouter = Router();
const loginService = new LoginService(new UserRepository())
const loginController = new LoginController(loginService);

// Rotas do crud

loginRouter.post('/', validateDto(LoginDto) as any, (req, res) => {loginController.signin(req, res)});


export { loginRouter };
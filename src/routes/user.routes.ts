
import { Router } from 'express';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositorys/userRepository';
import { UserController } from '../controllers/UserController';
import { UserDto } from '../dtos/UserDto';
import { validateDto } from '../middleware/validatorDtos';
import { authenticateJWT } from '../auth/middlewareValidator';


const userRouter = Router();
const userService = new UserService(new UserRepository());
const userController = new UserController(userService);

// Rotas do crud
userRouter.get('/', authenticateJWT as any, (req, res) => {userController.findAll(req, res)});
userRouter.get('/:id', authenticateJWT as any, (req, res) => {userController.findById(req, res)});
userRouter.post('/', validateDto(UserDto) as any, (req, res) => {userController.create(req, res)});
userRouter.put('/:id', authenticateJWT as any, validateDto(UserDto) as any, (req, res) => {userController.update(req, res)});
userRouter.delete('/:id', authenticateJWT as any, (req, res) => {userController.delete(req, res)});

export { userRouter };
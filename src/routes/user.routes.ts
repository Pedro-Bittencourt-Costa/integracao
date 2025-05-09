
import { Router } from 'express';
import { UserService } from '../services/UserService';
import { UserRepository } from '../repositorys/userRepository';
import { UserController } from '../controllers/UserController';
import { ContatoRepository } from '../repositorys/ContatoRepository';
import { UserDto } from '../dtos/UserDto';
import { validateDto } from '../middleware/validatorDtos';


const userRouter = Router();
const userService = new UserService(new UserRepository(), new ContatoRepository);
const userController = new UserController(userService);

// Rotas do crud
userRouter.get('/', (req, res) => {userController.findAll(req, res)});
userRouter.get('/:id', (req, res) => {userController.findById(req, res)});
userRouter.post('/', validateDto(UserDto) as any, (req, res) => {userController.create(req, res)});
userRouter.put('/:id', validateDto(UserDto) as any, (req, res) => {userController.update(req, res)});
userRouter.delete('/:id', (req, res) => {userController.delete(req, res)});

export { userRouter };
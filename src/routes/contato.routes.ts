
import { Router } from 'express';
import { UserRepository } from '../repositorys/userRepository';
import { ContatoRepository } from '../repositorys/ContatoRepository';
import { ContatoService } from '../services/ContatoService';
import { ContatoController } from '../controllers/ContatoController';
import { ContatoDto } from '../dtos/ContatoDto';
import { validateDto } from '../middleware/validatorDtos';
import { authenticateJWT } from '../auth/middlewareValidator';


const contatoRouter = Router();
const contatoService = new ContatoService(new ContatoRepository(), new UserRepository);
const contatoController = new ContatoController(contatoService);

// Rotas do crud
contatoRouter.get('/', authenticateJWT as any, (req, res) => {contatoController.findAll(req, res)});
contatoRouter.get('/:id', authenticateJWT as any, (req, res) => {contatoController.findById(req, res)});
contatoRouter.post('/', authenticateJWT as any, validateDto(ContatoDto) as any, (req, res) => {contatoController.create(req, res)});
contatoRouter.put('/:id', authenticateJWT as any, validateDto(ContatoDto) as any, (req, res) => {contatoController.update(req, res)});
contatoRouter.delete('/:id', authenticateJWT as any, (req, res) => {contatoController.delete(req, res)});

export { contatoRouter };
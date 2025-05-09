
import { Router } from 'express';
import { UserRepository } from '../repositorys/userRepository';
import { ContatoRepository } from '../repositorys/ContatoRepository';
import { ContatoService } from '../services/ContatoService';
import { ContatoController } from '../controllers/ContatoController';
import { ContatoDto } from '../dtos/ContatoDto';
import { validateDto } from '../middleware/validatorDtos';


const contatoRouter = Router();
const contatoService = new ContatoService(new ContatoRepository(), new UserRepository);
const contatoController = new ContatoController(contatoService);

// Rotas do crud
contatoRouter.get('/', (req, res) => {contatoController.findAll(req, res)});
contatoRouter.get('/:id', (req, res) => {contatoController.findById(req, res)});
contatoRouter.post('/', validateDto(ContatoDto) as any, (req, res) => {contatoController.create(req, res)});
contatoRouter.put('/:id', validateDto(ContatoDto) as any, (req, res) => {contatoController.update(req, res)});
contatoRouter.delete('/:id', (req, res) => {contatoController.delete(req, res)});

export { contatoRouter };
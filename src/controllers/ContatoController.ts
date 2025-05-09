import { ContatoDto } from "../dtos/ContatoDto";
import { Contato } from "../entities/Contato";
import { ContatoService } from "../services/ContatoService";
import { BaseController } from "./BaseController";


export class ContatoController extends BaseController<Contato, ContatoDto> {
    
    public contatoService: ContatoService;

    constructor(contatoService: ContatoService) {
        super(contatoService);
        this.contatoService = contatoService;
    }
}
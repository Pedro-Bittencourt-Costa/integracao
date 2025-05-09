import { ObjectLiteral } from "typeorm";
import { BaseService } from "../services/BaseService";
import { Request, Response } from "express";

export class BaseController<T extends ObjectLiteral, CreateDto = T> {

    public service: BaseService<T, CreateDto>;

    constructor(service: BaseService<T, CreateDto>){
        this.service = service;
    }

    async findAll(req: Request, res: Response): Promise<Response> {

        try{
            const item = this.service.findAll();
            return res.status(200).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            const item = this.service.findById(id);
            return res.status(200).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        try{
            const { body } = req.body;
            const item = this.service.create(body);
            return res.status(201).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            const { body } = req.body;
            this.service.update(id, body);
            return res.status(204).send();
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            this.service.delete(id);
            return res.status(204).send();
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }


}
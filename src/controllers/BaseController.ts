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
            const item = await this.service.findAll();
            return res.status(200).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async findById(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            const item = await this.service.findById(id);
            return res.status(200).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async create(req: Request, res: Response): Promise<Response> {

        try{
            const item = await this.service.create(req.body);
            return res.status(201).json(item);
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async update(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            await this.service.update(id, req.body);
            return res.status(204).send();
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }

    async delete(req: Request, res: Response): Promise<Response> {

        try{
            const id = parseInt(req.params.id);
            await this.service.delete(id);
            return res.status(204).send();
        }catch(error) {
            return res.status(400).send({ message: error instanceof Error ? error.message : 'Erro ao buscar item' })
        }
    }


}
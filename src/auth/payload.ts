import { Request } from "express";
import { User } from "../entities/User";

export interface IPayload {
    usuario: User;
}

export interface RequestWithPayload extends Request {
    payload: IPayload;
  }
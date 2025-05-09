import { UserDto } from "../dtos/UserDto";
import { User } from "../entities/User";
import { UserService } from "../services/UserService";
import { BaseController } from "./BaseController";

export class UserController extends BaseController<User, UserDto> {
    
    public userService: UserService;

    constructor(userService: UserService){
        super(userService);
        this.userService = userService;
    }

    
}
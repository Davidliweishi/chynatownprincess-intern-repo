import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        id: number;
    }>;
    findAll(): import("./users.service").User[];
    findOne(id: number): UserEntity;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("./users.service").User>;
    remove(id: string): Promise<import("./users.service").User>;
}

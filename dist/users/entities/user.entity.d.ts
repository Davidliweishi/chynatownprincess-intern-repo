export declare class UserEntity {
    id: number;
    name: string;
    email: string;
    password: string;
    isActive: boolean;
    constructor(partial: Partial<UserEntity>);
}

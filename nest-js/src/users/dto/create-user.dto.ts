import { IsEmail, IsString, MinLength} from 'class-validator';

export class CreateUserDto {
  @IsString()
  name!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8) // Requires at least 8 characters
  password!: string;
}

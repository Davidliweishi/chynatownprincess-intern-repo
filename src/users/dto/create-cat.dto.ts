import { IsString, IsInt, IsEmail, IsOptional, Min } from 'class-validator';

export class CreateCatDto {
  @IsString() //validates incoming valueif its a string
  name!: string;

  @IsInt()
  @Min(0)
  age!: number;

  @IsEmail()
  @IsOptional() // this field isn't required
  email?: string;
}

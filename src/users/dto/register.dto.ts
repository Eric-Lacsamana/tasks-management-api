import { IsEmail, IsString, IsOptional, Length } from 'class-validator';

export class RegisterDto {
  @IsString()
  @Length(4, 20)
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20) // Example length validation
  password: string;

  @IsOptional()
  @IsString()
  @Length(1, 50) // Optional field with length validation
  name?: string;
}

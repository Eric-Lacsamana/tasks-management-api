import { IsEmail, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 20)  // Example length validation
  password: string;
}

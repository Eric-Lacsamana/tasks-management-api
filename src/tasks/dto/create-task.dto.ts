import {
  IsString,
  IsNotEmpty,
  IsBoolean,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  @IsBoolean()
  readonly isComplete?: boolean;

  @ValidateNested()
  @Type(() => UserDto)
  readonly user: UserDto; // Nested user data
}

export class UserDto {
  @IsString()
  @IsNotEmpty()
  readonly username: string;
}

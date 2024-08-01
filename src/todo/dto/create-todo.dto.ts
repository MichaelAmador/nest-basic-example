import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTodoDto {

  @IsInt()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsBoolean()
  @IsOptional()
  done: boolean;

  @IsInt()
  @IsPositive()
  idCategory: number;
}

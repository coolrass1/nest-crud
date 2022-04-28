import { IsEmail, IsNotEmpty, IsInt } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  // @IsInt()
  Title: string;

  @IsNotEmpty()
  Description: string;
}
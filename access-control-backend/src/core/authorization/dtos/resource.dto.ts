import { IsNotEmpty, IsString } from 'class-validator';

export class ResourceInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  key: string;
}

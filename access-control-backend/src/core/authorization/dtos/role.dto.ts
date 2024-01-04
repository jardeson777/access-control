import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Action } from '../action.enum';
import { Type } from 'class-transformer';

class Permission {
  @IsString()
  @IsNotEmpty()
  resources: string;

  @IsString()
  @IsNotEmpty()
  action: keyof typeof Action;
}

export class RoleInput {
  @IsString()
  @IsNotEmpty()
  key: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => Permission)
  permissions: Permission[];
}

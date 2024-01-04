import { SetMetadata } from '@nestjs/common';
import { Action } from '../../core/authorization/action.enum';

export type PermitionType = {
  resources: string;
  action: keyof typeof Action;
};

export const HAVE_PERMITION_KEY = 'havePermition';
export const Permition = (options: PermitionType) => {
  return SetMetadata('havePermition', options);
};

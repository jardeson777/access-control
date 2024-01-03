import { SetMetadata } from '@nestjs/common';

export type PermitionType = {
  resources: 'product' | 'user';
  action: 'create' | 'read' | 'delete';
};

export const HAVE_PERMITION_KEY = 'havePermition';
export const Permition = (options: PermitionType) => {
  return SetMetadata('havePermition', options);
};

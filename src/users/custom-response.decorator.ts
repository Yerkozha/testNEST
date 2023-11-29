import { SetMetadata, createParamDecorator } from '@nestjs/common';

export const CustomResponse = (message: string, statusCode: number) =>
  SetMetadata('customResponse', { message, statusCode });

export const GetCustomResponse = createParamDecorator(
  (_, context) => {
    const customResponse = Reflect.getMetadata('customResponse', context.getHandler());
    return customResponse;
  },
);
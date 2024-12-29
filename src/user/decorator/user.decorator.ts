import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

// Кастомный декортатор для получения текущего пользователя
export const CurrentUser = createParamDecorator(
  (data: keyof User, req: ExecutionContext) => {
    const request = req.switchToHttp().getRequest();
    const user = request.user;

    return data ? user[data] : user;
  },
);

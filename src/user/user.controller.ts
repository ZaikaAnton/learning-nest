import { Controller, Get, Param, Patch } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorator/user.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Руччка для получения профиля
  // Кастомный декоратор, проверяет зареган ли пользователь
  @Auth()
  @Get('profile')
  async getProfile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }

  // Ручка для добавления в избранное продукта
  @Auth()
  @Patch('profile/favorites/:productId')
  async toggleFavorite(
    @CurrentUser('id') userId: string,
    @Param('productId') productId: string,
  ) {
    return this.userService.toggleFavorite(productId, userId);
  }
}

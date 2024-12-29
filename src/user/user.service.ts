import { Injectable, UnauthorizedException } from '@nestjs/common';
import { hash } from 'argon2';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  // Получаем пользователя по id.
  // Возвращаем самого пользователя и его магазины, избранные товары и заказы
  async getById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: { stores: true, favorites: true, orders: true },
    });
    if (!user) {
      throw new UnauthorizedException(`Пользователь с id ${id} не найден`);
    }
    return user;
  }

  // Получаем пользователя по email
  // Возвращаем самого пользователя и его магазины, избранные товары и заказы
  async getByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { stores: true, favorites: true, orders: true },
    });
    return user;
  }

  // Сервис, который добавляет или удаляет продукт из избранного у пользователя
  async toggleFavorite(productId: string, userId: string) {
    const user = await this.getById(userId);

    const isExists = user.favorites.some(
      (productId) => productId === productId,
    );

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        favorites: {
          [isExists ? 'disconnect' : 'connect']: { id: productId },
        },
      },
    });

    return true;
  }

  // Создание пользователя
  async create(dto: AuthDto) {
    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: await hash(dto.password),
      },
    });
  }
}

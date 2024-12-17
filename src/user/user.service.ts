import { Injectable } from '@nestjs/common';
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

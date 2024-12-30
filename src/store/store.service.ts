import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private prisma: PrismaService) {}

  // Метод на получение магазина
  async getById(storeId: string, userId: string) {
    const store = await this.prisma.store.findUnique({
      where: {
        id: storeId,
        userId: userId,
      },
    });

    if (!store)
      throw new NotFoundException(
        'Магазин не найден или вы не являетесь его владельцем',
      );

    return store;
  }

  // Метод на создание магазина
  async create(dto: CreateStoreDto, userId: string) {
    return this.prisma.store.create({
      data: {
        title: dto.title,
        userId,
        description: 'Тут должно быть описание',
      },
    });
  }
  // Метод на редактирование магазина
  async update(storeId: string, dto: UpdateStoreDto, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.update({
      where: { id: storeId },
      data: {
        title: dto.title,
        userId,
        description: dto.description,
      },
    });
  }
  // Метод на удаление магазина
  async delete(storeId: string, userId: string) {
    await this.getById(storeId, userId);

    return this.prisma.store.delete({
      where: { id: storeId },
    });
  }
}

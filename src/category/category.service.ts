import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CategoryDto } from './dto/category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  // Получение категории для конкретного магазина
  async getByStoreId(storeId: string) {
    return this.prisma.category.findMany({
      where: { storeId },
    });
  }

  // Получение категории по id
  async getById(id: string) {
    const category = await this.prisma.category.findUnique({ where: { id } });

    if (!category) throw new NotFoundException('Категория не найдена');

    return category;
  }

  // Создание категории для магазина
  async create(storeId: string, dto: CategoryDto) {
    return this.prisma.category.create({
      data: {
        title: dto.title,
        description: dto.description,
        storeId,
      },
    });
  }

  // Обновление категории
  async update(id: string, dto: CategoryDto) {
    await this.getById(id);

    return this.prisma.category.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  // Удаление категории
  async delete(id: string) {
    await this.getById(id);

    return this.prisma.category.delete({ where: { id } });
  }
}

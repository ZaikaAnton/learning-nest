import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { ColorDto } from './dto/color.dto';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  // Получение цвета для конкретного магазина
  async getByStoreId(storeId: string) {
    return this.prisma.color.findMany({
      where: { storeId },
    });
  }

  // Получение цвета по id
  async getById(id: string) {
    const color = await this.prisma.color.findUnique({ where: { id } });

    if (!color) throw new NotFoundException('Цвет не найден');

    return color;
  }

  // Создание цвета для магазина
  async create(storeId: string, dto: ColorDto) {
    return this.prisma.color.create({
      data: {
        name: dto.name,
        value: dto.value,
        storeId,
      },
    });
  }

  // Обновление цвета
  async update(id: string, dto: ColorDto) {
    await this.getById(id);

    return this.prisma.color.update({
      where: { id },
      data: {
        ...dto,
      },
    });
  }

  // Удаление цвета
  async delete(id: string) {
    await this.getById(id);

    return this.prisma.color.delete({ where: { id } });
  }
}

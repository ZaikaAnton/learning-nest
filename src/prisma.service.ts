import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Этот код взять с доки Nest. Он нужен для того чтобы мы могли обращатсья к БД через Prisma
// Это Сервис Призмы
// @Injectable - указывает на то что это Провайдер(Сервис)
// Особо можно не вдаваться в подробности. Всегда копируем это и вставляем. Через PrismaService мы будем работать с БД.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}

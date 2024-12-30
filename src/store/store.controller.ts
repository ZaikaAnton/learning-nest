import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/decorator/user.decorator';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Controller('stores')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  // Ручка на получение магазина
  @Auth()
  @Get('by-id/:id')
  async getById(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.getById(storeId, userId);
  }

  // Ручка на создание магазина
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post()
  async create(@Body() dto: CreateStoreDto, @CurrentUser('id') userId: string) {
    return this.storeService.create(dto, userId);
  }

  // Ручка на редактирование магазина
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Put(':id')
  async update(
    @Param('id') storeId: string,
    @Body() dto: UpdateStoreDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.update(storeId, dto, userId);
  }

  // Ручка на удаление магазина
  @HttpCode(200)
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id') storeId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.storeService.delete(storeId, userId);
  }
}

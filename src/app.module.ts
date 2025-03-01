import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, UserModule, StoreModule, ColorModule, CategoryModule, FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

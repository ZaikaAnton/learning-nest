import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
//Короче - это типо подключение к БД
// configService: ConfigService - это типо ТО ЧТО ЛЕЖИТ У НАС В .env
export const getMongoConfig = (
  configService: ConfigService,
): TypegooseModuleOptions => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

// Формируем Url для подключения к MongoBD
const getMongoString = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('MONGO_LOGIN') +
  ':' +
  configService.get('MONGO_PASSWORD') +
  '@' +
  configService.get('MONGO_HOST') +
  ':' +
  configService.get('MONGO_PORT') +
  '/' +
  configService.get('MONGO_AUTHDATABASE');

// Доп опции для подключения. Можно глянуть в доке или у гпт спросить
const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

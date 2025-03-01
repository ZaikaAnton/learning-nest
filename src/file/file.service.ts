import { Injectable } from '@nestjs/common';
import { path } from 'app-root-path';
import { ensureDir, writeFile } from 'fs-extra';
import { FileResponse } from './file.interface';

@Injectable()
export class FileService {
  // Метод для загрузки файлов
  async saveFiles(files: Express.Multer.File[], folder?: string) {
    const uploadedFolder = `${path}/uploads/${folder}`;

    // Проверяем, существует ли директория, и если нет - создаем по указанному пути
    await ensureDir(uploadedFolder);

    const response: FileResponse[] = await Promise.all(
      files.map(async (file) => {
        const originalName = `${Date.now()}-${file.originalname}`;

        await writeFile(`${uploadedFolder}/${originalName}`, file.buffer);

        return {
          url: `${folder}/${originalName}`,
          name: originalName,
        };
      }),
    );
    return response;
  }
}

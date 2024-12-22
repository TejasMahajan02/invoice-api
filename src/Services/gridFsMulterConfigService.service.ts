import { Injectable } from '@nestjs/common';
import { MulterOptionsFactory, MulterModuleOptions } from '@nestjs/platform-express';
import { GridFsStorage } from 'multer-gridfs-storage';


@Injectable()
export class GridFsMulterConfigService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    const storage = new GridFsStorage({
      url: 'mongodb://localhost/nest',
      file: (req, file) => {
        return {
          bucketName: 'uploads',
          filename: `${Date.now()}-${file.originalname}`,
        };
      },
    });

    return {
      storage,
    };
  }
}

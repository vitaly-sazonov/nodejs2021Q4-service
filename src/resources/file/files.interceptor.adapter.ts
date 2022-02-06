import { FileInterceptor as ExpressInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileFastifyInterceptor as FastifyInterceptor, diskStorage } from 'fastify-file-interceptor';
import { DiskStorageOptions } from 'multer';

// TODO: доделать

// const fileFilter = (req: any, file: any, callback: any) => {
//   return callback(new Error('Only image files are allowed!'), false);
//   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//     return callback(new Error('Only image files are allowed!'), false);
//   }
//   callback(null, true);
// };

export function FileInterceptor(fieldName: string, options: DiskStorageOptions) {
  const isFastify = JSON.parse(new ConfigService().get<string>('USE_FASTIFY') as string);
  return isFastify
    ? FastifyInterceptor(fieldName, { storage: diskStorage(options) })
    : ExpressInterceptor(fieldName, { storage: diskStorage(options) });
}

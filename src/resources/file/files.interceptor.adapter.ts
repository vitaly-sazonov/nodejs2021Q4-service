import { FileInterceptor as ExpressInterceptor } from '@nestjs/platform-express';
import { ConfigService } from '@nestjs/config';
import { FileFastifyInterceptor as FastifyInterceptor, diskStorage } from 'fastify-file-interceptor';
import { DiskStorageOptions } from 'multer';

export function FileInterceptor(fieldName: string, options: DiskStorageOptions) {
  const isFastify = JSON.parse(new ConfigService().get<string>('USE_FASTIFY') as string);
  return isFastify
    ? FastifyInterceptor(fieldName, { storage: diskStorage(options) })
    : ExpressInterceptor(fieldName, { storage: diskStorage(options) });
}

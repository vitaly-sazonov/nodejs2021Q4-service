import { v4 as uuid } from 'uuid';
import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  HttpException,
} from '@nestjs/common';
import { existsSync, createReadStream } from 'fs';
import { join } from 'path';
import { ApiTags } from '@nestjs/swagger';
import { Express } from 'express';
import { AuthGuard } from '../auth/jwt-auth.guard';

import { FileInterceptor } from './files.interceptor.adapter';
import { FileService } from './files.service';

@ApiTags('Upload file')
@Controller()
@UseGuards(AuthGuard)
export class FileController {
  constructor(private fileService: FileService) {}

  // TODO: Fix! Добавить проверку не существование файла и отменить загрузку файла
  @Post('/file')
  @UseInterceptors(
    FileInterceptor('file', {
      destination: './uploads',
      filename: (req, file, cb) => cb(null, uuid()),
    }),
  )
  @HttpCode(HttpStatus.OK)
  upload(@UploadedFile() file: Express.Multer.File): Promise<string> {
    return this.fileService.saveFilename(file.originalname, file.filename, file.size);
  }

  @Get('/file/:filename')
  @HttpCode(HttpStatus.OK)
  async download(@Param('filename') requestFilename: string): Promise<StreamableFile> {
    const fileId = await this.fileService.findFileId(requestFilename);
    const filepath = join(process.cwd(), `/uploads/${fileId}`);

    if (existsSync(filepath)) {
      const stream = createReadStream(filepath);
      return new StreamableFile(stream);
    }
    throw new HttpException('File was not founded!', HttpStatus.NOT_FOUND);
  }
}

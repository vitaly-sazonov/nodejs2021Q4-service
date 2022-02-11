import { IsNotEmpty } from 'class-validator';
import { Express } from 'express';

export class UploadFileDto {
  @IsNotEmpty()
  file!: Express.Multer.File;
}

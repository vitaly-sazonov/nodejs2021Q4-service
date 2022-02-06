import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { Column } from './columns.entity';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [AuthModule, TypeOrmModule.forFeature([Column])],
  exports: [ColumnsService],
})
export class ColumnsModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';

import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

import { ColumnsModule } from '../columns/columns.module';

@Module({
  providers: [BoardsService],
  controllers: [BoardsController],
  imports: [AuthModule, ColumnsModule, TypeOrmModule.forFeature([Board])],
})
export class BoardsModule {}

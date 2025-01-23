import { Module } from '@nestjs/common';
import { PoleService } from './pole.service';
import { PoleController } from './pole.controller';

@Module({
  controllers: [PoleController],
  providers: [PoleService],
})
export class PoleModule {}

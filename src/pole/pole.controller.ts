import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PoleService } from './pole.service';
import { CreatePoleDto } from './dto/create-pole.dto';
import { UpdatePoleDto } from './dto/update-pole.dto';

@Controller('pole')
export class PoleController {
  constructor(private readonly poleService: PoleService) {}

  @Post()
  create(@Body() createPoleDto: CreatePoleDto) {
    return this.poleService.create(createPoleDto);
  }

  @Get()
  findAll() {
    return this.poleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePoleDto: UpdatePoleDto) {
    return this.poleService.update(+id, updatePoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.poleService.remove(+id);
  }
}

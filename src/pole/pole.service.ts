import { Injectable } from '@nestjs/common';
import { CreatePoleDto } from './dto/create-pole.dto';
import { UpdatePoleDto } from './dto/update-pole.dto';

@Injectable()
export class PoleService {
  create(createPoleDto: CreatePoleDto) {
    return 'This action adds a new pole';
  }

  findAll() {
    return `This action returns all pole`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pole`;
  }

  update(id: number, updatePoleDto: UpdatePoleDto) {
    return `This action updates a #${id} pole`;
  }

  remove(id: number) {
    return `This action removes a #${id} pole`;
  }
}

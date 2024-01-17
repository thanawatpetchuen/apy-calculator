import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PoolService } from './pool.service';
import { CreatePoolDto } from './dto/create-pool.dto';
import { DeletePoolDto } from './dto/delete-pool.dto';

@Controller('pool')
export class PoolController {
  constructor(private readonly poolService: PoolService) {}

  @Post()
  create(@Body() createPoolDto: CreatePoolDto) {
    return this.poolService.create(createPoolDto);
  }

  @Get()
  findAll() {
    return this.poolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poolService.findOne(id);
  }

  @Delete()
  remove(@Body() deletePoolDto: DeletePoolDto) {
    return this.poolService.remove(deletePoolDto.address);
  }
}

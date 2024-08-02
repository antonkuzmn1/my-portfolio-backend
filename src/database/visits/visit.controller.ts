import { Controller, Get, Post, Body, Ip } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit, VisitActions } from './visit.entity';

@Controller('visits')
export class VisitController {
  constructor(
    private readonly visitService: VisitService,
  ) {
  }

  @Get()
  async findAll(): Promise<Visit[]> {
    return this.visitService.findAll();
  }

  @Post()
  async createVisit(
    @Ip() ip: string,
    @Body('action') action: VisitActions
  ): Promise<Visit> {
    return this.visitService.createVisit(ip, action);
  }
}

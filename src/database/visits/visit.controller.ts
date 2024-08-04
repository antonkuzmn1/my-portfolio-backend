import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { VisitService } from './visit.service';
import { Visit, VisitActions } from './visit.entity';
import { TelegramService } from '../../telegram/telegram.service';

@Controller('visits')
export class VisitController {
  constructor(
    private readonly visitService: VisitService,
    private telegramService: TelegramService,
  ) {
  }

  @Get()
  async findAll(): Promise<Visit[]> {
    return this.visitService.findAll();
  }

  @Post()
  async createVisit(
    @Headers('x-real-ip') ipAddress: string,
    @Headers() headers: any,
    @Body('action') action: VisitActions
  ): Promise<Visit> {
    const formattedHeaders = JSON.stringify(headers, null, 2);
    await this.telegramService.sendMessage(`${ipAddress}\n\`\`\`json\n${formattedHeaders}\`\`\``);
    return this.visitService.createVisit(ipAddress, action);
  }
}

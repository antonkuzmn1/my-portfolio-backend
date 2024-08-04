import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService {
  private readonly token: string;
  private readonly chatId: string;

  constructor(
    private configService: ConfigService,
  ) {
    this.token = this.configService.get<string>('TELEGRAM_TOKEN');
    this.chatId = this.configService.get<string>('TELEGRAM_ID');
  }

  async sendMessage(message: string): Promise<void> {
    const url = `https://api.telegram.org/bot${this.token}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: this.chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }
  }
}

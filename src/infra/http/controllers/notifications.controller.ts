import { CreateNotificationBody } from '../dtos/create-notification-body';
import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly sendNotifications: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotifications.execute({
      recipientId,
      content,
      category,
    });

    return { notification };
  }
}

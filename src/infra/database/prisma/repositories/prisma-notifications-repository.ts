import { Injectable } from '@nestjs/common';
import { Notification } from '@app/entities/notification';
import { NotificationRepository } from '@app/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.prisma.notification.findUniqueOrThrow({
      where: {
        id: notificationId,
      },
    });
    if (!notification) return null;
    return PrismaNotificationMapper.toDomain(await notification);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = this.prisma.notification.findMany({
      where: {
        recipientId,
      },
    });
    return (await notifications).map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientId,
      },
    });
    return count;
  }

  async create(notification: Notification): Promise<void> {
    const prismaNotification = PrismaNotificationMapper.toPrisma(notification);
    await this.prisma.notification.create({
      data: prismaNotification,
    });
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }
}

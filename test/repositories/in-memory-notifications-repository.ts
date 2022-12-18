import { Notification } from '@app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notifications-repository';

export class InMemoryNotificationRepository implements NotificationRepository {
  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (not) => not.id === notificationId,
    );
    return notification ? notification : null;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    return this.notifications.filter((not) => not.recipientId === recipientId);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const recipientNotifications = this.notifications.filter(
      (not) => not.recipientId === recipientId,
    );
    return recipientNotifications.length;
  }

  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async save(notification: Notification): Promise<void> {
    const idx = this.notifications.findIndex(
      (not) => not.id === notification.id,
    );
    if (idx) this.notifications[idx] = notification;
  }
}

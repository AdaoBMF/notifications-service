import { makeNotification } from '@test/factories/motifications-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  const unreadNotification = new UnreadNotification(notificationsRepo);

  it('Should be able to flag a notification as unread', async () => {
    const notification = makeNotification({ readAt: new Date() });

    await notificationsRepo.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepo.notifications[0].readAt).toBe(null);
  });

  it(`shouldn't be able to cancel notification if the provided id don't match any notification`, async () => {
    expect(() => {
      return unreadNotification.execute({ notificationId: 'mock-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});

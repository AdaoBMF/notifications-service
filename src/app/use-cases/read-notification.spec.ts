import { makeNotification } from '@test/factories/motifications-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  const readNotification = new ReadNotification(notificationsRepo);

  it('Should be able to flag a notification as read', async () => {
    const notification = makeNotification();

    await notificationsRepo.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepo.notifications[0].readAt).toEqual(expect.any(Date));
  });

  it(`shouldn't be able to cancel notification if the provided id don't match any notification`, async () => {
    expect(() => {
      return readNotification.execute({ notificationId: 'mock-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});

import { makeNotification } from '@test/factories/motifications-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  const cancelNotification = new CancelNotification(notificationsRepo);

  it('Should be able to cancel a notification', async () => {
    const notification = makeNotification();

    await notificationsRepo.create(notification);

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationsRepo.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it(`shouldn't be able to cancel notification if the provided id don't match any notification`, async () => {
    expect(() => {
      return cancelNotification.execute({ notificationId: 'mock-id' });
    }).rejects.toThrow(NotificationNotFound);
  });
});

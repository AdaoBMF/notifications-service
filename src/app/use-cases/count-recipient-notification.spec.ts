import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/motifications-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';

describe('Count notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  const countRecipientNotifications = new CountRecipientNotifications(
    notificationsRepo,
  );

  it('Should be able to return the amount of notifications related to the provided recipient id', async () => {
    const count = await countRecipientNotifications.execute({
      recipientId: 'Mock recipient id',
    });

    expect(count).toEqual({ count: 0 });
  });

  it('Should be able to return the amount of notifications related to the provided recipient id', async () => {
    for (let i = 0; i < 7; i++) {
      notificationsRepo.create(makeNotification());
    }
    await notificationsRepo.create(
      makeNotification({ recipientId: 'Mock another recipientId' }),
    );
    const count = await countRecipientNotifications.execute({
      recipientId: 'Mock recipientId',
    });

    expect(count).toEqual({ count: 7 });
    expect(notificationsRepo.notifications.length).toEqual(8);
  });
});

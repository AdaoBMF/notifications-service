import { Content } from '@app/entities/content';
import { Notification } from '@app/entities/notification';
import { makeNotification } from '@test/factories/motifications-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';
import { GetRecipientNotifications } from './get-recipient-notification';

describe('Count notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  const getRecipientNotifications = new GetRecipientNotifications(
    notificationsRepo,
  );

  it('Should be able to return the amount of notifications related to the provided recipient id', async () => {
    for (let i = 0; i < 7; i++) {
      notificationsRepo.create(
        makeNotification({ recipientId: 'Mock recipientId' }),
      );
    }
    await notificationsRepo.create(
      makeNotification({ recipientId: 'Mock another recipientId' }),
    );
    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'Mock recipientId',
    });

    expect(notifications).toHaveLength(7);
    expect(
      notifications.every((not) => not.recipientId === 'Mock recipientId'),
    ).toBe(true);
    expect(notificationsRepo.notifications.length).toEqual(8);
  });
});

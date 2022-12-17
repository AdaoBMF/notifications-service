import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { SendNotification } from './send-notification';

describe('Send notification', () => {
  const notificationsRepo = new InMemoryNotificationRepository();
  it('Should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationsRepo);

    const { notification } = await sendNotification.execute({
      content: 'Mock content',
      category: 'Mock category',
      recipientId: 'Mock recipientId',
    });
    expect(notification).toHaveProperty('content');
    expect(notification).toHaveProperty('category');
    expect(notification).toHaveProperty('recipientId');
    expect(notificationsRepo.notifications).toHaveLength(1);
    expect(notificationsRepo.notifications[0]).toEqual(notification);
  });
});

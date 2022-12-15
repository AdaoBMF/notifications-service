import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  it('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('mocked valid content'),
      category: 'Mocked category',
      recipientId: 'Mocked-id',
    });
    expect(notification).toBeTruthy();
  });
});

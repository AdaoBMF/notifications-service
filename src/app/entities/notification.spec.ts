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
  it('should be able to change the values of a notification', () => {
    const notification = new Notification({
      content: new Content('mocked valid content'),
      category: 'Mocked category',
      recipientId: 'Mocked-id',
      createdAt: new Date(),
    });
    notification.category = 'new category';
    notification.content = new Content('new content');
    notification.category = 'new category';
    notification.recipientId = 'new-id';
    expect(notification.category).toEqual('new category');
    expect(notification.content).toEqual({ content: 'new content' });
    expect(notification.recipientId).toEqual('new-id');
    expect(notification.createdAt).toEqual(expect.any(Date));
  });
});

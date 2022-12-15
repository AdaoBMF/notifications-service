import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('Some notification content');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification with less than 5 characters', () => {
    expect(() => new Content('mock')).toThrow();
  });

  it('should not be able to create a notification with more than 240 characters', () => {
    expect(() => new Content('m'.repeat(241))).toThrow();
  });
});

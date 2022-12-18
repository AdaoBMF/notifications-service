import { Content } from './content';

describe('Notification content', () => {
  it('should be able to create a notification content', () => {
    const content = new Content('mock notification content');
    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', () => {
    expect(() => new Content('mock')).toThrow();
  });

  it('should not be able to create a notification content with more than 240 characters', () => {
    expect(() => new Content('m'.repeat(241))).toThrow();
  });

  it('should return the value of a content', () => {
    const content = new Content('Mock notification content');
    expect(content.value).toEqual('Mock notification content');
  });
});

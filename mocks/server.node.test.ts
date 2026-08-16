import { server } from './server.node';

describe('MSW node server', () => {
  it('sets up a server instance with lifecycle methods', () => {
    expect(server).toBeDefined();
    expect(typeof server.listen).toBe('function');
    expect(typeof server.close).toBe('function');
    expect(typeof server.resetHandlers).toBe('function');
  });
});

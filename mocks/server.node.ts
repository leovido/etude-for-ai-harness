/**
 * MSW Server Setup for Jest/Node.js Testing
 * Uses msw/node instead of msw/native for Jest environment
 */
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);

import '@testing-library/jest-dom/vitest'

import { cleanup } from '@testing-library/react'
import { server } from './src/test-utils/server';


beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => {
  cleanup()
  server.resetHandlers()
});
afterAll(() => server.close());


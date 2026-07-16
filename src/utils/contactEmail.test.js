import test from 'node:test';
import assert from 'node:assert/strict';
import { createMailtoLink, getContactEmail } from './contactEmail.js';

test('uses the configured advisor email when available', () => {
  const env = { VITE_CONTACT_EMAIL: 'advisor@example.com' };
  assert.equal(getContactEmail(env), 'advisor@example.com');
});

test('falls back to the correct Nusuk advisor inbox', () => {
  assert.equal(getContactEmail({}), 'reservation.nusuktours@gmail.com');
});

test('builds a mailto link for the configured advisor inbox', () => {
  const link = createMailtoLink({
    name: 'Ada',
    email: 'ada@example.com',
    phone: '123',
    journeyType: 'umrah',
    message: 'Hello',
  }, { VITE_CONTACT_EMAIL: 'advisor@example.com' });

  assert.match(link, /^mailto:advisor@example.com\?/);
});

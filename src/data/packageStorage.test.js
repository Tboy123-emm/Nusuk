import test from 'node:test';
import assert from 'node:assert/strict';
import { defaultPackages } from './packageData.js';
import { getPlanForTier, loadPackagesFromStorage, resolvePackagesForDisplay, savePackagesToStorage } from './packageStorage.js';

class MemoryStorage {
  constructor() {
    this.store = new Map();
  }

  getItem(key) {
    return this.store.has(key) ? this.store.get(key) : null;
  }

  setItem(key, value) {
    this.store.set(key, String(value));
  }

  removeItem(key) {
    this.store.delete(key);
  }

  clear() {
    this.store.clear();
  }
}

globalThis.localStorage = new MemoryStorage();

test('saves and loads packages from browser storage', () => {
  const packages = [{ id: 'demo', title: 'Demo Package', plans: [] }];

  savePackagesToStorage(packages);

  assert.deepEqual(loadPackagesFromStorage(), packages);
});

test('prefers backend packages when available', () => {
  const storedPackages = [{ id: 'stored', title: 'Stored Package', plans: [] }];
  const backendPackages = [{ id: 'backend', title: 'Backend Package', plans: [] }];
  const fallbackPackages = [{ id: 'fallback', title: 'Fallback Package', plans: [] }];

  assert.deepEqual(
    resolvePackagesForDisplay({ storedPackages, backendPackages, fallbackPackages }),
    backendPackages
  );
});

test('maps the Premium tier to the Premier plan includes', () => {
  const tier = getPlanForTier(defaultPackages, 'Premium');

  assert.ok(tier);
  assert.equal(tier.name, 'Premier');
  assert.deepEqual(tier.includes, [
    'Premium suite category',
    'Private scholar-led historical guidance',
    'Concierge support throughout the journey',
  ]);
});

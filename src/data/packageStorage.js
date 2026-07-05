import { defaultPackages } from './packageData.js';

const PACKAGE_STORAGE_KEY = 'luxury-travel-agency.packages';

export function loadPackagesFromStorage() {
  if (typeof globalThis === 'undefined') {
    return null;
  }

  const storage = globalThis.localStorage;
  if (!storage) {
    return null;
  }

  try {
    const rawValue = storage.getItem(PACKAGE_STORAGE_KEY);
    if (!rawValue) {
      return null;
    }

    const parsedValue = JSON.parse(rawValue);
    return Array.isArray(parsedValue) && parsedValue.length > 0 ? parsedValue : null;
  } catch (error) {
    console.warn('Failed to load saved packages from browser storage:', error);
    return null;
  }
}

export function savePackagesToStorage(packages) {
  if (typeof globalThis === 'undefined') {
    return false;
  }

  const storage = globalThis.localStorage;
  if (!storage) {
    return false;
  }

  try {
    storage.setItem(PACKAGE_STORAGE_KEY, JSON.stringify(packages));
    return true;
  } catch (error) {
    console.warn('Failed to save packages to browser storage:', error);
    return false;
  }
}

export function getPackagesWithFallback(fallbackPackages = defaultPackages) {
  const storedPackages = loadPackagesFromStorage();
  return storedPackages || fallbackPackages;
}

export function getPlanForTier(packages = defaultPackages, tierName = '') {
  const packageList = Array.isArray(packages) ? packages : [];
  const firstPackage = packageList[0];
  const plans = Array.isArray(firstPackage?.plans) ? firstPackage.plans : [];
  const normalizedTierName = String(tierName || '').trim().toLowerCase();

  const aliases = {
    standard: ['standard'],
    plus: ['plus'],
    premium: ['premium', 'premier'],
    premier: ['premier', 'premium'],
  };

  const candidateNames = aliases[normalizedTierName] || [normalizedTierName];
  const matchedPlan = plans.find((plan) =>
    candidateNames.includes(String(plan?.name || '').trim().toLowerCase())
  );

  if (matchedPlan) {
    return matchedPlan;
  }

  const fallbackIndexes = {
    standard: 0,
    plus: 1,
    premium: 2,
    premier: 2,
  };

  return plans[fallbackIndexes[normalizedTierName]] || null;
}

export function getApiBaseUrl() {
  const env = typeof import.meta !== 'undefined' ? import.meta.env : undefined;
  const configuredBaseUrl = env?.VITE_API_URL || env?.VITE_API_BASE_URL;

  if (configuredBaseUrl) {
    return configuredBaseUrl.replace(/\/$/, '');
  }

  if (typeof window !== 'undefined' && window.location) {
    const { protocol, hostname } = window.location;
    const isLocalhost = ['localhost', '127.0.0.1', '[::1]'].includes(hostname) || hostname.endsWith('.local');
    if (isLocalhost) {
      return `${protocol}//localhost:8000`;
    }
  }

  return '';
}

export function getPackagesApiUrl(path = '/packages') {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${path}`;
}

export function resolvePackagesForDisplay({
  storedPackages = loadPackagesFromStorage(),
  backendPackages = null,
  fallbackPackages = defaultPackages,
} = {}) {
  const normalizedBackendPackages = Array.isArray(backendPackages) && backendPackages.length > 0 ? backendPackages : null;
  if (normalizedBackendPackages) {
    return normalizedBackendPackages;
  }

  const normalizedStoredPackages = Array.isArray(storedPackages) && storedPackages.length > 0 ? storedPackages : null;
  if (normalizedStoredPackages) {
    return normalizedStoredPackages;
  }

  return fallbackPackages;
}

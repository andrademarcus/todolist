import '@testing-library/jest-dom';

// Stable crypto.randomUUID for tests
Object.defineProperty(global, 'crypto', {
    value: { randomUUID: () => 'test-uuid' }
});

// Simple localStorage mock (JSDOM has one, but this is explicit & resettable)
let store: Record<string, string> = {};
beforeEach(() => { store = {}; });
Object.defineProperty(window, 'localStorage', {
    value: {
        getItem: (k: string) => store[k] ?? null,
        setItem: (k: string, v: string) => { store[k] = String(v); },
        removeItem: (k: string) => { delete store[k]; },
        clear: () => { store = {}; }
    }
});
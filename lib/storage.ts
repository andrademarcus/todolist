const STORAGE_KEY = "todo-list";

export type Persisted<T> = T;

export function load<T>(key = STORAGE_KEY): Persisted<T[]> {
    if (typeof window === "undefined") return [];
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T[]) : [];
    } catch {
        return [];
    }
}

export function save<T>(data: Persisted<T[]>, key = STORAGE_KEY) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
}
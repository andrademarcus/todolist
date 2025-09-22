import { useEffect, useMemo, useState } from "react";
import { load, save } from "@/lib/storage";

export type Todo = {
    id: string;
    text: string;
    completed: boolean;
    createdAt: number;
    completedAt?: number | null;
};

/**
 * normalize raw data (e.g. from localStorage) into a valid Todo[].
 */
function normalize(raw: unknown): Todo[] {
    if (!Array.isArray(raw)) return [];
    return raw.map((t: any) => ({
        id: String(t.id),
        text: String(t.text ?? ""),
        completed: Boolean(t.completed),
        createdAt: Number(t.createdAt) || Date.now(),
        completedAt: t.completed && t.completedAt ? Number(t.completedAt) : null,
    }));
}

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    // load once
    useEffect(() => {
        setTodos(normalize(load<Todo>()));
    }, []);

    // persist
    useEffect(() => {
        save<Todo>(todos);
    }, [todos]);

    const sorted = useMemo(() => {
        const active = todos
            .filter(t => !t.completed)
            .sort((a,b)=>b.createdAt-a.createdAt);
        const done = todos
            .filter(t => t.completed)
            .sort((a,b)=>(b.completedAt??0)-(a.completedAt??0));
        return [...active, ...done];
    }, [todos]);

    function addTask(text: string) {
        const trimmed = text.trim();
        if (!trimmed) return;
        setTodos(prev => [
            {
                id: crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`,
                text: trimmed,
                completed: false,
                createdAt: Date.now(),
                completedAt: null,
            },
            ...prev,
        ]);
    }

    function toggle(id: string) {
        setTodos(prev =>
            prev.map(t =>
                t.id === id
                    ? { ...t, completed: !t.completed, completedAt: !t.completed ? Date.now() : null }
                    : t
            )
        );
    }

    function removeTask(id: string) {
        setTodos(prev => prev.filter(t => t.id !== id));
    }

    return { todos, sorted, addTask, toggle, removeTask };
}
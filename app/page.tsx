"use client";

import { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { useTodos } from "@/hooks/useTodos";

export default function Home() {
    const { sorted, addTask, toggle, removeTask } = useTodos();
    const [text, setText] = useState("");

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        addTask(text);
        setText("");
    }

    return (
        <div className="flex justify-center p-10 min-h-screen">
            <main className="flex flex-col items-center gap-8 w-full max-w-[500px]">
                <h1 className="text-3xl font-bold mt-6">To-Do List</h1>

                <form onSubmit={onSubmit} className="mb-2 w-full flex gap-2">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Add a new task…"
                        className="border rounded"
                    />
                    <button
                        type="submit"
                        disabled={!text.trim()}
                    >
                        Add
                    </button>
                </form>

                <ul className="w-full">
                    {sorted.length === 0 && <li className="py-4 text-neutral-500">No tasks yet. Add one above.</li>}
                    {sorted.map((t) => (
                        <TodoItem key={t.id} todo={t} onToggle={toggle} onDelete={removeTask} />
                    ))}
                </ul>
            </main>
        </div>
    );
}
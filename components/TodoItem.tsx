"use client";
import type { Todo } from "@/hooks/useTodos";

type Props = {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
};

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
    return (
        <li className="flex items-center gap-3 border-b border-gray-200">
            <input
                id={`cb-${todo.id}`}
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
                className="h-5 w-5 cursor-pointer"
            />
            <label htmlFor={`cb-${todo.id}`} className="flex-1 cursor-pointer">
                <div className={`text-base ${todo.completed ? "line-through text-neutral-500" : ""}`}>
                    {todo.text}
                </div>
                <div className="text-xs text-neutral-400">
                    created {new Date(todo.createdAt).toLocaleString()}
                    {todo.completed && todo.completedAt && (
                        <> completed {new Date(todo.completedAt).toLocaleString()}</>
                    )}
                </div>
            </label>
            <button
                onClick={() => onDelete(todo.id)}
                className="text-sm px-2 py-1 rounded border border-neutral-300 hover:bg-neutral-100"
            >
                Delete
            </button>
        </li>
    );
}
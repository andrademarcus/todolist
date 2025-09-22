import { renderHook, act } from '@testing-library/react';
import { useTodos } from '@/hooks/useTodos';

describe('useTodos', () => {
    test('loads empty by default & persists on change', () => {
        const { result } = renderHook(() => useTodos());
        expect(result.current.sorted).toEqual([]);

        act(() => result.current.addTask('Task A'));
        expect(result.current.sorted[0].text).toBe('Task A');

        const saved = JSON.parse(window.localStorage.getItem('todo-list') || '[]');
        expect(saved.length).toBe(1);
        expect(saved[0].text).toBe('Task A');
    });


    test('remove deletes item', () => {
        const { result } = renderHook(() => useTodos());
        act(() => result.current.addTask('X'));
        const id = result.current.sorted[0].id;
        act(() => result.current.removeTask(id));
        expect(result.current.sorted).toHaveLength(0);
    });
});
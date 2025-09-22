import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

test('add / complete / delete from page', () => {
    render(<Home />);

    const input = screen.getByPlaceholderText(/add a new task/i);
    const addBtn = screen.getByRole('button', { name: /add/i });

    fireEvent.change(input, { target: { value: 'Task 1' } });
    fireEvent.click(addBtn);
    expect(screen.getByText('Task 1')).toBeInTheDocument();

    const cb = screen.getByRole('checkbox');
    fireEvent.click(cb);
    expect(cb).toBeChecked();

    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
});
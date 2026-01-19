'use client';

import { useState } from 'react';
import { addTodo } from '@/app/actions/todos';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

export function TodoForm() {
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!task.trim()) return;

    setLoading(true);
    const result = await addTodo(task);
    setLoading(false);

    if (result.success) {
      setTask('');
      toast.success('Todo added!');
    } else {
      toast.error('error' in result ? result.error : 'Failed to add todo');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="What needs to be done?"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        disabled={loading}
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add'}
      </Button>
    </form>
  );
}


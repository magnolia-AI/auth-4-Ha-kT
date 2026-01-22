'use client';

import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { toggleTodo, deleteTodo } from '@/app/actions/todos';
import { toast } from 'sonner';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TodoItemProps {
  todo: {
    id: number;
    task: string;
    completed: boolean;
  };
}

export function TodoItem({ todo }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleToggle(checked: boolean) {
    const result = await toggleTodo(todo.id, checked);
    if (!result.success) {
      toast.error('error' in result ? result.error : 'Failed to update');
    }
  }

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteTodo(todo.id);
    if (!result.success) {
      toast.error('error' in result ? result.error : 'Failed to delete');
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-card hover:shadow-sm transition-all group">
      <div className="flex items-center gap-3">
        <Checkbox 
          id={`todo-${todo.id}`} 
          checked={todo.completed} 
          onCheckedChange={handleToggle}
        />
        <label 
          htmlFor={`todo-${todo.id}`}
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            todo.completed && "line-through text-muted-foreground"
          )}
        >
          {todo.task}
        </label>
      </div>
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={handleDelete}
        disabled={isDeleting}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}


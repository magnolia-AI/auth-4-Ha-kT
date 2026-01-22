'use server';

import db from '@/lib/db';
import { todos } from '@/lib/schema';
import { authServer } from '@/lib/auth/server';
import { eq, and } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

export type ActionResult<T = any> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};

async function getUserId() {
  const session = await authServer.getSession();
  if (session.error || !session.data?.user?.id) {
    throw new Error('Unauthorized');
  }
  return session.data.user.id;
}

export async function getTodos(): Promise<ActionResult<any[]>> {
  try {
    const userId = await getUserId();
    const data = await db.select().from(todos).where(eq(todos.userId, userId));
    return { success: true, data };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to fetch todos' };
  }
}

export async function addTodo(task: string): Promise<ActionResult> {
  try {
    const userId = await getUserId();
    if (!task.trim()) return { success: false, error: 'Task cannot be empty' };

    await db.insert(todos).values({
      userId,
      task: task.trim(),
    });

    revalidatePath('/todos');
    return { success: true, data: null };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to add todo' };
  }
}

export async function toggleTodo(id: number, completed: boolean): Promise<ActionResult> {
  try {
    const userId = await getUserId();
    await db.update(todos)
      .set({ completed, updatedAt: new Date() })
      .where(and(eq(todos.id, id), eq(todos.userId, userId)));

    revalidatePath('/todos');
    return { success: true, data: null };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to update todo' };
  }
}

export async function deleteTodo(id: number): Promise<ActionResult> {
  try {
    const userId = await getUserId();
    await db.delete(todos)
      .where(and(eq(todos.id, id), eq(todos.userId, userId)));

    revalidatePath('/todos');
    return { success: true, data: null };
  } catch (error: any) {
    return { success: false, error: error.message || 'Failed to delete todo' };
  }
}


import { authServer } from '@/lib/auth/server';
import { redirect } from 'next/navigation';
import { getTodos } from '@/app/actions/todos';
import { TodoForm } from '@/components/todo-form';
import { TodoItem } from '@/components/todo-item';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default async function TodosPage() {
  const session = await authServer.getSession();

  if (session.error || !session.data?.user) {
    redirect('/auth/sign-in');
  }

  const result = await getTodos();
  const todos = result.success ? result.data : [];

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">My Todos</CardTitle>
          <p className="text-center text-muted-foreground">
            Welcome back, {session.data.user.name}
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <TodoForm />
          
          <div className="space-y-3">
            {todos.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground border-2 border-dashed rounded-lg">
                No todos yet. Add one above!
              </div>
            ) : (
              todos
                .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                .map((todo) => (
                  <TodoItem key={todo.id} todo={todo} />
                ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


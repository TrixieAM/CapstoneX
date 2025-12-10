import { useState } from 'react';
import { useAtom } from 'jotai';
import { tasksAtom } from '@/store';
import { Plus, Check, Trash2, Circle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TaskList() {
  const [tasks, setTasks] = useAtom(tasksAtom);
  const [newTask, setNewTask] = useState('');

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), text: newTask, completed: false }
    ]);
    setNewTask('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => 
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-5 flex flex-col h-full"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium tracking-tight">Tasks</h2>
        <span className="text-xs font-mono bg-primary/10 text-primary px-2 py-0.5 rounded-full">
          {tasks.filter(t => t.completed).length}/{tasks.length}
        </span>
      </div>

      <form onSubmit={addTask} className="relative mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="pr-10 bg-white/50 dark:bg-black/20 border-transparent focus:bg-white dark:focus:bg-black/40 transition-all shadow-sm"
        />
        <Button 
          type="submit" 
          size="icon" 
          variant="ghost" 
          className="absolute right-1 top-1 h-7 w-7 text-muted-foreground hover:text-primary"
        >
          <Plus className="w-4 h-4" />
        </Button>
      </form>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="space-y-2">
          <AnimatePresence mode="popLayout">
            {tasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className={cn(
                  "group flex items-center gap-3 p-3 rounded-xl border transition-all hover:shadow-sm",
                  task.completed 
                    ? "bg-muted/30 border-transparent opacity-60" 
                    : "bg-white/60 dark:bg-white/5 border-white/20 hover:border-primary/20 hover:bg-white/80 dark:hover:bg-white/10"
                )}
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className={cn(
                    "flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors",
                    task.completed
                      ? "bg-primary border-primary text-primary-foreground"
                      : "border-muted-foreground/40 hover:border-primary text-transparent"
                  )}
                >
                  <Check className="w-3 h-3" strokeWidth={3} />
                </button>
                <span className={cn(
                  "flex-1 text-sm transition-all",
                  task.completed && "line-through text-muted-foreground"
                )}>
                  {task.text}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {tasks.length === 0 && (
            <div className="text-center py-8 text-muted-foreground/50">
              <p className="text-sm">No tasks yet.</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </motion.div>
  );
}

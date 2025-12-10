import { useAtom } from 'jotai';
import { notesAtom } from '@/store';
import { motion } from 'framer-motion';

export function Notepad() {
  const [notes, setNotes] = useAtom(notesAtom);

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-1 flex flex-col h-full overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="bg-white/40 dark:bg-black/20 rounded-xl flex-1 flex flex-col relative">
        <div className="absolute top-0 left-0 right-0 h-8 flex items-center px-4 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-white/5 rounded-t-xl z-10">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
          </div>
          <span className="mx-auto text-xs font-mono text-muted-foreground/70">notes.md</span>
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="flex-1 w-full resize-none bg-transparent p-6 pt-12 text-sm font-mono leading-relaxed focus:outline-none text-foreground/80 placeholder:text-muted-foreground/30"
          spellCheck={false}
          placeholder="Start typing..."
        />
      </div>
    </motion.div>
  );
}

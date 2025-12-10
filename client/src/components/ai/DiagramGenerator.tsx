import { useState } from 'react';
import { useAtom } from 'jotai';
import { diagramPromptAtom, diagramResultAtom } from '@/store';
import { Network, GitGraph, FileImage, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function DiagramGenerator() {
  const [prompt, setPrompt] = useAtom(diagramPromptAtom);
  const [result, setResult] = useAtom(diagramResultAtom);
  const [loading, setLoading] = useState(false);

  const generateDiagram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    
    // Simulate diagram generation
    setTimeout(() => {
      setResult("generated");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="space-y-2 text-center py-4 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
        <div className="flex justify-center gap-4 text-muted-foreground">
           <div className="flex flex-col items-center gap-1">
             <div className="p-2 bg-background rounded-full shadow-sm"><Network className="w-4 h-4" /></div>
             <span className="text-[10px]">ERD</span>
           </div>
           <div className="flex flex-col items-center gap-1">
             <div className="p-2 bg-background rounded-full shadow-sm"><GitGraph className="w-4 h-4" /></div>
             <span className="text-[10px]">Flow</span>
           </div>
           <div className="flex flex-col items-center gap-1">
             <div className="p-2 bg-background rounded-full shadow-sm"><FileImage className="w-4 h-4" /></div>
             <span className="text-[10px]">UML</span>
           </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Generate diagrams from text descriptions</p>
      </div>

      <form onSubmit={generateDiagram} className="flex gap-2">
        <Input 
          placeholder="e.g. User login flow with database check..." 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="text-xs"
        />
        <Button size="icon" type="submit" disabled={loading}>
          <Network className={`w-4 h-4 ${loading ? 'animate-pulse' : ''}`} />
        </Button>
      </form>

      <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-lg border border-border flex items-center justify-center overflow-hidden relative">
        {result ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full h-full p-4 flex flex-col items-center justify-center"
          >
            {/* Mock Diagram Visualization */}
            <div className="flex items-center gap-4 mb-8">
               <div className="w-16 h-10 border-2 border-primary rounded-md flex items-center justify-center text-[10px] font-bold bg-background shadow-sm">Start</div>
               <div className="w-8 h-0.5 bg-muted-foreground" />
               <div className="w-16 h-16 border-2 border-orange-400 rotate-45 flex items-center justify-center bg-background shadow-sm">
                 <span className="-rotate-45 text-[10px] font-bold">Check</span>
               </div>
               <div className="w-8 h-0.5 bg-muted-foreground" />
               <div className="w-16 h-10 border-2 border-green-500 rounded-md flex items-center justify-center text-[10px] font-bold bg-background shadow-sm">End</div>
            </div>
            
            <Button variant="secondary" size="sm" className="absolute bottom-4 right-4">
              <Download className="w-3 h-3 mr-2" /> Export
            </Button>
          </motion.div>
        ) : (
          <p className="text-xs text-muted-foreground/50">Diagram preview area</p>
        )}
      </div>
    </div>
  );
}

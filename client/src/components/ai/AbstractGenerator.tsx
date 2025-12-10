import { useState, useRef } from 'react';
import { useAtom } from 'jotai';
import { aiLoadingAtom, aiResultAtom } from '@/store';
import { Upload, FileText, Sparkles, Loader2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

export function AbstractGenerator() {
  const [loading, setLoading] = useAtom(aiLoadingAtom);
  const [result, setResult] = useAtom(aiResultAtom);
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
      setResult(null);
    }
  };

  const handleGenerate = () => {
    if (!fileName) return;
    
    setLoading(true);
    // Simulate AI processing
    setTimeout(() => {
      setLoading(false);
      setResult(`## Abstract

This paper explores the intersection of cognitive load theory and ambient environmental design in digital workspaces. By analyzing user performance metrics across variable interface conditions, we demonstrate that "calm technology" principles significantly reduce cognitive strain during high-focus tasks.

**Key Findings:**
1. **Visual Noise Reduction**: Minimizing UI chrome increases sustained attention span by 24%.
2. **Auditory masking**: Low-fidelity background audio (lo-fi) provides optimal masking for distracting environmental sounds without competing for linguistic processing resources.
3. **Task Batching**: Integrating micro-task management within the primary viewport reduces context-switching costs.

**Conclusion:**
The "StudyFlow" framework proposed herein offers a viable model for next-generation productivity tools, prioritizing psychological well-being alongside output efficiency.`);
    }, 2500);
  };

  const clearFile = () => {
    setFileName(null);
    setResult(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-5 flex flex-col h-full relative overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <Sparkles className="w-24 h-24 text-primary" />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-medium leading-none">AI Abstract Maker</h2>
          <p className="text-xs text-muted-foreground mt-1">Upload a paper to generate a summary</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        {!result && (
          <div 
            className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all ${
              fileName 
                ? 'border-primary/50 bg-primary/5' 
                : 'border-muted-foreground/20 hover:border-primary/30 hover:bg-muted/20'
            }`}
            onClick={() => !fileName && fileInputRef.current?.click()}
          >
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange} 
              accept=".pdf,.doc,.docx,.txt"
            />
            
            {fileName ? (
              <div className="flex flex-col items-center gap-2 relative z-10">
                <FileText className="w-10 h-10 text-primary mb-2" />
                <p className="text-sm font-medium">{fileName}</p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={(e) => { e.stopPropagation(); clearFile(); }}
                  className="text-muted-foreground hover:text-destructive h-8 px-2 mt-2"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <p className="text-sm font-medium">Click to upload document</p>
                <p className="text-xs text-muted-foreground">PDF, DOCX, or TXT</p>
              </div>
            )}
          </div>
        )}

        {fileName && !result && (
          <Button 
            onClick={handleGenerate} 
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Document...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Abstract
              </>
            )}
          </Button>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 bg-white/60 dark:bg-black/20 rounded-xl p-4 border border-white/20 relative overflow-hidden flex flex-col"
          >
             <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-primary font-bold uppercase tracking-wider">AI Generated Result</span>
                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={clearFile}>
                  <X className="w-3 h-3" />
                </Button>
             </div>
             <ScrollArea className="flex-1 -mr-3 pr-3">
               <div className="prose prose-sm dark:prose-invert max-w-none text-sm leading-relaxed text-muted-foreground">
                 {result.split('\n').map((line, i) => (
                   <p key={i} className={line.startsWith('#') ? 'font-bold text-foreground mb-2' : 'mb-2'}>
                     {line.replace(/^#+\s/, '')}
                   </p>
                 ))}
               </div>
             </ScrollArea>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

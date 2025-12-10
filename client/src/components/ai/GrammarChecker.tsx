import { useState } from 'react';
import { useAtom } from 'jotai';
import { grammarTextAtom, grammarResultAtom } from '@/store';
import { Wand2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function GrammarChecker() {
  const [text, setText] = useAtom(grammarTextAtom);
  const [result, setResult] = useAtom(grammarResultAtom);
  const [checking, setChecking] = useState(false);

  const checkGrammar = () => {
    if (!text.trim()) return;
    setChecking(true);
    // Simulate API call
    setTimeout(() => {
      setChecking(false);
      setResult("Consider rephrasing 'very good' to 'excellent' for stronger impact. The sentence structure in the second paragraph is slightly passive.");
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative flex-1 min-h-[150px]">
        <Textarea 
          placeholder="Paste text here to check grammar..."
          className="h-full resize-none bg-white/50 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 transition-all"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button 
          size="sm"
          className="absolute bottom-3 right-3 bg-primary text-primary-foreground shadow-lg"
          onClick={checkGrammar}
          disabled={checking || !text}
        >
          {checking ? <Wand2 className="w-3 h-3 animate-spin mr-2" /> : <Wand2 className="w-3 h-3 mr-2" />}
          Check
        </Button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-3"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed">{result}</p>
          </div>
        </motion.div>
      )}
      
      {!result && !checking && text.length > 0 && (
         <div className="text-center p-4 text-muted-foreground/40 text-xs">
           <p>AI will analyze clarity and tone</p>
         </div>
      )}
    </div>
  );
}

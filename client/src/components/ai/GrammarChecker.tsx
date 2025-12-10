import { useState } from 'react';
import { useAtom } from 'jotai';
import { grammarTextAtom, grammarResultAtom } from '@/store';
import { Wand2, CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function GrammarChecker() {
  const [text, setText] = useAtom(grammarTextAtom);
  const [result, setResult] = useAtom(grammarResultAtom);
  const [checking, setChecking] = useState(false);
  const [copied, setCopied] = useState(false);

  const checkGrammar = () => {
    if (!text.trim()) return;
    setChecking(true);
    // Simulate API call
    setTimeout(() => {
      setChecking(false);
      // More realistic simulation
      if (text.length < 20) {
        setResult("The sentence is quite short. Consider expanding it for better context.");
      } else {
         setResult("Consider rephrasing 'very good' to 'excellent' for stronger impact. The sentence structure in the second paragraph is slightly passive. \n\nSuggested revision: 'The results were excellent.'");
      }
    }, 1500);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative flex-1 min-h-[150px]">
        <Textarea 
          placeholder="Paste text here to check grammar..."
          className="h-full resize-none bg-white/50 dark:bg-black/20 focus:bg-white dark:focus:bg-black/40 transition-all pr-12"
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
          className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-900/50 rounded-lg p-3 relative group"
        >
          <div className="flex items-start gap-2 pr-6">
            <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
            <p className="text-xs text-orange-800 dark:text-orange-200 leading-relaxed whitespace-pre-wrap">{result}</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 text-orange-700/50 hover:text-orange-700 hover:bg-orange-100/50"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </Button>
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

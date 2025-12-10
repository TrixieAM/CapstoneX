import { useState } from 'react';
import { useAtom } from 'jotai';
import { codeSnippetAtom, codeResultAtom } from '@/store';
import { Code, Terminal, Play, Bug, Database, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function CodeAssistant() {
  const [snippet, setSnippet] = useAtom(codeSnippetAtom);
  const [result, setResult] = useAtom(codeResultAtom);
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'generate' | 'debug' | 'sql'>('generate');
  const [copied, setCopied] = useState(false);

  const handleAction = () => {
    if (!snippet.trim()) return;
    setLoading(true);
    
    setTimeout(() => {
      let output = "";
      if (mode === 'generate') {
        output = `// Generated React Component based on request
import React from 'react';

export function ${snippet.split(' ')[0] || 'Component'}() {
  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h2 className="text-lg font-bold">Dynamic Component</h2>
      <p>This is a generated component structure.</p>
    </div>
  );
}`;
      } else if (mode === 'debug') {
        output = `// Debug Analysis
// 1. Potential null pointer exception at line 14
// 2. Missing dependency in useEffect hook
// 3. Consider memoizing the callback function

const fixedCode = () => {
  // ... optimized implementation
};`;
      } else {
        output = `-- Generated SQL Schema
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT NOT NULL
);`;
      }
      setResult(output);
      setLoading(false);
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
      <div className="flex gap-2 mb-1">
        <Button 
          variant={mode === 'generate' ? 'default' : 'outline'} 
          size="xs" 
          onClick={() => setMode('generate')}
          className="h-7 text-[10px]"
        >
          <Code className="w-3 h-3 mr-1" /> Generate
        </Button>
        <Button 
          variant={mode === 'debug' ? 'default' : 'outline'} 
          size="xs" 
          onClick={() => setMode('debug')}
          className="h-7 text-[10px]"
        >
          <Bug className="w-3 h-3 mr-1" /> Debug
        </Button>
        <Button 
          variant={mode === 'sql' ? 'default' : 'outline'} 
          size="xs" 
          onClick={() => setMode('sql')}
          className="h-7 text-[10px]"
        >
          <Database className="w-3 h-3 mr-1" /> SQL
        </Button>
      </div>

      <div className="relative flex-1 min-h-[120px]">
        <Textarea 
          placeholder={mode === 'generate' ? "Describe component..." : mode === 'debug' ? "Paste code to debug..." : "Describe data structure..."}
          className="h-full resize-none font-mono text-xs bg-white/50 dark:bg-black/20"
          value={snippet}
          onChange={(e) => setSnippet(e.target.value)}
        />
      </div>

      <Button onClick={handleAction} disabled={loading || !snippet} className="w-full">
        {loading ? <Terminal className="w-3 h-3 mr-2 animate-spin" /> : <Play className="w-3 h-3 mr-2" />}
        Run Assistant
      </Button>

      {result && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-zinc-950 text-zinc-50 rounded-lg p-3 overflow-hidden border border-zinc-800 relative group"
        >
          <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
            <span className="text-[10px] font-mono text-zinc-400">OUTPUT</span>
            <div className="flex gap-1">
              <Button 
                 variant="ghost" 
                 size="icon" 
                 className="h-4 w-4 text-zinc-400 hover:text-white"
                 onClick={copyToClipboard}
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              </Button>
              <Button variant="ghost" size="icon" className="h-4 w-4 text-zinc-400 hover:text-white" onClick={() => setResult(null)}>
                <span className="sr-only">Clear</span>
                &times;
              </Button>
            </div>
          </div>
          <ScrollArea className="h-[150px]">
            <pre className="font-mono text-[10px] leading-relaxed">
              <code>{result}</code>
            </pre>
          </ScrollArea>
        </motion.div>
      )}
    </div>
  );
}

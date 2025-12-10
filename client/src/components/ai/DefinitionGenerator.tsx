import { useState } from 'react';
import { useAtom } from 'jotai';
import { definitionWordAtom, definitionResultAtom } from '@/store';
import { BookOpen, Volume2, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function DefinitionGenerator() {
  const [word, setWord] = useAtom(definitionWordAtom);
  const [def, setDef] = useAtom(definitionResultAtom);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDefine = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;
    setLoading(true);
    setDef(null);
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();

      if (Array.isArray(data) && data.length > 0) {
        const entry = data[0];
        const meaning = entry.meanings[0];
        
        setDef({
          word: entry.word,
          phonetic: entry.phonetic || entry.phonetics[0]?.text || '',
          partOfSpeech: meaning.partOfSpeech,
          definition: meaning.definitions[0].definition,
          example: meaning.definitions[0].example || 'No example available.'
        });
      } else {
        setDef(null);
      }
    } catch (err) {
      console.error("Dictionary API Error", err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (def) {
      const text = `${def.word} (${def.partOfSpeech}): ${def.definition}`;
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <form onSubmit={handleDefine} className="relative">
        <Input 
          placeholder="Define a term..." 
          value={word}
          onChange={(e) => setWord(e.target.value)}
          className="pr-10"
        />
        <Button 
          size="icon" 
          variant="ghost" 
          type="submit"
          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-primary"
        >
          <BookOpen className="w-4 h-4" />
        </Button>
      </form>

      <div className="flex-1">
        {loading ? (
          <div className="flex items-center gap-2 text-muted-foreground text-xs animate-pulse p-2">
            <div className="w-2 h-2 rounded-full bg-primary" /> Looking up...
          </div>
        ) : def ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/60 dark:bg-black/20 rounded-xl p-4 border border-white/20 relative group"
          >
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="text-xl font-serif font-medium">{def.word}</h3>
              <span className="text-sm font-mono text-muted-foreground">{def.phonetic}</span>
            </div>
            <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded mb-3">
              {def.partOfSpeech}
            </span>
            <p className="text-sm leading-relaxed text-foreground/90 mb-3">
              {def.definition}
            </p>
            <div className="pl-3 border-l-2 border-primary/20">
              <p className="text-xs text-muted-foreground italic">"{def.example}"</p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
            </Button>
          </motion.div>
        ) : (
          <div className="text-center py-10 text-muted-foreground/40">
             <p className="text-xs">Enter a word to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

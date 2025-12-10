import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchQueryAtom, searchResultsAtom } from '@/store';
import { Search, ExternalLink, BookOpen, GraduationCap } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function SearchEngine() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [results, setResults] = useAtom(searchResultsAtom); // We'll use this for history or simulated local results
  
  const performSearch = (engine: 'google' | 'scholar' | 'wolfram') => {
    if (!query.trim()) return;
    
    let url = '';
    switch(engine) {
      case 'google':
        url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'scholar':
        url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`;
        break;
      case 'wolfram':
        url = `https://www.wolframalpha.com/input?i=${encodeURIComponent(query)}`;
        break;
    }
    
    window.open(url, '_blank');
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="relative">
        <Input 
          placeholder="Enter research topic..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
          onKeyDown={(e) => {
            if (e.key === 'Enter') performSearch('google');
          }}
        />
        <Button 
          size="icon" 
          variant="ghost" 
          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-primary"
          onClick={() => performSearch('google')}
        >
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => performSearch('scholar')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Google Scholar</h3>
              <p className="text-xs text-muted-foreground">Best for academic papers & citations</p>
            </div>
            <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => performSearch('google')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">Web Search</h3>
              <p className="text-xs text-muted-foreground">General articles & documentation</p>
            </div>
            <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
        </div>

        <div className="p-4 rounded-xl border border-border bg-white/50 dark:bg-white/5 hover:bg-white/80 dark:hover:bg-white/10 transition-colors cursor-pointer group" onClick={() => performSearch('wolfram')}>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium">WolframAlpha</h3>
              <p className="text-xs text-muted-foreground">Computational knowledge & data</p>
            </div>
            <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-50 transition-opacity" />
          </div>
        </div>
      </div>

      <div className="mt-auto p-4 bg-muted/20 rounded-lg text-xs text-muted-foreground text-center">
        <p>Pro Tip: Use Google Scholar for peer-reviewed sources for your Chapter 2 (Literature Review).</p>
      </div>
    </div>
  );
}

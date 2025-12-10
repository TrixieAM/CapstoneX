import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchQueryAtom, searchResultsAtom } from '@/store';
import { Search, ExternalLink, ArrowRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion } from 'framer-motion';

export function SearchEngine() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [results, setResults] = useAtom(searchResultsAtom);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    
    // Simulate Search Results
    setTimeout(() => {
      setResults([
        { title: `Introduction to ${query}`, snippet: `Comprehensive guide covering the basics of ${query} and its applications in modern fields...`, source: 'Academic Journal' },
        { title: `History of ${query}`, snippet: `Tracing the origins from early concepts to current state-of-the-art developments...`, source: 'Wiki Scholar' },
        { title: `Recent Developments in ${query}`, snippet: `New findings suggest a paradigm shift in how we approach ${query}...`, source: 'Science Today' },
      ]);
      setSearching(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <form onSubmit={handleSearch} className="relative">
        <Input 
          placeholder="Search academic sources..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-10"
        />
        <Button 
          size="icon" 
          variant="ghost" 
          type="submit"
          className="absolute right-0 top-0 h-full w-10 text-muted-foreground hover:text-primary"
        >
          <Search className="w-4 h-4" />
        </Button>
      </form>

      <ScrollArea className="flex-1 -mr-3 pr-3">
        <div className="space-y-3">
          {searching ? (
             <div className="space-y-3">
               {[1,2,3].map(i => (
                 <div key={i} className="space-y-2 animate-pulse">
                   <div className="h-4 bg-muted rounded w-3/4" />
                   <div className="h-3 bg-muted/50 rounded w-full" />
                   <div className="h-3 bg-muted/50 rounded w-5/6" />
                 </div>
               ))}
             </div>
          ) : results.length > 0 ? (
            results.map((res, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group p-3 rounded-lg border border-transparent hover:border-border hover:bg-white/50 dark:hover:bg-white/5 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-primary group-hover:underline decoration-primary/30 underline-offset-2">{res.title}</h3>
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-50" />
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 mb-1.5">{res.snippet}</p>
                <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground/70 bg-muted/50 px-1.5 py-0.5 rounded">{res.source}</span>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 text-muted-foreground/40">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
              <p className="text-xs">Enter a topic to search</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}

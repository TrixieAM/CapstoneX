import { useState } from 'react';
import { useAtom } from 'jotai';
import { searchQueryAtom } from '@/store';
import { Search, ExternalLink, Globe, BookOpen, GraduationCap, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';

export function SearchEngine() {
  const [query, setQuery] = useAtom(searchQueryAtom);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Mock search function to simulate "In-App" results
  // In a real app, this would hit a backend proxy that scrapes/fetches Google Custom Search API
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setLoading(true);
    setHasSearched(true);
    
    setTimeout(() => {
      setResults([
        { 
          id: 1,
          type: 'academic',
          title: `Introduction to ${query}: A Comprehensive Review`,
          url: 'https://scholar.google.com',
          snippet: `This paper explores the fundamental concepts of ${query}, analyzing its impact on modern systems. We propose a new framework for understanding...`,
          source: 'Journal of Computing',
          year: '2024'
        },
        { 
          id: 2,
          type: 'web',
          title: `${query} - Official Documentation`,
          url: 'https://devdocs.io',
          snippet: `The official guide and API reference for ${query}. Learn how to implement, debug, and optimize your applications using standard patterns.`,
          source: 'DevDocs',
          year: '2023'
        },
        { 
          id: 3,
          type: 'academic',
          title: `Analysis of ${query} in Enterprise Environments`,
          url: 'https://researchgate.net',
          snippet: `A case study on the deployment of ${query} across large-scale organizations. Key findings include improved efficiency and reduced latency...`,
          source: 'IEEE Xplore',
          year: '2023'
        },
        { 
          id: 4,
          type: 'web',
          title: `Best Practices for ${query}`,
          url: 'https://medium.com',
          snippet: `Top 10 tips for mastering ${query}. From basic setup to advanced configuration, this guide covers everything you need to know.`,
          source: 'TechBlog',
          year: '2024'
        },
      ]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <form onSubmit={handleSearch} className="relative flex-shrink-0">
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
        {loading ? (
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse space-y-2">
                <div className="h-4 bg-muted/50 rounded w-3/4" />
                <div className="h-3 bg-muted/30 rounded w-full" />
                <div className="h-3 bg-muted/30 rounded w-5/6" />
              </div>
            ))}
          </div>
        ) : hasSearched ? (
          <div className="space-y-3 pb-4">
            {results.map((res, i) => (
              <motion.div 
                key={res.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/50 dark:bg-white/5 border border-border p-3 rounded-xl hover:border-primary/30 transition-all group"
              >
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div className="flex items-center gap-2">
                    {res.type === 'academic' ? (
                      <GraduationCap className="w-3.5 h-3.5 text-blue-500" />
                    ) : (
                      <Globe className="w-3.5 h-3.5 text-green-500" />
                    )}
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">{res.source} • {res.year}</span>
                  </div>
                  <a 
                    href={res.url} 
                    target="_blank" 
                    rel="noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded text-muted-foreground hover:text-primary"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
                
                <h3 className="text-sm font-semibold text-foreground leading-tight mb-1.5 hover:text-primary cursor-pointer" onClick={() => window.open(res.url, '_blank')}>
                  {res.title}
                </h3>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {res.snippet}
                </p>
                
                <Button 
                  variant="link" 
                  className="h-auto p-0 text-[10px] mt-2 text-primary/80 hover:text-primary"
                  onClick={() => window.open(res.url, '_blank')}
                >
                  Visit Source <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                </Button>
              </motion.div>
            ))}
            
            <div className="pt-4 text-center">
              <Button variant="outline" size="sm" className="text-xs" onClick={() => window.open(`https://www.google.com/search?q=${query}`, '_blank')}>
                View more results on Google
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-10 text-muted-foreground/40">
            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
            <p className="text-xs">Enter a topic to search simulated databases</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

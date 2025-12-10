import { useState } from 'react';
import { useAtom } from 'jotai';
import { referenceTypeAtom, referenceResultAtom } from '@/store';
import { Book, Copy, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { motion } from 'framer-motion';

export function ReferenceGenerator() {
  const [type, setType] = useAtom(referenceTypeAtom);
  const [result, setResult] = useAtom(referenceResultAtom);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    author: '',
    year: '',
    title: '',
    source: '',
    url: ''
  });

  const generateReference = () => {
    let ref = '';
    const { author, year, title, source, url } = formData;
    
    // Real formatting logic
    const formatAuthors = (auth: string, style: string) => {
      if (!auth) return '';
      // Simple heuristic for "First Last" -> "Last, F."
      const names = auth.split(' and ').map(n => n.trim());
      if (style === 'APA') {
        return names.map(n => {
          const parts = n.split(' ');
          const last = parts.pop();
          const first = parts[0];
          return `${last}, ${first?.[0]}.`;
        }).join(', ');
      }
      return auth; 
    };

    if (type === 'APA') {
      // APA 7: Author, A. A. (Year). Title of work. Source. URL
      ref = `${formatAuthors(author, 'APA') || 'Author'} (${year || 'n.d.'}). ${title || 'Title'}. ${source ? `${source}.` : ''}${url ? ` ${url}` : ''}`;
    } else if (type === 'MLA') {
      // MLA 9: Author. "Title." Source, Year, URL.
      ref = `${author || 'Author'}. "${title || 'Title'}." ${source ? `${source}, ` : ''}${year || 'no date'}${url ? `, ${url}` : ''}.`;
    } else if (type === 'Chicago') {
      // Chicago: Author. "Title." Source (Year). URL.
      ref = `${author || 'Author'}. "${title || 'Title'}." ${source ? `${source}` : ''} (${year || 'n.d.'}).${url ? ` ${url}` : ''}`;
    }
    setResult(ref);
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
      <div className="space-y-3">
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Style</Label>
          <Select value={type} onValueChange={(v: any) => setType(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="APA">APA 7</SelectItem>
              <SelectItem value="MLA">MLA 9</SelectItem>
              <SelectItem value="Chicago">Chicago</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-2">
           <div className="space-y-1">
             <Label className="text-xs text-muted-foreground">Author</Label>
             <Input placeholder="Smith, J." value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} />
           </div>
           <div className="space-y-1">
             <Label className="text-xs text-muted-foreground">Year</Label>
             <Input placeholder="2024" value={formData.year} onChange={e => setFormData({...formData, year: e.target.value})} />
           </div>
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Title</Label>
          <Input placeholder="Article Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        
        <div className="space-y-1">
          <Label className="text-xs text-muted-foreground">Source / Publisher</Label>
          <Input placeholder="Journal of AI" value={formData.source} onChange={e => setFormData({...formData, source: e.target.value})} />
        </div>

        <Button onClick={generateReference} className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">
          <Book className="w-4 h-4 mr-2" /> Generate
        </Button>
      </div>

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-2 p-3 bg-muted/50 rounded-lg border border-border text-sm relative group"
        >
          <p className="font-mono text-xs leading-relaxed pr-6">{result}</p>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="w-3 h-3 text-green-500" /> : <Copy className="w-3 h-3" />}
          </Button>
        </motion.div>
      )}
    </div>
  );
}

import { useState, useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Network, Download, Play, RefreshCw, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function DiagramGenerator() {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [diagramCode, setDiagramCode] = useState('');
  const [copied, setCopied] = useState(false);
  const mermaidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    mermaid.initialize({ 
      startOnLoad: true, 
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  useEffect(() => {
    if (diagramCode && mermaidRef.current) {
      mermaidRef.current.innerHTML = '';
      mermaid.render('mermaid-svg', diagramCode).then((result) => {
        if (mermaidRef.current) {
          mermaidRef.current.innerHTML = result.svg;
          // Fix SVG scaling to prevent 50/50 cut off issues
          const svg = mermaidRef.current.querySelector('svg');
          if (svg) {
            svg.style.width = '100%';
            svg.style.height = '100%';
            svg.style.maxWidth = '100%';
          }
        }
      });
    }
  }, [diagramCode]);

  const generateDiagram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);

    // Simple keyword matching to simulate "AI" generation of Mermaid syntax
    // In a real full-stack app, this would be an LLM call
    setTimeout(() => {
      let code = '';
      const p = prompt.toLowerCase();
      
      if (p.includes('login') || p.includes('auth')) {
        code = `graph TD
    A[User] -->|Enters Credentials| B(Login Page)
    B --> C{Validate?}
    C -->|Yes| D[Dashboard]
    C -->|No| E[Show Error]`;
      } else if (p.includes('database') || p.includes('user') || p.includes('erd')) {
        code = `erDiagram
    USER ||--o{ ORDER : places
    USER {
        string name
        string email
    }
    ORDER ||--|{ LINE-ITEM : contains
    ORDER {
        int id
        string date
    }`;
      } else if (p.includes('sequence') || p.includes('message')) {
        code = `sequenceDiagram
    participant U as User
    participant S as System
    participant D as DB
    U->>S: Request Data
    S->>D: Query
    D-->>S: Return Results
    S-->>U: Display Data`;
      } else {
        // Default flowchart
        code = `graph LR
    A[Start] --> B(Process)
    B --> C{Decision}
    C -->|Option 1| D[Result A]
    C -->|Option 2| E[Result B]`;
      }

      setDiagramCode(code);
      setLoading(false);
    }, 1000);
  };

  const copyCode = () => {
    if (diagramCode) {
      navigator.clipboard.writeText(diagramCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="space-y-2 text-center py-4 bg-muted/20 rounded-xl border border-dashed border-muted-foreground/20">
        <p className="text-xs text-muted-foreground">
          Try: "Login flow", "User Database ERD", or "Message Sequence"
        </p>
      </div>

      <form onSubmit={generateDiagram} className="flex gap-2">
        <Input 
          placeholder="Describe your diagram..." 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="text-xs"
        />
        <Button size="icon" type="submit" disabled={loading}>
          {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
        </Button>
      </form>

      <div className="flex-1 bg-white/50 dark:bg-black/20 rounded-lg border border-border flex flex-col overflow-hidden relative p-4">
        {diagramCode ? (
          <>
            <div className="flex-1 w-full overflow-auto flex items-center justify-center">
               <div ref={mermaidRef} className="w-full flex justify-center" />
            </div>
            <div className="absolute bottom-2 right-2 flex gap-2">
              <Button 
                variant="secondary" 
                size="xs" 
                className="text-[10px] shadow-sm border border-black/5"
                onClick={copyCode}
              >
                {copied ? <Check className="w-3 h-3 mr-1" /> : <Copy className="w-3 h-3 mr-1" />}
                Copy Mermaid
              </Button>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-muted-foreground/40">
            <Network className="w-8 h-8" />
            <p className="text-xs">Diagram preview area</p>
          </div>
        )}
      </div>
    </div>
  );
}

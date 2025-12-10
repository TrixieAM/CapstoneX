import { useState } from 'react';
import { Upload, FileText, Sparkles, Book, BookOpen, Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { motion } from 'framer-motion';

export function DocumentProcessor() {
  const [fileName, setFileName] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      processFile(file.name);
    }
  };

  const processFile = (name: string) => {
    setLoading(true);
    setResult(null);
    
    // Simulate AI Processing of the file
    setTimeout(() => {
      setResult({
        abstract: `This study investigates the impact of adaptive learning algorithms on student engagement in remote educational environments. Using a mixed-methods approach, data was collected from 500 undergraduate students. Results indicate a 40% increase in course completion rates when personalized learning paths are implemented.`,
        references: [
          "Smith, J. (2024). Adaptive Systems in EdTech. Journal of Future Education.",
          "Doe, A. & Lee, B. (2023). Remote Learning Challenges. Academic Press.",
          "Johnson, T. (2023). AI in the Classroom. Tech Daily."
        ],
        definitions: [
          { term: "Adaptive Learning", def: "An educational method which uses computer algorithms to orchestrate the interaction with the learner and deliver customized resources." },
          { term: "Mixed-Methods", def: "A research approach that combines quantitative and qualitative data collection and analysis." }
        ]
      });
      setLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Upload Area */}
      {!result && !loading && (
        <div className="flex-1 border-2 border-dashed border-muted-foreground/20 rounded-xl flex flex-col items-center justify-center p-6 text-center hover:bg-muted/10 transition-colors relative">
           <input 
             type="file" 
             className="absolute inset-0 opacity-0 cursor-pointer" 
             onChange={handleFileUpload}
             accept=".pdf,.docx,.txt"
           />
           <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
             <Upload className="w-6 h-6 text-primary" />
           </div>
           <h3 className="font-medium text-sm">Upload Research Paper</h3>
           <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">
             Automatically generate Abstract, References, and Definitions
           </p>
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 border-4 border-muted rounded-full" />
            <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-sm">Analyzing {fileName}...</h3>
            <p className="text-xs text-muted-foreground">Extracting key concepts and citations</p>
          </div>
        </div>
      )}

      {/* Results View */}
      {result && (
        <ScrollArea className="flex-1 -mr-3 pr-3">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider">{fileName}</span>
              </div>
              <Button variant="ghost" size="xs" onClick={() => { setResult(null); setFileName(null); }}>
                Upload New
              </Button>
            </div>

            {/* Abstract Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Sparkles className="w-4 h-4" />
                <h3 className="text-sm font-bold">Generated Abstract</h3>
              </div>
              <div className="bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-border text-sm leading-relaxed text-muted-foreground">
                {result.abstract}
              </div>
            </motion.div>

            <Separator />

            {/* References Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <Book className="w-4 h-4" />
                <h3 className="text-sm font-bold">Detected References</h3>
              </div>
              <div className="bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-border space-y-2">
                {result.references.map((ref: string, i: number) => (
                  <div key={i} className="flex gap-2 text-xs">
                    <span className="text-muted-foreground/50">{i + 1}.</span>
                    <span className="text-foreground/80">{ref}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <Separator />

            {/* Definitions Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <div className="flex items-center gap-2 mb-2 text-primary">
                <BookOpen className="w-4 h-4" />
                <h3 className="text-sm font-bold">Key Terms Defined</h3>
              </div>
              <div className="grid gap-2">
                {result.definitions.map((item: any, i: number) => (
                  <div key={i} className="bg-white/50 dark:bg-white/5 p-3 rounded-lg border border-border">
                    <span className="text-xs font-bold text-foreground block mb-1">{item.term}</span>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.def}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

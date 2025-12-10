import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentProcessor } from "./DocumentProcessor";
import { ReferenceGenerator } from "./ReferenceGenerator";
import { GrammarChecker } from "./GrammarChecker";
import { SearchEngine } from "./SearchEngine";
import { DefinitionGenerator } from "./DefinitionGenerator";
import { CodeAssistant } from "./CodeAssistant";
import { DiagramGenerator } from "./DiagramGenerator";
import { Sparkles, Quote, Wand2, Search, BookOpen, Code, Network, FileText } from "lucide-react";

export function ResearchTools() {
  return (
    <div className="glass-panel rounded-2xl p-1 flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="doc" className="flex flex-col h-full w-full">
        <div className="px-4 pt-3 pb-2 overflow-x-auto hide-scrollbar">
           <TabsList className="w-full flex justify-start h-9 p-1 bg-muted/20 min-w-max">
            <TabsTrigger value="doc" className="text-[10px] px-3"><FileText className="w-3.5 h-3.5 mr-1.5" /> Analyze</TabsTrigger>
            <TabsTrigger value="search" className="text-[10px] px-3"><Search className="w-3.5 h-3.5 mr-1.5" /> Research</TabsTrigger>
            <TabsTrigger value="code" className="text-[10px] px-3"><Code className="w-3.5 h-3.5 mr-1.5" /> Dev</TabsTrigger>
            <TabsTrigger value="diagram" className="text-[10px] px-3"><Network className="w-3.5 h-3.5 mr-1.5" /> Diagram</TabsTrigger>
            <TabsTrigger value="grammar" className="text-[10px] px-3"><Wand2 className="w-3.5 h-3.5 mr-1.5" /> Write</TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden p-3 pt-0">
          <TabsContent value="doc" className="h-full m-0 data-[state=active]:flex flex-col">
            <DocumentProcessor />
          </TabsContent>
          <TabsContent value="search" className="h-full m-0 data-[state=active]:flex flex-col">
             <SearchEngine />
          </TabsContent>
          <TabsContent value="code" className="h-full m-0 data-[state=active]:flex flex-col">
            <CodeAssistant />
          </TabsContent>
          <TabsContent value="diagram" className="h-full m-0 data-[state=active]:flex flex-col">
            <DiagramGenerator />
          </TabsContent>
          <TabsContent value="grammar" className="h-full m-0 data-[state=active]:flex flex-col">
             <GrammarChecker />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AbstractGenerator } from "./AbstractGenerator";
import { ReferenceGenerator } from "./ReferenceGenerator";
import { GrammarChecker } from "./GrammarChecker";
import { SearchEngine } from "./SearchEngine";
import { DefinitionGenerator } from "./DefinitionGenerator";
import { Sparkles, Quote, Wand2, Search, BookOpen } from "lucide-react";

export function ResearchTools() {
  return (
    <div className="glass-panel rounded-2xl p-1 flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="abstract" className="flex flex-col h-full w-full">
        <div className="px-4 pt-3 pb-2">
           <TabsList className="w-full grid grid-cols-5 h-9 p-1 bg-muted/20">
            <TabsTrigger value="abstract" className="text-[10px] px-0"><Sparkles className="w-3.5 h-3.5" /></TabsTrigger>
            <TabsTrigger value="refs" className="text-[10px] px-0"><Quote className="w-3.5 h-3.5" /></TabsTrigger>
            <TabsTrigger value="grammar" className="text-[10px] px-0"><Wand2 className="w-3.5 h-3.5" /></TabsTrigger>
            <TabsTrigger value="search" className="text-[10px] px-0"><Search className="w-3.5 h-3.5" /></TabsTrigger>
            <TabsTrigger value="define" className="text-[10px] px-0"><BookOpen className="w-3.5 h-3.5" /></TabsTrigger>
          </TabsList>
        </div>
        
        <div className="flex-1 overflow-hidden p-3 pt-0">
          <TabsContent value="abstract" className="h-full m-0 data-[state=active]:flex flex-col">
            <AbstractGenerator />
          </TabsContent>
          <TabsContent value="refs" className="h-full m-0 data-[state=active]:flex flex-col">
            <ReferenceGenerator />
          </TabsContent>
          <TabsContent value="grammar" className="h-full m-0 data-[state=active]:flex flex-col">
            <GrammarChecker />
          </TabsContent>
          <TabsContent value="search" className="h-full m-0 data-[state=active]:flex flex-col">
            <SearchEngine />
          </TabsContent>
          <TabsContent value="define" className="h-full m-0 data-[state=active]:flex flex-col">
            <DefinitionGenerator />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}

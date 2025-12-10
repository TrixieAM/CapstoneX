import { AppShell } from '@/components/layout/AppShell';
import { MusicPlayer } from '@/components/player/MusicPlayer';
import { Notepad } from '@/components/workspace/Notepad';
import { TaskList } from '@/components/workspace/TaskList';
import { ResearchTools } from '@/components/ai/ResearchTools';
import { useState, useEffect } from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';

export default function Dashboard() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return (
      <AppShell>
        <div className="flex flex-col gap-4 pb-20 overflow-y-auto h-full">
          <div className="h-[250px]"><MusicPlayer /></div>
          <div className="h-[400px]"><TaskList /></div>
          <div className="h-[400px]"><Notepad /></div>
          <div className="h-[500px]"><ResearchTools /></div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="h-full w-full">
        <PanelGroup direction="horizontal" className="h-full">
          {/* Left Column: Player & Tasks */}
          <Panel defaultSize={20} minSize={15} className="flex flex-col gap-4 pr-2">
             <div className="h-[40%]">
               <MusicPlayer />
             </div>
             <div className="h-[60%]">
               <TaskList />
             </div>
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-transparent hover:bg-primary/20 transition-colors rounded-full mx-1" />

          {/* Middle Column: Notepad (Main Focus) */}
          <Panel defaultSize={45} minSize={30}>
            <div className="h-full px-2">
              <Notepad />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-transparent hover:bg-primary/20 transition-colors rounded-full mx-1" />

          {/* Right Column: AI Research Tools */}
          <Panel defaultSize={35} minSize={25}>
            <div className="h-full pl-2">
              <ResearchTools />
            </div>
          </Panel>
        </PanelGroup>
      </div>
    </AppShell>
  );
}

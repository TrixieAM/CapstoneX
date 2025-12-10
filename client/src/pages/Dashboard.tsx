import { AppShell } from '@/components/layout/AppShell';
import { MusicPlayer } from '@/components/player/MusicPlayer';
import { Notepad } from '@/components/workspace/Notepad';
import { TaskList } from '@/components/workspace/TaskList';
import { ResearchTools } from '@/components/ai/ResearchTools';
import { useState, useEffect } from 'react';

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
      <div className="h-full w-full flex gap-4">
        {/* Left Column: Player & Tasks */}
        <div className="w-[300px] flex flex-col gap-4">
          <div className="h-[40%]">
            <MusicPlayer />
          </div>
          <div className="h-[60%]">
            <TaskList />
          </div>
        </div>

        {/* Middle Column: Notepad (Main Focus) */}
        <div className="flex-1">
          <Notepad />
        </div>

        {/* Right Column: AI Research Tools */}
        <div className="w-[340px]">
          <ResearchTools />
        </div>
      </div>
    </AppShell>
  );
}

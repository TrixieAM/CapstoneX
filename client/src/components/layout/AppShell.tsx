import React from 'react';
import background from '@assets/generated_images/soft_calming_gradient_background_for_a_study_app.png';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground selection:bg-primary/20 selection:text-primary-foreground">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-50 dark:opacity-20"
        style={{ backgroundImage: `url(${background})` }}
      />
      
      {/* Gradient Overlay for smoothness */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-background/80 via-background/40 to-background/80 backdrop-blur-[2px]" />

      {/* Main Content */}
      <main className="relative z-10 flex h-screen flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 border-b border-white/10 glass-panel mx-4 mt-4 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            </div>
            <h1 className="text-xl font-medium tracking-tight text-foreground/80">StudyFlow</h1>
          </div>
          <div className="text-sm text-muted-foreground font-mono">
            {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' })}
          </div>
        </header>
        
        <div className="flex-1 overflow-hidden p-4">
          {children}
        </div>
      </main>
    </div>
  );
}

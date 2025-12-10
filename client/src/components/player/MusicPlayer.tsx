import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { useAtom } from 'jotai';
import { youtubeUrlAtom, isPlayingAtom, volumeAtom } from '@/store';
import { Play, Pause, Volume2, VolumeX, Link as LinkIcon, AlertCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { motion } from 'framer-motion';

export function MusicPlayer() {
  const [url, setUrl] = useAtom(youtubeUrlAtom);
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const [volume, setVolume] = useAtom(volumeAtom);
  const [inputValue, setInputValue] = useState(url);
  const [error, setError] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Sync local input with store url if it changes externally
  useEffect(() => {
    setInputValue(url);
  }, [url]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ReactPlayer.canPlay(inputValue)) {
      setUrl(inputValue);
      setIsPlaying(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <motion.div 
      className="glass-panel rounded-2xl p-4 w-full flex flex-col gap-4 h-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
          Background Audio
        </h2>
        {url && isPlaying && (
          <div className="flex items-center gap-2">
             <div className="flex space-x-0.5 h-3 items-end">
               {[1,2,3].map(i => (
                 <motion.div
                   key={i}
                   className="w-1 bg-primary/60"
                   animate={{ 
                     height: [4, 12, 4],
                   }}
                   transition={{
                     duration: 0.5 + i * 0.1,
                     repeat: Infinity,
                     ease: "easeInOut"
                   }}
                 />
               ))}
             </div>
          </div>
        )}
      </div>

      <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black/5 shadow-inner border border-black/5">
         {!url ? (
           <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground/50 p-4 text-center">
             <LinkIcon className="w-8 h-8 mb-2 opacity-50" />
             <p className="text-xs">Paste a YouTube link to start listening</p>
           </div>
         ) : (
            <div className="w-full h-full">
              <ReactPlayer
                url={url}
                playing={isPlaying}
                volume={volume}
                muted={false}
                width="100%"
                height="100%"
                controls={true} 
                loop={true}
                onError={(e) => {
                  console.error("Player Error:", e);
                  setError(true);
                }}
                onReady={() => setIsReady(true)}
                // @ts-ignore - ReactPlayer types can be finicky with the url prop
                config={{
                  youtube: {
                    playerVars: { 
                      showinfo: 0, 
                      controls: 1, // Enable controls so user can manually play/unmute if autoplay fails
                      modestbranding: 1,
                      origin: window.location.origin,
                      playsinline: 1
                    }
                  }
                }}
              />
            </div>
         )}
      </div>

      <form onSubmit={handleUrlSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input 
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              setError(false);
            }}
            placeholder="Paste YouTube URL..."
            className={`h-9 text-xs bg-white/40 dark:bg-black/20 border-white/20 focus-visible:ring-primary/20 ${error ? 'border-red-400 focus-visible:ring-red-400' : ''}`}
          />
          {error && <AlertCircle className="absolute right-2 top-2.5 w-4 h-4 text-red-500" />}
        </div>
        <Button size="sm" type="submit" variant="ghost" className="h-9 w-9 p-0 hover:bg-primary/10 hover:text-primary">
          <Play className="w-4 h-4" />
        </Button>
      </form>

      {url && (
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="icon"
            className="h-10 w-10 rounded-full border-primary/20 hover:bg-primary/10 hover:text-primary hover:border-primary/50 transition-all shadow-sm"
            onClick={handlePlayPause}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </Button>
          
          <div className="flex-1 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-muted-foreground hover:text-primary"
              onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
            >
              {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </Button>
            <Slider
              value={[volume]}
              max={1}
              step={0.01}
              onValueChange={(val) => setVolume(val[0])}
              className="cursor-pointer"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

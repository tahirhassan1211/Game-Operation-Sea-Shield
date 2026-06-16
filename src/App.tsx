import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import backgroundImage from './Game_Images/background_image2.png';
import adenImage from './Game_Images/Gulf of Aden and Somali Coast.png';
import guineaImage from './Game_Images/Gulf of Guinea West Africa.png';
import chinaSeaImage from './Game_Images/South China Sea.png';
import malaccaImage from './Game_Images/Straits of Malacca and Singapore.png';
import suluImage from './Game_Images/Sulu and Celebes Seas.png';
import { 
  Play, 
  Settings, 
  Shield, 
  Zap, 
  Skull, 
  RotateCcw, 
  Menu as MenuIcon,
  Volume2,
  VolumeX,
  Target,
  LifeBuoy,
  ChevronUp,
  X
} from 'lucide-react';

// Difficulty Settings with Images
const STRAITS_CONFIG = [
  { name: 'Gulf of Aden & Somali Coast', image: adenImage }, 
  { name: 'South China Sea', image: chinaSeaImage }, 
  { name: 'Gulf of Guinea (West Africa)', image: guineaImage }, 
  { name: 'Straits of Malacca & Singapore', image: malaccaImage }, 
  { name: 'Sulu and Celebes Seas', image: suluImage }
];

const STRAITS = STRAITS_CONFIG.map(s => s.name);

const MAX_LEVELS = 5;

const GAME_SETTINGS = {
  enemyAreaSize: 5000,
  torpedoSpeed: 2.2,
  missileReload: 800,
  maxHealth: 100
};

export default function App() {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'gameover' | 'battlefield-select' | 'victory'>('menu');
  const [selectedStrait, setSelectedStrait] = useState<string>('');
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('operation-sea-shield-highscore');
    if (saved) setHighScore(parseInt(saved));
  }, []);

  const startGame = (startLevel: number = 1) => {
    setLevel(startLevel);
    setScore(0);
    setGameState('playing');
  };

  const handleGameOver = (finalScore: number) => {
    setScore(finalScore);
    if (finalScore > highScore) {
      setHighScore(finalScore);
      localStorage.setItem('operation-sea-shield-highscore', finalScore.toString());
    }
    setGameState('gameover');
  };

  const handleVictory = () => {
    setGameState('victory');
  };

  return (
    <div className="relative w-full h-screen bg-[#000b14] text-white font-sans overflow-hidden select-none">
      {/* Sleek Theme Background Decorations */}
      <div className="absolute inset-0 scanner pointer-events-none z-0">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#00f2ff 0.5px, transparent 0.5px)', backgroundSize: '40px 40px' }}></div>
      </div>
      
      <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-500/20 pointer-events-none z-0"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-500/20 pointer-events-none z-0"></div>

      <AnimatePresence mode="wait">
        {gameState === 'menu' && (
          <motion.div 
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center h-full gap-8 p-4 text-center z-10 relative"
          >
            <div className="absolute inset-0 z-[-1] pointer-events-none overflow-hidden bg-slate-950">
              <img 
                src={backgroundImage} 
                alt=""
                className="w-full h-full object-cover opacity-100 scale-100"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/90"></div>
            </div>
            
            <div className="relative pt-32 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative text-center"
              >
                {/* Atmospheric Background Glow */}
                <div className="absolute -inset-x-20 -inset-y-10 bg-cyan-600/10 blur-[100px] rounded-full animate-pulse"></div>
                
                <h1 className="flex flex-col items-center tracking-tighter leading-none">
                  <span className="text-3xl md:text-5xl font-bold uppercase tracking-[0.4em] text-cyan-50 mb-2 drop-shadow-[0_2px_10px_rgba(34,211,238,0.5)]">
                    Operation
                  </span>
                  <span className="text-6xl md:text-8xl font-black uppercase italic relative px-4 text-center">
                    {/* Inner Text Layer */}
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]">
                      Sea Storm
                    </span>
                    {/* Subtle Outer Glow */}
                    <span className="absolute inset-0 z-0 blur-lg opacity-40 text-cyan-400 select-none pointer-events-none px-4">
                      Sea Storm
                    </span>
                  </span>
                </h1>
                
                <div className="flex items-center gap-4 mt-2">
                  <div className="h-[1px] w-16 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>
                  <span className="text-2xl md:text-3xl font-black uppercase tracking-[0.6em] text-transparent bg-clip-text bg-gradient-to-b from-white via-cyan-100 to-cyan-500 drop-shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    Silent Precise Deadly.
                  </span>
                  <div className="h-[1px] w-16 bg-gradient-to-l from-transparent via-cyan-400/50 to-transparent"></div>
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col gap-4 mt-auto mb-12 w-full max-w-xs">
              <button 
                onClick={() => setGameState('battlefield-select')}
                className="group relative flex items-center justify-center gap-4 overflow-hidden px-8 py-5 glass hover:bg-cyan-500/10 transition-all rounded-sm border border-cyan-500/20 active:translate-y-1 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <Play className="group-hover:scale-110 transition-transform fill-cyan-400 text-cyan-400" />
                <span className="font-bold uppercase tracking-[0.2em] text-lg text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Battle Field</span>
              </button>
              
              <div className="flex justify-between gap-2">
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="flex-1 flex items-center justify-center p-3 glass rounded-sm hover:bg-cyan-500/10 transition"
                >
                  {soundEnabled ? <Volume2 size={20} className="text-cyan-400" /> : <VolumeX size={20} className="text-slate-500" />}
                </button>
                <div className="flex-[2] flex flex-col justify-center px-4 glass rounded-sm">
                  <div className="text-[10px] uppercase text-cyan-500 font-bold tracking-tighter">High Score</div>
                  <div className="font-mono text-xl text-white">{highScore.toString().padStart(6, '0')}</div>
                </div>
              </div>
            </div>

            <div className="mt-12 opacity-40 text-xs uppercase tracking-widest leading-relaxed max-w-md">
              Command your battleship. Evade torpedoes. <br />
              Launch missiles to intercept. Survive the depths.
            </div>
          </motion.div>
        )}

        {gameState === 'battlefield-select' && (
          <motion.div 
            key="battlefield-select"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="flex flex-col items-center justify-center min-h-full p-4 z-10 w-full max-w-4xl mx-auto py-12"
          >
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4 text-cyan-400 text-center">
              <Shield className="text-cyan-500 hidden sm:block" />
              Select Battle Field
            </h2>

            <div className="w-full max-w-5xl">
              <div className="flex flex-col gap-4">
                <label className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500 block mb-4 text-center">Operational Zones</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-2">
                  {STRAITS_CONFIG.map(strait => (
                    <button
                      key={strait.name}
                      onClick={() => setSelectedStrait(strait.name)}
                      className={`group relative overflow-hidden aspect-[16/9] rounded-xl transition-all border-2 ${
                        selectedStrait === strait.name 
                        ? 'border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.5)] scale-[1.02]' 
                        : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <img 
                        src={strait.image} 
                        alt={strait.name}
                        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
                          selectedStrait === strait.name ? 'scale-110' : 'group-hover:scale-105'
                        } ${selectedStrait === strait.name ? 'opacity-100' : 'opacity-60 grayscale-[0.5] group-hover:grayscale-0 group-hover:opacity-80'}`}
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        selectedStrait === strait.name 
                        ? 'from-cyan-900/90 via-cyan-900/40 to-transparent' 
                        : 'from-black/80 via-transparent to-transparent group-hover:from-black/90'
                      }`}></div>
                      
                      <div className="absolute inset-0 flex flex-col justify-end p-4 text-left">
                        <span className={`text-sm font-black uppercase tracking-widest leading-tight ${
                          selectedStrait === strait.name ? 'text-white' : 'text-slate-300'
                        }`}>
                          {strait.name}
                        </span>
                        {selectedStrait === strait.name && (
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            className="h-1 bg-white mt-2 rounded-full"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6 w-full">
              <button 
                disabled={!selectedStrait}
                onClick={() => startGame()}
                className="group relative flex items-center justify-center gap-4 overflow-hidden px-8 py-5 glass hover:bg-cyan-500/10 transition-all rounded-sm border border-cyan-500/20 active:translate-y-1 shadow-[0_0_30px_rgba(6,182,212,0.1)]"
              >
                <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500"></div>
                <Zap className="group-hover:scale-110 transition-transform fill-cyan-400 text-cyan-400" />
                <span className="font-bold uppercase tracking-[0.2em] text-lg text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]">Launch Operation</span>
              </button>

              <button 
                onClick={() => setGameState('menu')}
                className="text-slate-500 hover:text-cyan-400 transition uppercase tracking-widest text-xs flex items-center gap-2 font-bold"
              >
                <RotateCcw size={14} />
                Return to Fleet
              </button>
            </div>
          </motion.div>
        )}

        {gameState === 'playing' && (
          <GameView 
            protagonist="Allied"
            antagonist="Enemy"
            strait={selectedStrait}
            level={level} 
            onGameOver={handleGameOver}
            onLevelUp={(newLvl) => setLevel(newLvl)}
            onExit={() => setGameState('menu')}
            onVictory={handleVictory}
            soundEnabled={soundEnabled}
          />
        )}

        {gameState === 'gameover' && (
          <motion.div 
            key="gameover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full p-4 z-40 bg-[#000b14]/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass p-10 max-w-lg w-full text-center rounded-2xl relative overflow-hidden"
            >
              {/* Decorative background ping */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sonar-ping pointer-events-none opacity-20"></div>
              
              <Skull size={64} className="mx-auto text-red-500 mb-6" />
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-2 underline decoration-red-600 decoration-4 underline-offset-8">Fleet Neutralized</h2>
              <p className="text-cyan-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-10">Command structure has collapsed</p>
              
              <div className="grid grid-cols-2 gap-4 mb-10">
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-left">
                  <div className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest mb-1">Yield</div>
                  <div className="text-3xl font-mono font-bold text-white">{score.toLocaleString()}</div>
                </div>
                <div className="bg-white/5 p-4 rounded-lg border border-white/10 text-left">
                  <div className="text-[10px] uppercase font-bold text-cyan-500 tracking-widest mb-1">Efficiency</div>
                  <div className="text-3xl font-mono font-bold text-white">{highScore.toLocaleString()}</div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => startGame(1)}
                  className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 transition rounded-lg font-black uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(8,145,178,0.4)]"
                >
                  Restart Sortie
                </button>
                <button 
                  onClick={() => setGameState('menu')}
                  className="w-full py-3 hover:bg-white/5 transition rounded-lg font-bold uppercase tracking-[0.2em] text-xs text-slate-400 border border-white/10"
                >
                  Return to Base
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {gameState === 'victory' && (
          <motion.div 
            key="victory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full p-4 z-40 bg-[#000b14]/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="glass p-12 max-w-lg w-full text-center rounded-2xl relative overflow-hidden border-2 border-cyan-500/50"
            >
              <Shield size={64} className="mx-auto text-cyan-400 mb-6" />
              <h2 className="text-5xl font-black italic uppercase tracking-tighter text-white mb-2 underline decoration-cyan-400 decoration-4 underline-offset-8">Mission Accomplished</h2>
              <p className="text-cyan-500 uppercase tracking-[0.3em] text-[10px] font-bold mb-10">Global Security Restored</p>
              
              <div className="bg-cyan-500/10 p-6 rounded-lg border border-cyan-500/20 mb-10 text-center">
                <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-widest mb-2">Campaign Yield</div>
                <div className="text-5xl font-mono font-bold text-white">{score.toLocaleString()}</div>
              </div>

              <button 
                onClick={() => setGameState('menu')}
                className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 transition rounded-lg font-black uppercase tracking-[0.3em] text-white shadow-[0_0_30px_rgba(8,145,178,0.4)]"
              >
                Confirm Completion
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative background noise */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-900/20 via-transparent to-transparent"></div>
      </div>
    </div>
  );
}

// Game View Component
function GameView({ 
  protagonist,
  antagonist,
  strait,
  level, 
  onGameOver, 
  onLevelUp,
  onExit,
  onVictory,
  soundEnabled
}: { 
  protagonist: string;
  antagonist: string;
  strait: string;
  level: number; 
  onGameOver: (score: number) => void;
  onLevelUp: (lv: number) => void;
  onExit: () => void;
  onVictory: () => void;
  soundEnabled: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [health, setHealth] = useState(GAME_SETTINGS.maxHealth);
  const [maxHealth, setMaxHealth] = useState(GAME_SETTINGS.maxHealth);
  const [shields, setShields] = useState(0);
  const [score, setScore] = useState(0);
  const [speedBoost, setSpeedBoost] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  const [torpedoCount, setTorpedoCount] = useState(0);
  const [screenShake, setScreenShake] = useState(0);
  const [rescuedCount, setRescuedCount] = useState(0);
  const [playerX, setPlayerX] = useState(0);
  const [specialDetected, setSpecialDetected] = useState<number | false>(false);
  const [isMobile, setIsMobile] = useState(false);
  const [joystick, setJoystick] = useState({ x: 0, y: 0, active: false });

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const goalScore = level * 2000;
  const progressScore = Math.min(100, (score / goalScore) * 100);
  const overallProgress = progressScore;

  // Core Game Logic will be implemented in the canvas component
  return (
    <div className="relative w-full h-full overflow-hidden">
      <motion.div 
        animate={{ x: (Math.random() - 0.5) * screenShake, y: (Math.random() - 0.5) * screenShake }}
        className="w-full h-full"
      >
        <GameCanvas 
          protagonist={protagonist}
          antagonist={antagonist}
          level={level}
          onGameOver={onGameOver}
          onLevelUp={onLevelUp}
          onVictory={onVictory}
          onScoreChange={setScore}
          onLevelComplete={() => setIsLevelComplete(true)} 
          onMaxHealthChange={setMaxHealth}
          onShieldChange={setShields}
          onHealthChange={(h: number) => {
            if (h < health) setScreenShake(10);
            setHealth(h);
          }}
          onDistanceChange={setPlayerX}
          onTorpedoCountChange={setTorpedoCount}
          onRescuedCountChange={setRescuedCount}
          onSpecialDetected={setSpecialDetected}
          paused={isPaused || isLevelComplete}
          soundEnabled={soundEnabled}
          isMobile={isMobile}
          joystick={joystick}
        />
      </motion.div>

      {/* Screen flash on damage */}
      <AnimatePresence>
        {screenShake > 0 && (
          <motion.div 
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            onAnimationComplete={() => setScreenShake(0)}
            className="absolute inset-0 bg-red-500/20 pointer-events-none z-50"
          />
        )}
      </AnimatePresence>

      {/* HUD Overview */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 flex justify-between items-start pointer-events-none z-10">
        <div className="flex flex-col gap-2">
          {/* Hull Stats */}
          <div className="glass px-4 py-3 rounded-lg flex items-center gap-6">
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-cyan-400 mb-1 leading-none">{protagonist} Fleet</p>
              <div className="flex items-center gap-3">
                <div className="w-32 md:w-40 h-2 bg-slate-800 rounded-full overflow-hidden relative">
                  <motion.div 
                    className="h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                    style={{ width: `${(health / maxHealth) * 100}%` }}
                    initial={false}
                  />
                  {shields > 0 && (
                    <div 
                      className="absolute top-0 left-0 h-full bg-white/40 animate-pulse transition-all duration-300"
                      style={{ width: `${(shields / 50) * 100}%` }}
                    />
                  )}
                </div>
                <div className="font-mono text-sm font-bold text-white pr-2">{Math.ceil(health)}%</div>
              </div>
            </div>
            
            <div className="w-[1px] h-8 bg-cyan-900/50"></div>
            
            <div>
              <p className="text-[10px] uppercase font-bold text-red-500 mb-1 leading-none">Targeting</p>
              <p className="font-mono text-lg text-white">{antagonist}</p>
            </div>
            
            <div className="w-[1px] h-8 bg-cyan-900/50"></div>
            
            <div>
              <p className="text-[10px] uppercase font-bold text-cyan-500 mb-1 leading-none">Battlefield</p>
              <p className="font-mono text-lg text-white">{strait}</p>
            </div>
            
            <div className="w-[1px] h-8 bg-cyan-900/50"></div>
            
            <div>
              <p className="text-[10px] uppercase font-bold text-cyan-500 mb-1 leading-none">Sector</p>
              <p className="font-mono text-lg text-white">{level} <span className="text-[10px] opacity-40">/ 05</span></p>
            </div>
            
            <div className="w-[1px] h-8 bg-cyan-900/50"></div>
            
            <div className="hidden md:block">
              <p className="text-[10px] uppercase font-bold text-yellow-500 mb-1 leading-none">Rescue Mission</p>
              <p className="font-mono text-lg text-white">{rescuedCount} <span className="text-[10px] opacity-40">/ 3</span></p>
            </div>
          </div>
          
          <div className="flex gap-2">
            {shields > 0 && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} 
                animate={{ opacity: 1, x: 0 }}
                className="glass px-3 py-1 rounded-full flex items-center gap-2 border-purple-500/40"
              >
                <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_5px_#c084fc] animate-pulse"></div>
                <span className="text-[9px] font-bold tracking-wider text-purple-200">SHIELD MAX</span>
              </motion.div>
            )}
            <div className="glass px-3 py-1 rounded-full flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_5px_#4ade80]"></div>
              <span className="text-[9px] font-bold tracking-wider text-green-200 uppercase">Sonar Active</span>
            </div>
          </div>
        </div>
 
        <div className="flex flex-col items-end gap-2 pr-2 md:pr-4">
          <button 
            className="pointer-events-auto glass p-3 rounded-lg hover:bg-cyan-500/20 transition group"
            onClick={() => setIsPaused(!isPaused)}
          >
            <MenuIcon size={20} className="text-cyan-400 transition-transform group-active:scale-95" />
          </button>
        </div>
      </div>

      {isPaused && (
        <div className="absolute inset-0 bg-[#000b14]/80 backdrop-blur-md z-50 flex items-center justify-center">
          <div className="glass p-16 rounded-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 sonar-ping opacity-30"></div>
            <h2 className="text-4xl font-black uppercase italic mb-8 tracking-widest text-white relative z-10">Tactical Pause</h2>
            <div className="flex flex-col gap-4 relative z-10">
              <button 
                onClick={() => setIsPaused(false)}
                className="px-16 py-4 bg-cyan-600 hover:bg-cyan-500 transition font-bold uppercase tracking-widest rounded shadow-lg text-white"
              >
                Resume Sortie
              </button>
              <button 
                onClick={() => {
                  setIsPaused(false);
                  onExit();
                }}
                className="px-8 py-2 text-slate-500 hover:text-white transition uppercase text-xs font-bold"
              >
                Abort Mission
              </button>
            </div>
          </div>
        </div>
      )}

      {isLevelComplete && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[#000b14]/90 backdrop-blur-xl z-[60] flex items-center justify-center"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass p-12 rounded-2xl max-w-lg w-full text-center relative border-cyan-500/50"
          >
            <div className="absolute inset-0 sonar-ping opacity-20"></div>
            
            <div className="w-20 h-20 bg-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              <Target className="text-cyan-400" size={40} />
            </div>

            <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white mb-2 leading-none">Mission Success</h2>
            <p className="text-cyan-400 font-bold tracking-[0.3em] uppercase text-[10px] mb-8">Area Secured • Command Authorization Pending</p>

            <div className="grid grid-cols-2 gap-4 mb-10 text-left">
            <div className="bg-cyan-950/20 p-4 rounded-lg border border-cyan-800/30">
                <div className="text-[10px] text-cyan-500 font-black uppercase mb-1">Status</div>
                <div className="text-2xl font-mono text-white">COMPLETED</div>
              </div>
              <div className="bg-cyan-950/20 p-4 rounded-lg border border-cyan-800/30">
                <div className="text-[10px] text-cyan-500 font-black uppercase mb-1">Combat Rating</div>
                <div className="text-2xl font-mono text-white">+{score.toLocaleString()}</div>
              </div>
            </div>

            <button 
              onClick={() => {
                if (level < MAX_LEVELS) {
                  onLevelUp(level + 1);
                  setIsLevelComplete(false);
                  // Trigger a reset event or handle in useEffect
                  window.dispatchEvent(new CustomEvent('level-reset'));
                } else {
                  onVictory();
                }
              }}
              className="w-full py-5 bg-cyan-500 hover:bg-cyan-400 transition-all font-black uppercase tracking-[0.4em] rounded-lg text-white shadow-[0_0_40px_rgba(6,182,212,0.4)] group"
            >
              <span className="flex items-center justify-center gap-2">
                Deploy to Next Area
                <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity }}>→</motion.span>
              </span>
            </button>
          </motion.div>
        </motion.div>
      )}

      {/* Bottom HUD: Systems & Power-ups */}
      <div className="absolute bottom-0 left-0 w-full p-8 flex justify-between items-end pointer-events-none z-10">
      {/* Mobile Control Layer (Dual Joystick Layout) */}
      {isMobile && !isPaused && !isLevelComplete && health > 0 && (
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-30 p-6 flex items-center justify-between">
          {/* Left: Directional Fire Pad (Button Joystick) */}
          <div className="pointer-events-auto select-none">
            <div className="relative w-32 h-32 md:w-36 md:h-36 glass rounded-full border-2 border-cyan-500/20 bg-black/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_40px_rgba(0,0,0,0.5)]">
               {/* Center Decal */}
              <div className="w-10 h-10 rounded-full border border-cyan-500/10 flex items-center justify-center">
                <Target size={14} className="text-cyan-500/30" />
              </div>
              
              {/* Up Fire */}
              <button 
                className="absolute top-1 w-10 h-10 glass rounded-xl flex items-center justify-center active:scale-95 active:bg-cyan-500/30 border border-cyan-500/40 shadow-lg"
                onTouchStart={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('game-fire', { detail: { type: 'missile', angle: -Math.PI / 2 } }));
                }}
              >
                <ChevronUp size={16} className="text-cyan-400" />
              </button>
              {/* Down Fire */}
              <button 
                className="absolute bottom-1 w-10 h-10 glass rounded-xl flex items-center justify-center active:scale-95 active:bg-cyan-500/30 border border-cyan-500/40 shadow-lg"
                onTouchStart={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('game-fire', { detail: { type: 'missile', angle: Math.PI / 2 } }));
                }}
              >
                <ChevronUp size={16} className="text-cyan-400 rotate-180" />
              </button>
              {/* Left Fire */}
              <button 
                className="absolute left-1 w-10 h-10 glass rounded-xl flex items-center justify-center active:scale-95 active:bg-cyan-500/30 border border-cyan-500/40 shadow-lg"
                onTouchStart={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('game-fire', { detail: { type: 'missile', angle: Math.PI } }));
                }}
              >
                <ChevronUp size={16} className="text-cyan-400 -rotate-90" />
              </button>
              {/* Right Fire */}
              <button 
                className="absolute right-1 w-10 h-10 glass rounded-xl flex items-center justify-center active:scale-95 active:bg-cyan-500/30 border border-cyan-500/40 shadow-lg"
                onTouchStart={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new CustomEvent('game-fire', { detail: { type: 'missile', angle: 0 } }));
                }}
              >
                <ChevronUp size={16} className="text-cyan-400 rotate-90" />
              </button>
            </div>
          </div>

          {/* Center: Torpedo/Mine Launcher (Thumb reach) */}
          <div className="pointer-events-auto select-none flex flex-col items-center justify-center">
            <button 
              className="w-20 h-20 glass rounded-full flex flex-col items-center justify-center active:scale-95 active:bg-orange-500/40 border-2 border-orange-500/50 shadow-[0_0_25px_rgba(249,115,22,0.3)] bg-orange-950/20"
              onTouchStart={(e) => {
                e.preventDefault();
                window.dispatchEvent(new CustomEvent('game-fire', { detail: { type: 'torpedo' } }));
              }}
            >
              <div className="w-8 h-8 rounded-full border-2 border-orange-400/30 flex items-center justify-center mb-1 bg-orange-400/10">
                <Skull size={16} className="text-orange-400" />
              </div>
              <span className="text-[8px] font-black uppercase text-orange-400 tracking-widest">Mine</span>
            </button>
          </div>

          {/* Right: Smooth Movement Joystick */}
          <div className="pointer-events-auto select-none">
             <div 
              className="w-32 h-32 md:w-40 md:h-40 glass rounded-full relative flex items-center justify-center opacity-90 active:opacity-100 shadow-[0_0_50px_rgba(6,182,212,0.15)] border-2 border-cyan-500/20 bg-black/40 backdrop-blur-md"
              onTouchStart={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const x = (touch.clientX - cx) / (rect.width / 2);
                const y = (touch.clientY - cy) / (rect.height / 2);
                setJoystick({ x, y, active: true });
              }}
              onTouchMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const touch = e.touches[0];
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const x = Math.max(-1, Math.min(1, (touch.clientX - cx) / (rect.width / 2)));
                const y = Math.max(-1, Math.min(1, (touch.clientY - cy) / (rect.height / 2)));
                setJoystick({ x, y, active: true });
              }}
              onTouchEnd={() => setJoystick({ x: 0, y: 0, active: false })}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center justify-center backdrop-blur-sm">
                <motion.div 
                  className="w-10 h-10 md:w-12 md:h-12 bg-cyan-400 rounded-full shadow-[0_0_25px_#22d3ee] border-2 border-white/30"
                  animate={{ x: joystick.x * 30, y: joystick.y * 30 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                />
              </div>
              <div className="absolute top-2 text-[7px] md:text-[8px] font-black text-cyan-400/40 uppercase tracking-tighter">Thrust</div>
              <div className="absolute right-2 text-[7px] md:text-[8px] font-black text-cyan-400/40 uppercase tracking-tighter rotate-90">STBD</div>
              <div className="absolute left-2 text-[7px] md:text-[8px] font-black text-cyan-400/40 uppercase tracking-tighter -rotate-90">PORT</div>
              <div className="absolute bottom-2 text-[7px] md:text-[8px] font-black text-cyan-400/40 uppercase tracking-tighter">Back</div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom HUD: Systems Info (Removed Sub-Scan) */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 p-8 z-10 pointer-events-none">
      </div>
      </div>
    </div>
  );
}

// Game Canvas Component (Simplified for now, will expand)
function GameCanvas({ protagonist, antagonist, level, onHealthChange, onShieldChange, onScoreChange, onGameOver, onLevelComplete, onLevelUp, onVictory, onDistanceChange, paused, onMaxHealthChange, onTorpedoCountChange, soundEnabled, onRescuedCountChange, onSpecialDetected, isMobile, joystick }: any) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  
  // Game state in refs for physics loop
  const gameState = useRef({
    player: { 
      x: 0, y: 0, rot: -Math.PI/2, speed: 0, health: 100, maxHealth: 100, shields: 0, 
      width: 60, height: 25,
      fireRateLevel: 0,
      multiShot: false,
      speedLevel: 0
    },
    keys: {} as Record<string, boolean>,
    torpedoes: [] as any[],
    missiles: [] as any[],
    powerups: [] as any[],
    effects: [] as any[],
    stormData: [] as {x: number, y: number, size: number, speed: number}[],
    glints: [] as {x: number, y: number, size: number, speed: number, alpha: number}[],
    camera: { x: 0, y: 0 },
    world: { width: 10000, height: 10000 },
    mines: [] as { x: number, y: number, id: number }[],
    rescueBoats: [] as { x: number, y: number, rescued: boolean, id: number }[],
    rescuedCount: 0,
    score: 0,
    distanceTraveled: 0,
    specialBonus: null as { x: number, y: number, age: number, life: number, id: number } | null,
    lastSpecialSpawn: Date.now() + 10000, 
    lastSpawn: 0,
    lastMineSpawn: 0,
    lastShipSpawn: 0,
    firstEntryToEnemyTime: 0,
    lastFire: 0,
    lastShieldDecay: 0,
    outOfBoundsTime: 0,
    enemyShips: [] as { x: number, y: number, rot: number, health: number, lastFire: number, id: number }[],
    level,
    paused,
    joystick: { x: 0, y: 0, active: false },
    gameSettings: GAME_SETTINGS
  });


  useEffect(() => {
    gameState.current.paused = paused;
  }, [paused]);

  useEffect(() => {
    gameState.current.joystick = joystick;
  }, [joystick]);

  useEffect(() => {
    gameState.current.level = level;
    gameState.current.rescuedCount = 0;
    gameState.current.specialBonus = null;
    onRescuedCountChange(0);
    onSpecialDetected(false);
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (gameState.current.player.x === 0) {
        gameState.current.player.x = 5000;
        gameState.current.player.y = 5000;
        gameState.current.camera.x = 5000;
        gameState.current.camera.y = 5000;
        
        // Initial boat spawn
        gameState.current.rescueBoats = [];
        gameState.current.rescuedCount = 0;
        for (let i = 0; i < 3; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 1500 + Math.random() * 2000;
          gameState.current.rescueBoats.push({
            x: 5000 + Math.cos(angle) * dist,
            y: 5000 + Math.sin(angle) * dist,
            rescued: false,
            id: Math.random()
          });
        }
      }
    };

    resize();
    window.addEventListener('resize', resize);
    
    // Initialize storm clouds/mist (Optimized for mobile)
    const stormCount = isMobile ? 30 : 80;
    for(let i=0; i<stormCount; i++) {
      gameState.current.stormData.push({
        x: Math.random() * gameState.current.world.width,
        y: Math.random() * gameState.current.world.height,
        size: 200 + Math.random() * 400,
        speed: 0.1 + Math.random() * 0.3
      });
    }

    // Initialize specular glints (water sparkles) (Optimized for mobile)
    const glintCount = isMobile ? 50 : 150;
    for(let i=0; i<glintCount; i++) {
        gameState.current.glints.push({
          x: Math.random() * gameState.current.world.width,
          y: Math.random() * gameState.current.world.height,
          size: 1 + Math.random() * 2,
          speed: 0.05 + Math.random() * 0.1,
          alpha: Math.random()
        });
    }

    // Config start
    gameState.current.player.health = GAME_SETTINGS.maxHealth;
    gameState.current.player.maxHealth = GAME_SETTINGS.maxHealth;
    onMaxHealthChange(GAME_SETTINGS.maxHealth);
    onHealthChange(GAME_SETTINGS.maxHealth);

    const handleKeyDown = (e: KeyboardEvent) => gameState.current.keys[e.code] = true;
    const handleKeyUp = (e: KeyboardEvent) => gameState.current.keys[e.code] = false;
    const handleMouseDown = (e: MouseEvent) => {
      if (paused) return;
      fireMissile(e.clientX, e.clientY);
    };

    const dropMine = () => {
      const now = Date.now();
      const { player, mines, paused } = gameState.current;
      if (paused) return;
      if (now - gameState.current.lastMineSpawn > 500) {
        // Drop from the back (stern)
        const spawnX = player.x - Math.cos(player.rot) * (player.width / 2);
        const spawnY = player.y - Math.sin(player.rot) * (player.width / 2);
        
        mines.push({
          x: spawnX,
          y: spawnY,
          id: Math.random(),
          isFriendly: true,
          spawnTime: now
        });
        gameState.current.lastMineSpawn = now;
        playSound('mine');

        // Visual effect for mine drop
        createExplosion(spawnX, spawnY, '#475569');
      }
    };

    const handleMobileAction = (e: any) => {
      if (paused) return;
      const type = e.detail.type;
      const player = gameState.current.player;
      
      if (type === 'missile') {
        // Always fire in front direction as requested
        fireMissileAtAngle(player.rot);
      } else if (type === 'torpedo') {
        dropMine();
      }
    };

    const resetLevel = () => {
      gameState.current.rescueBoats = [];
      gameState.current.rescuedCount = 0;
      onRescuedCountChange(0);
      for (let i = 0; i < 3; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = 1500 + Math.random() * 2000;
        gameState.current.rescueBoats.push({
          x: 5000 + Math.cos(angle) * dist,
          y: 5000 + Math.sin(angle) * dist,
          rescued: false,
          id: Math.random()
        });
      }

      gameState.current.player.x = 5000;
      gameState.current.player.y = 5000;
      gameState.current.camera.x = 5000;
      gameState.current.camera.y = 5000;
      gameState.current.player.speed = 0;
      gameState.current.enemyShips = [];
      gameState.current.torpedoes = [];
      gameState.current.missiles = [];
      gameState.current.mines = [];
      gameState.current.player.health = Math.min(100, gameState.current.player.health + 20);
      onHealthChange(gameState.current.player.health);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('game-fire', handleMobileAction as any);
    window.addEventListener('level-reset', resetLevel);

    const signalLevelComplete = () => {
      onLevelComplete();
      onSpecialDetected(false);
      gameState.current.distanceTraveled = 0;
      gameState.current.lastSpecialSpawn = Date.now();
      playSound('powerup');
      createExplosion(gameState.current.player.x, gameState.current.player.y, '#facc15');
    };

    const fireMissileAtAngle = (angle: number) => {
      const now = Date.now();
      const baseReload = gameState.current.gameSettings.missileReload;
      const reload = baseReload * Math.pow(0.8, gameState.current.player.fireRateLevel);
      if (now - gameState.current.lastFire < reload) return;
      
      playSound('missile');
      
      const fire = (ang: number) => {
        // Fire from the front (bow)
        const spawnX = gameState.current.player.x + Math.cos(gameState.current.player.rot) * (gameState.current.player.width / 2);
        const spawnY = gameState.current.player.y + Math.sin(gameState.current.player.rot) * (gameState.current.player.width / 2);

        gameState.current.missiles.push({
          x: spawnX,
          y: spawnY,
          rot: ang,
          speed: 10,
          id: Math.random(),
          isEnemy: false,
          sourceId: 'player',
          age: 0
        });

        // Add muzzle flash image effect
        gameState.current.effects.push({
          x: spawnX,
          y: spawnY,
          rot: ang,
          type: 'muzzle',
          life: 10,
          age: 0,
          size: 40
        });

        // Muzzle flash particle effect
        createExplosion(spawnX, spawnY, '#22d3ee');
      };

      fire(angle);
      if (gameState.current.player.multiShot) {
        fire(angle - 0.15);
        fire(angle + 0.15);
      }

      gameState.current.lastFire = now;
    };

    const fireMissile = (clientX: number, clientY: number) => {
      // Ignore mouse position for direction, always fire in ship's rotation (front)
      fireMissileAtAngle(gameState.current.player.rot);
    };

    const loop = (time: number) => {
      if (!gameState.current.paused) {
        update(time);
      }
      draw();
      requestRef.current = requestAnimationFrame(loop);
    };

    const update = (time: number) => {
      const { player, keys, torpedoes, missiles, powerups, effects, camera, world, mines } = gameState.current;
      const config = gameState.current.gameSettings;
      const currentLevel = gameState.current.level;

      // Player Movement (360 degrees)
      const rotationSpeed = 0.05;
      const acceleration = 0.15;
      const friction = 0.98;
      const baseMaxSpeed = 4.5 + (currentLevel * 0.3); // Upgraded speed as levels up
      const maxSpeed = baseMaxSpeed * (1 + player.speedLevel * 0.15);

      // Upgrade hull as levels up (visual parity)
      player.width = 60 + (currentLevel * 2);
      player.height = 25 + (currentLevel * 1);

      // Keyboard Controls
      if (keys['KeyA'] || keys['ArrowLeft']) player.rot -= rotationSpeed;
      if (keys['KeyD'] || keys['ArrowRight']) player.rot += rotationSpeed;
      if (keys['KeyW'] || keys['ArrowUp']) {
        player.speed += acceleration;
      } else if (keys['KeyS'] || keys['ArrowDown']) {
        player.speed -= acceleration * 0.5;
      }

      // Joystick Controls
      if (gameState.current.joystick.active) {
        const { x, y } = gameState.current.joystick;
        const mag = Math.hypot(x, y);
        if (mag > 0.1) {
          const targetRot = Math.atan2(y, x);
          const diff = (targetRot - player.rot + Math.PI * 3) % (Math.PI * 2) - Math.PI;
          player.rot += diff * 0.15;
          player.x += x * maxSpeed * mag;
          player.y += y * maxSpeed * mag;
          player.speed = mag * maxSpeed;
          gameState.current.distanceTraveled += mag * maxSpeed;
        }
      }

      // 1. Tactical Boundaries & Spawning Logic
      const distFromCenter = Math.max(Math.abs(player.x - 5000), Math.abs(player.y - 5000));
      const inInternationalWaters = distFromCenter < 1000;
      const inEnemyArea = distFromCenter >= 1000 && distFromCenter < 2000;
      
      // Update Out of Bounds logic removed as per request
      gameState.current.outOfBoundsTime = 0;
      
      const now = Date.now();

      // Track first entry for the 2s delay
      if (inEnemyArea && gameState.current.firstEntryToEnemyTime === 0) {
        gameState.current.firstEntryToEnemyTime = now;
      } else if (!inEnemyArea) {
        gameState.current.firstEntryToEnemyTime = 0;
      }

      // 1a. Player Mine Dropping
      const keysObj = gameState.current.keys;
      if (keysObj['Space']) {
        dropMine();
      }

      // Spawning Logic
      if (!paused) {
        // Enemy Ships: Spawn everywhere from start
        const targetShipCount = currentLevel === 1 ? 3 : 5;
        let shipSpawnRate = currentLevel === 1 ? 800 : 600; 
        
        if (gameState.current.enemyShips.length < targetShipCount && now - gameState.current.lastShipSpawn > shipSpawnRate) {
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDist = 800 + Math.random() * 400;
          const spawnX = player.x + Math.cos(spawnAngle) * spawnDist;
          const spawnY = player.y + Math.sin(spawnAngle) * spawnDist;

          gameState.current.enemyShips.push({
            x: spawnX,
            y: spawnY,
            rot: spawnAngle + Math.PI,
            health: 100 + (currentLevel * 50),
            lastFire: 0,
            id: Math.random()
          });
          gameState.current.lastShipSpawn = now;
        }

        // Water Mines (random spawning)
        if (Math.random() < 0.005) { 
          const spawnAngle = Math.random() * Math.PI * 2;
          const spawnDist = 1000;
          const spawnX = player.x + Math.cos(spawnAngle) * spawnDist;
          const spawnY = player.y + Math.sin(spawnAngle) * spawnDist;

          mines.push({
            x: spawnX,
            y: spawnY,
            id: Math.random(),
            isFriendly: false,
            spawnTime: now
          });
        }

        // Rescue Logic
        for (const boat of gameState.current.rescueBoats) {
          if (!boat.rescued) {
            const distToBoat = Math.hypot(player.x - boat.x, player.y - boat.y);
            if (distToBoat < 60) {
              boat.rescued = true;
              gameState.current.rescuedCount++;
              onRescuedCountChange(gameState.current.rescuedCount);
              gameState.current.score += 2000;
              onScoreChange(gameState.current.score);
              playSound('powerup');
              createExplosion(boat.x, boat.y, '#facc15');
            }
          }
        }

        // Check if level completed (Rescue all 3 boats)
        if (gameState.current.rescuedCount >= 3) {
          signalLevelComplete();
        }
      }

      // 1033:       // Check Rigid Boundaries (Don't let player go back too far or out of vertically)
      // Removed so player can cross boundaries to finish level


      // Update Mines
      mineLoop: for (let i = mines.length - 1; i >= 0; i--) {
        const m = mines[i];
        const now = Date.now();
        const distToPlayer = Math.hypot(player.x - m.x, player.y - m.y);
        
        // Arming delay: Friendly mines don't hit player for first 2 seconds
        const isArmed = !m.isFriendly || (now - (m.spawnTime || 0) > 2000);
        
        if (isArmed && distToPlayer < 40) {
          player.health -= 50; // Increased damage to 50 as requested
          onHealthChange(player.health);
          createExplosion(m.x, m.y, '#ffaa00');
          playSound('explosion');
          mines.splice(i, 1);
          if (player.health <= 0) onGameOver(gameState.current.score);
          continue;
        }

        // Check Mines vs Enemy Ships
        for (let j = gameState.current.enemyShips.length - 1; j >= 0; j--) {
          const ship = gameState.current.enemyShips[j];
          if (Math.hypot(ship.x - m.x, ship.y - m.y) < 50) {
            ship.health -= 50; // Mines damage enemies for 50 HP
            createExplosion(m.x, m.y, '#ffaa00');
            spawnPowerup(m.x, m.y); 
            mines.splice(i, 1);
            if (ship.health <= 0) {
              createExplosion(ship.x, ship.y, '#ef4444');
              gameState.current.enemyShips.splice(j, 1);
              gameState.current.score += 1000;
              onScoreChange(gameState.current.score);
            }
            continue mineLoop;
          }
        }
        
        if (distToPlayer > 2000) {
          mines.splice(i, 1);
        }
      }

      // Update Enemy Ships
      for (let i = gameState.current.enemyShips.length - 1; i >= 0; i--) {
        const enemy = gameState.current.enemyShips[i];
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const dist = Math.hypot(dx, dy);
        enemy.rot = Math.atan2(dy, dx);
        
        // Move towards player but keep distance
        if (dist > 400) {
          enemy.x += Math.cos(enemy.rot) * 3;
          enemy.y += Math.sin(enemy.rot) * 3;
        }

        // Fire at player
        const shipNow = Date.now();
        if (shipNow - enemy.lastFire > 2000) {
          gameState.current.missiles.push({
            x: enemy.x,
            y: enemy.y,
            rot: enemy.rot,
            speed: 8,
            id: Math.random(),
            isEnemy: true,
            sourceId: enemy.id,
            age: 0
          });
          enemy.lastFire = shipNow;
        }

        if (dist > 2500) {
          gameState.current.enemyShips.splice(i, 1);
        }
      }

      // Player movement calculations...
      player.speed *= friction;
      if (player.speed > maxSpeed) player.speed = maxSpeed;
      if (player.speed < -maxSpeed / 2) player.speed = -maxSpeed / 2;

      const dx = Math.cos(player.rot) * player.speed;
      const dy = Math.sin(player.rot) * player.speed;
      player.x += dx;
      player.y += dy;
      gameState.current.distanceTraveled += Math.hypot(dx, dy);

      // Smooth Camera Follow
      const lerpValue = 0.1;
      camera.x += (player.x - camera.x) * lerpValue;
      camera.y += (player.y - camera.y) * lerpValue;
      
      onDistanceChange(player.x);

      // Update Torpedoes (Homing behavior)
      torpedoLoop: for (let i = torpedoes.length - 1; i >= 0; i--) {
        const t = torpedoes[i];
        if (!t) {
          torpedoes.splice(i, 1);
          continue;
        }
        t.age++;
        
        // Homing logic (only if close)
        const distToPlayer = Math.hypot(player.x - t.x, player.y - t.y);
        if (distToPlayer < 600) {
            const targetRot = Math.atan2(player.y - t.y, player.x - t.x);
            let diff = targetRot - t.rot;
            while (diff < -Math.PI) diff += Math.PI * 2;
            while (diff > Math.PI) diff -= Math.PI * 2;
            t.rot += diff * 0.03;
        }
        
        t.x += Math.cos(t.rot) * t.speed;
        t.y += Math.sin(t.rot) * t.speed;

        // Collision with player
        if (distToPlayer < 40) {
          if (player.shields > 0) {
            player.shields -= 25;
            if (player.shields < 0) player.shields = 0;
            onShieldChange(player.shields);
            playSound('powerup');
            createExplosion(t.x, t.y, '#00f2ff');
          } else {
            // Damage hull
            player.health -= 20;
            if (player.health < 0) player.health = 0;
            onHealthChange(player.health);
            createExplosion(t.x, t.y, '#ff0000');
            playSound('explosion');
            if (player.health <= 0) {
              onGameOver(gameState.current.score);
            }
          }
          torpedoes.splice(i, 1);
          continue;
        }

        // Collision with other torpedoes
        for (let j = 0; j < torpedoes.length; j++) {
          if (i === j) continue;
          const other = torpedoes[j];
          if (!other) continue;
          if (Math.hypot(t.x - other.x, t.y - other.y) < 30) {
            const centerX = (t.x + other.x) / 2;
            const centerY = (t.y + other.y) / 2;
            createExplosion(centerX, centerY, '#ffaa00');
            spawnPowerup(centerX, centerY); // Bonus for torpedo collision
            
            // Safely remove both
            const first = Math.max(i, j);
            const second = Math.min(i, j);
            torpedoes.splice(first, 1);
            torpedoes.splice(second, 1);
            
            gameState.current.score += 50;
            onScoreChange(gameState.current.score);
            continue torpedoLoop;
          }
        }
      }

      // Update Missiles
      missileLoop: for (let i = missiles.length - 1; i >= 0; i--) {
        const m = missiles[i];
        if (!m) {
          missiles.splice(i, 1);
          continue;
        }
        m.age = (m.age || 0) + 1;
        m.x += Math.cos(m.rot) * m.speed;
        m.y += Math.sin(m.rot) * m.speed;
 
        let hit = false;
        
        // Intercept Enemy Missiles
        if (!m.isEnemy) {
          const enemyMissileIndex = missiles.findIndex((other, idx) => 
            idx !== i && other.isEnemy && Math.hypot(m.x - other.x, m.y - other.y) < 30
          );
          if (enemyMissileIndex !== -1) {
            createExplosion(m.x, m.y, '#ffffff');
            const high = Math.max(i, enemyMissileIndex);
            const low = Math.min(i, enemyMissileIndex);
            missiles.splice(high, 1);
            missiles.splice(low, 1);
            continue missileLoop; 
          }
        }

        // Check Missile collisions (Player hits Enemy, Enemy hits Player/Friendly)
        if (m.isEnemy) {
          // Enemy missile hitting player
          if (Math.hypot(m.x - player.x, m.y - player.y) < 40) {
            if (player.shields > 0) {
              player.shields -= 20;
              if (player.shields < 0) player.shields = 0;
              onShieldChange(player.shields);
            } else {
              player.health -= 15;
              onHealthChange(player.health);
              if (player.health <= 0) {
                onGameOver(gameState.current.score);
              }
            }
            createExplosion(m.x, m.y, '#ef4444');
            missiles.splice(i, 1);
            continue missileLoop;
          }

          // Friendly fire: Enemy missile hitting other enemy ships (as requested)
          for (let j = gameState.current.enemyShips.length - 1; j >= 0; j--) {
            const ship = gameState.current.enemyShips[j];
            if (m.sourceId !== ship.id && Math.hypot(m.x - ship.x, m.y - ship.y) < 50) {
              ship.health -= 30;
              createExplosion(m.x, m.y, '#ffffff');
              if (ship.health <= 0) {
                createExplosion(ship.x, ship.y, '#ef4444');
                gameState.current.enemyShips.splice(j, 1);
                gameState.current.score += 1000;
                onScoreChange(gameState.current.score);
              }
              missiles.splice(i, 1);
              continue missileLoop;
            }
          }
        } else {
          // Player missile hitting enemy ships
          for (let j = gameState.current.enemyShips.length - 1; j >= 0; j--) {
            const ship = gameState.current.enemyShips[j];
            if (Math.hypot(m.x - ship.x, m.y - ship.y) < 50) {
              ship.health -= 30;
              createExplosion(m.x, m.y, '#ffffff');
              if (ship.health <= 0) {
                createExplosion(ship.x, ship.y, '#ef4444');
                gameState.current.enemyShips.splice(j, 1);
                player.health = Math.min(100, player.health + 20);
                onHealthChange(player.health);
                gameState.current.score += 1000;
                onScoreChange(gameState.current.score);
              }
              missiles.splice(i, 1);
              continue missileLoop;
            }
          }
        }

        // Intercept Torpedoes
        for (let j = torpedoes.length - 1; j >= 0; j--) {
          const t = torpedoes[j];
          if (Math.hypot(m.x - t.x, m.y - t.y) < 30) {
            createExplosion(t.x, t.y, '#00ccff');
            spawnPowerup(t.x, t.y);
            torpedoes.splice(j, 1);
            missiles.splice(i, 1);
            gameState.current.score += 100;
            onScoreChange(gameState.current.score);
            continue missileLoop;
          }
        }

        if (Math.hypot(m.x - player.x, m.y - player.y) > 2000) {
          missiles.splice(i, 1);
        }
      }

      // Update Powerups
      for (let i = powerups.length - 1; i >= 0; i--) {
        const p = powerups[i];
        if (!p) {
          powerups.splice(i, 1);
          continue;
        }
        if (Math.hypot(player.x - p.x, player.y - p.y) < 40) {
          playSound('powerup');
          if (p.type === 'shield') {
            player.shields = Math.min(player.shields + 25, 50);
            onShieldChange(player.shields);
          } else if (p.type === 'repair') {
            player.health = Math.min(player.health + 20, player.maxHealth);
            onHealthChange(player.health);
          } else if (p.type === 'fireRate') {
            player.fireRateLevel = Math.min(player.fireRateLevel + 1, 5);
          } else if (p.type === 'multiShot') {
            player.multiShot = true;
          } else if (p.type === 'speed') {
            player.speedLevel = Math.min(player.speedLevel + 1, 5);
          }
          powerups.splice(i, 1);
          continue;
        }
        p.age++;
        if (p.age > 400) powerups.splice(i, 1);
      }

      // Update Effects
      for (let i = effects.length - 1; i >= 0; i--) {
        const e = effects[i];
        if (!e) {
          effects.splice(i, 1);
          continue;
        }
        e.age++;
        if (e.age > e.life) effects.splice(i, 1);
      }
      
      onTorpedoCountChange(torpedoes.length);
    };

    const playSound = (type: 'ping' | 'explosion' | 'missile' | 'powerup' | 'mine') => {
      if (!soundEnabled) return;
      try {
        const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (!AudioContextClass) return;
        const ctx = new AudioContextClass();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'mine') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(100, now);
          osc.frequency.exponentialRampToValueAtTime(40, now + 0.3);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start();
          osc.stop(now + 0.3);
        } else if (type === 'ping') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(800, now);
          osc.frequency.exponentialRampToValueAtTime(400, now + 0.5);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
          osc.start();
          osc.stop(now + 0.5);
        } else if (type === 'explosion') {
          osc.type = 'sawtooth';
          osc.frequency.setValueAtTime(100, now);
          osc.frequency.linearRampToValueAtTime(20, now + 0.4);
          gain.gain.setValueAtTime(0.1, now);
          gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
          osc.start();
          osc.stop(now + 0.4);
        } else if (type === 'missile') {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(200, now);
          osc.frequency.exponentialRampToValueAtTime(600, now + 0.1);
          gain.gain.setValueAtTime(0.03, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
          osc.start();
          osc.stop(now + 0.1);
        } else if (type === 'powerup') {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(400, now);
          osc.frequency.exponentialRampToValueAtTime(1200, now + 0.3);
          gain.gain.setValueAtTime(0.05, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
          osc.start();
          osc.stop(now + 0.3);
        }
      } catch (e) {
        // Silently fail if audio context is blocked by browser
      }
    };

    const spawnPowerup = (x: number, y: number) => {
      if (Math.random() > 0.3) return;
      playSound('powerup');
      
      const types = ['shield', 'repair', 'fireRate', 'multiShot', 'speed'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      gameState.current.powerups.push({
        x, y, 
        type,
        age: 0,
        id: Math.random()
      });
    };

    const createExplosion = (x: number, y: number, color: string) => {
      playSound('explosion');
      for (let i = 0; i < 15; i++) {
        gameState.current.effects.push({
          x, y,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 20 + Math.random() * 20,
          age: 0,
          size: 2 + Math.random() * 4,
          color
        });
      }
    };

    const draw = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const { player, torpedoes, missiles, powerups, effects, camera, world, stormData, glints, mines, enemyShips, gameSettings } = gameState.current;
      const config = gameSettings;

      // Deep Ocean Base
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Gradient Overlays (Fixed to viewport)
      const grad = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(0.5, '#020617');
      grad.addColorStop(1, '#000000');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // --- World Space Drawing ---
      ctx.save();
      ctx.translate(canvas.width / 2 - camera.x, canvas.height / 2 - camera.y);

      // --- 3D Naval Atmosphere: Parallax Ocean Layers ---
      const t = Date.now() / 1000;
      
      // Layer 1: Deep Caustics (Moves slowly for depth)
      ctx.save();
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.03)';
      ctx.lineWidth = 2;
      ctx.translate(-camera.x * 0.2, -camera.y * 0.2); 
      const rippleSize = 600;
      for (let x = -rippleSize; x < world.width + rippleSize; x += rippleSize) {
        for (let y = -rippleSize; y < world.height + rippleSize; y += rippleSize) {
          ctx.beginPath();
          ctx.ellipse(x + Math.sin(t + x) * 30, y + Math.cos(t + y) * 30, 250, 150, Math.sin(t * 0.2), 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Layer 2: Mid-depth Currents
      ctx.save();
      ctx.strokeStyle = 'rgba(14, 165, 233, 0.05)';
      ctx.lineWidth = 1;
      ctx.translate(-camera.x * 0.5, -camera.y * 0.5);
      for (let x = -1000; x < world.width + 1000; x += 400) {
        ctx.beginPath();
        for (let y = 0; y < world.height; y += 100) {
            ctx.lineTo(x + Math.sin((y + Date.now()/5) / 200) * 50, y);
        }
        ctx.stroke();
      }
      ctx.restore();

      // Draw Specular Glints (Sparkles)
      glints.forEach(g => {
        const flicker = Math.sin(t * 2 + g.x) * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${g.alpha * flicker * 0.4})`;
        ctx.beginPath();
        ctx.arc(g.x, g.y, g.size, 0, Math.PI * 2);
        ctx.fill();
        
        if (flicker > 0.8) {
            ctx.fillRect(g.x - 5, g.y, 10, 0.5);
        }
      });

      // Draw Storm Mist
      stormData.forEach(mist => {
        const distToPlayer = Math.hypot(player.x - mist.x, player.y - mist.y);
        const opacity = Math.max(0.01, 0.04 - (distToPlayer / 2000));
        ctx.fillStyle = `rgba(103, 232, 249, ${opacity})`;
        ctx.beginPath();
        ctx.arc(mist.x, mist.y, mist.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Layer 3: Surface Waves (Fastest) - World space but distinct
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
          const waveY = (t * 50 + i * 250) % world.height;
          ctx.beginPath();
          ctx.moveTo(0, waveY);
          ctx.lineTo(world.width, waveY + Math.sin(t + i) * 50);
          ctx.stroke();
      }

      // World Boundary Glow
      ctx.strokeStyle = '#0891b2';
      ctx.lineWidth = 4;
      ctx.shadowBlur = 0; // Ensure no shadow leaks to world bounds
      ctx.strokeRect(0, 0, world.width, world.height);

      // --- Zone Boundaries Removed ---

      // Draw Mines
      mines.forEach(m => {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(Date.now() / 1000);
        
        // Mine Body
        const mineGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 15);
        mineGrad.addColorStop(0, '#475569');
        mineGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = mineGrad;
        ctx.beginPath(); ctx.arc(0, 0, 15, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#ef4444'; ctx.lineWidth = 1; ctx.stroke();
        
        // Spikes
        ctx.fillStyle = '#1e293b';
        for(let i=0; i<8; i++) {
          ctx.rotate(Math.PI / 4);
          ctx.fillRect(12, -2, 8, 4);
        }
        
        // Blink
        if (Date.now() % 1000 < 500) {
          ctx.fillStyle = '#ef4444';
          ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
        }
        
        ctx.restore();
      });
 
      // Draw Rescue Boats
      gameState.current.rescueBoats.forEach(boat => {
        if (boat.rescued) return;
        ctx.save();
        ctx.translate(boat.x, boat.y);
        
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#facc15';
        
        // Small Boat Hull
        ctx.fillStyle = '#92400e';
        ctx.beginPath();
        ctx.ellipse(0, 0, 15, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // Person (Simplistic)
        ctx.fillStyle = '#fef08a';
        ctx.beginPath();
        ctx.arc(0, -2, 3, 0, Math.PI * 2);
        ctx.fill();
        
        // SOS Wave effect
        const pulse = (Math.sin(Date.now() / 300) + 1) / 2;
        ctx.strokeStyle = `rgba(250, 204, 21, ${0.5 * (1 - pulse)})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 10 + pulse * 40, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.restore();
      });

      // Draw Enemy Interceptor Ships
      enemyShips.forEach(ship => {
        ctx.save();
        ctx.translate(ship.x, ship.y);
        ctx.rotate(ship.rot);
        
        ctx.shadowBlur = 0; 
        ctx.shadowOffsetY = 0;
        
        const w = 60; 
        const h = 25;
        
        // 1. Hull (Stealth Pirate Frigate - Darker)
        const hullGrad = ctx.createLinearGradient(0, -h/2, 0, h/2);
        hullGrad.addColorStop(0, '#1e293b'); 
        hullGrad.addColorStop(0.5, '#020617'); 
        hullGrad.addColorStop(1, '#0f172a'); 
        
        ctx.fillStyle = hullGrad;
        ctx.strokeStyle = '#000000'; 
        ctx.lineWidth = 1;

        ctx.beginPath();
        // Aggressive Bow
        ctx.moveTo(w / 2 + 10, 0); 
        ctx.lineTo(w / 2 - 10, -h / 2);
        // Sloped flanks
        ctx.lineTo(0, -h / 2 - 2);
        ctx.lineTo(-w / 2 + 5, -h / 2);
        // Stern
        ctx.lineTo(-w / 2, -h / 2 + 6);
        ctx.lineTo(-w / 2, h / 2 - 6);
        // Sloped flanks
        ctx.lineTo(-w / 2 + 5, h / 2);
        ctx.lineTo(0, h / 2 + 2);
        ctx.lineTo(w / 2 - 10, h / 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // 2. Tactical Deck
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(w / 2 - 15, -h / 2 + 4);
        ctx.lineTo(-w / 2 + 10, -h / 2 + 4);
        ctx.lineTo(-w / 2 + 10, h / 2 - 4);
        ctx.lineTo(w / 2 - 15, h / 2 - 4);
        ctx.closePath();
        ctx.fill();

        // 3. Superstructure (Darker Blocks)
        const superGrad = ctx.createLinearGradient(0, -6, 0, 6);
        superGrad.addColorStop(0, '#1e293b');
        superGrad.addColorStop(0.5, '#020617');
        superGrad.addColorStop(1, '#0f172a');
        ctx.fillStyle = superGrad;
        ctx.beginPath();
        if (ctx.roundRect) {
          ctx.roundRect(-10, -8, 20, 16, 2);
        } else {
          ctx.rect(-10, -8, 20, 16);
        }
        ctx.fill();
        ctx.strokeStyle = '#000';
        ctx.stroke();

        // Top Bridge
        ctx.fillStyle = '#020617';
        ctx.fillRect(-2, -4, 10, 8);
        
        // 3a. Pirates Flag (Jolly Roger)
        ctx.save();
        ctx.translate(-22, 0); 
        
        // Flagpole
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, -10, 1.5, 20);
        
        // Black Flag
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.moveTo(1.5, -9);
        ctx.lineTo(16, -7 + Math.sin(Date.now()/200)*1.5);
        ctx.lineTo(16, 1 + Math.sin(Date.now()/200)*1.5);
        ctx.lineTo(1.5, 3);
        ctx.fill();
        
        // Skull
        ctx.fillStyle = '#cbd5e1';
        ctx.beginPath();
        ctx.arc(7, -3 + Math.sin(Date.now()/200)*1.5, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillRect(6, -1 + Math.sin(Date.now()/200)*1.5, 2, 1.5);
        
        ctx.restore();

        // 4. Turrets (3D Angular Design)
        const drawEnemyTurret = (tx: number, ty: number, tAngle: number) => {
          ctx.save();
          ctx.translate(tx, ty);
          ctx.rotate(tAngle);
          
          const tGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 7);
          tGrad.addColorStop(0, '#334155');
          tGrad.addColorStop(1, '#000');
          ctx.fillStyle = tGrad;
          ctx.strokeStyle = '#1e293b'; 
          ctx.beginPath();
          ctx.arc(0, 0, 7, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          
          ctx.fillStyle = '#475569';
          ctx.fillRect(5, -2, 8, 1.5);
          ctx.fillRect(5, 0.5, 8, 1.5);
          ctx.restore();
        };

        drawEnemyTurret(15, 0, 0);
        drawEnemyTurret(-10, 0, Math.PI);

        ctx.restore();
      });

      // Draw Effects
      effects.forEach(e => {
        if (!e) return;
        const p = 1 - (e.age / e.life);
        ctx.save();
        ctx.globalAlpha = p;
        
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x + e.vx * e.age, e.y + e.vy * e.age, e.size * p, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.restore();
      });
      ctx.globalAlpha = 1;

      // Draw Powerups
      powerups.forEach(p => {
        if (!p) return;
        ctx.save();
        ctx.translate(p.x, p.y);
        
        let color = '#fff';
        let icon = '?';

        switch(p.type) {
            case 'shield': color = '#c084fc'; icon = 'S'; break;
            case 'repair': color = '#4ade80'; icon = 'H'; break;
            case 'fireRate': color = '#facc15'; icon = 'F'; break;
            case 'multiShot': color = '#a855f7'; icon = 'M'; break;
            case 'speed': color = '#3b82f6'; icon = 'E'; break;
        }

        ctx.rotate(Date.now() / 1000);
        const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, 30);
        glow.addColorStop(0, `${color}44`);
        glow.addColorStop(1, 'transparent');
        ctx.fillStyle = glow;
        ctx.fillRect(-30, -30, 60, 60);
        
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.strokeRect(-12, -12, 24, 24);
        
        ctx.fillStyle = color;
        ctx.font = 'bold 12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(icon, 0, 5);
        ctx.restore();
      });

      // Draw Special Level-Up Bonus (Quantum Core)
      const specialBonus = gameState.current.specialBonus;
      if (specialBonus) {
        ctx.save();
        ctx.translate(specialBonus.x, specialBonus.y);
        const pulse = 1 + Math.sin(Date.now() / 200) * 0.2;
        const lifeLeft = 1 - (specialBonus.age / specialBonus.life);
        ctx.globalAlpha = lifeLeft;

        // Core glow
        const coreGlow = ctx.createRadialGradient(0, 0, 0, 0, 0, 60);
        coreGlow.addColorStop(0, 'rgba(255, 242, 0, 0.6)');
        coreGlow.addColorStop(0.5, 'rgba(255, 102, 0, 0.2)');
        coreGlow.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGlow;
        ctx.beginPath();
        ctx.arc(0, 0, 60 * pulse, 0, Math.PI * 2);
        ctx.fill();

        // Geometric core
        ctx.rotate(Date.now() / 500);
        ctx.strokeStyle = '#facc15';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#facc15';
        ctx.strokeRect(-15, -15, 30, 30);
        ctx.rotate(Math.PI / 4);
        ctx.strokeRect(-12, -12, 24, 24);

        ctx.fillStyle = '#facc15';
        ctx.font = 'bold 10px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText("UPLINK", 0, -25);
        
        ctx.restore();
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }

      // Draw Player Ship (Futuristic Protagonist Ship)
      ctx.save();
      ctx.translate(player.x, player.y);
      ctx.rotate(player.rot);

      // 1. Bottom Shadow (Subtle depth)
      if (!isMobile) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(0,0,0,0.5)';
          ctx.shadowOffsetY = 5;
      }

      // 2. Main Hull (Futuristic Protagonist Ship)
      const hullGrad = ctx.createLinearGradient(0, -player.height/2, 0, player.height/2);
      hullGrad.addColorStop(0, '#64748b'); // Titanium top
      hullGrad.addColorStop(0.5, '#0f172a'); // Deep stealth blue
      hullGrad.addColorStop(1, '#1e293b'); // Highlight bottom
      
      ctx.fillStyle = hullGrad;
      ctx.strokeStyle = '#22d3ee'; // Cyan tactical edges
      ctx.lineWidth = 1.5;

      ctx.beginPath();
      // Bow (Aggressive sharp tip)
      ctx.moveTo(player.width / 2 + 15, 0); 
      ctx.lineTo(player.width / 2 - 10, -player.height / 2);
      // Port Flank with stealth angles
      ctx.lineTo(0, -player.height / 2 - 2);
      ctx.lineTo(-player.width / 2 + 5, -player.height / 2);
      // Stern (Mine deployment bay)
      ctx.lineTo(-player.width / 2, -player.height / 2 + 8);
      ctx.lineTo(-player.width / 2, player.height / 2 - 8);
      // Starboard Flank
      ctx.lineTo(-player.width / 2 + 5, player.height / 2);
      ctx.lineTo(0, player.height / 2 + 2);
      ctx.lineTo(player.width / 2 - 10, player.height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;

      // 3. Deck Details
      ctx.fillStyle = '#020617';
      ctx.beginPath();
      ctx.moveTo(player.width / 2 - 15, -player.height / 2 + 6);
      ctx.lineTo(-player.width / 2 + 10, -player.height / 2 + 6);
      ctx.lineTo(-player.width / 2 + 10, player.height / 2 - 6);
      ctx.lineTo(player.width / 2 - 15, player.height / 2 - 6);
      ctx.closePath();
      ctx.fill();

      // 4. Integrated Weapon Mounts
      // Front Launcher (Railgun/Missile Silo)
      ctx.fillStyle = '#1e293b';
      ctx.strokeStyle = '#22d3ee';
      ctx.beginPath();
      ctx.moveTo(player.width / 2 - 20, -5);
      ctx.lineTo(player.width / 2 + 5, -3);
      ctx.lineTo(player.width / 2 + 5, 3);
      ctx.lineTo(player.width / 2 - 20, 5);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Rear Mine Rail
      ctx.fillStyle = '#334155';
      ctx.fillRect(-player.width / 2 + 5, -8, 15, 16);
      ctx.strokeStyle = '#94a3b8';
      ctx.strokeRect(-player.width / 2 + 5, -8, 15, 16);
      
      // Mine indicator lights
      ctx.fillStyle = (Date.now() % 1000 < 500) ? '#ef4444' : '#450a0a';
      ctx.fillRect(-player.width / 2 + 8, -6, 2, 2);
      ctx.fillRect(-player.width / 2 + 8, 4, 2, 2);

      // 5. Advanced Bridge
      const bridgeGrad = ctx.createLinearGradient(0, -5, 0, 5);
      bridgeGrad.addColorStop(0, '#1e293b');
      bridgeGrad.addColorStop(1, '#020617');
      ctx.fillStyle = bridgeGrad;
      ctx.beginPath();
      if (ctx.roundRect) {
        ctx.roundRect(-15, -8, 25, 16, 4);
      } else {
        ctx.rect(-15, -8, 25, 16);
      }
      ctx.fill();
      ctx.stroke();

      // Tactical Glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22d3ee';
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(5, -6, 2, 4);
      ctx.fillRect(5, 2, 2, 4);
      ctx.shadowBlur = 0;

      // Thrusters (Quad-Engine Setup)
      if (player.speed > 0.1) {
          const power = Math.abs(player.speed) / 5;
          ctx.fillStyle = '#22d3ee';
          ctx.shadowBlur = 15;
          ctx.shadowColor = '#22d3ee';
          
          for(let i=0; i<2; i++) {
              const y = (i === 0) ? -10 : 10;
              ctx.beginPath();
              ctx.arc(-player.width/2 - 2, y, 4 * power, 0, Math.PI * 2);
              ctx.fill();
              
              // Internal glow particles
              if (Math.random() > 0.3) {
                  ctx.fillStyle = '#fff';
                  ctx.fillRect(-player.width/2 - 10 - Math.random()*10, y + (Math.random()-0.5)*5, 2, 2);
              }
          }
          ctx.shadowBlur = 0;
      }

      // Shield Visual (Pulsing and geometric)
      if (player.shields > 0) {
        const p = (player.shields / 50);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.3 + Math.sin(Date.now()/150) * 0.1})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 54, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.setLineDash([5, 15]);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.1 + Math.sin(Date.now()/300) * 0.05})`;
        ctx.beginPath();
        ctx.arc(0, 0, 58, Date.now()/1000, Date.now()/1000 + Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        
        const shieldGrad = ctx.createRadialGradient(0, 0, 40, 0, 0, 54);
        shieldGrad.addColorStop(0, 'transparent');
        shieldGrad.addColorStop(1, `rgba(34, 211, 238, ${0.1 * p})`);
        ctx.fillStyle = shieldGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 54, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();

      // Draw Torpedoes
      torpedoes.forEach(t => {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.rot);
        
        ctx.fillStyle = '#1e293b';
        ctx.beginPath();
        if (ctx.roundRect) { ctx.roundRect(-12, -3, 24, 6, 3); }
        else { ctx.rect(-12, -3, 24, 6); }
        ctx.fill();
        
        ctx.fillStyle = '#ef4444';
        ctx.beginPath();
        ctx.arc(10, 0, 3, -Math.PI/2, Math.PI/2);
        ctx.fill();
        
        ctx.fillStyle = '#334155';
        ctx.fillRect(-12, -5, 4, 2);
        ctx.fillRect(-12, 3, 4, 2);

        ctx.restore();
      });

      // Draw Missiles
      missiles.forEach(m => {
        ctx.save();
        ctx.translate(m.x, m.y);
        ctx.rotate(m.rot);
        const missileColor = m.isEnemy ? '#ef4444' : '#00f2fe';
        ctx.fillStyle = missileColor;
        if (!isMobile) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = missileColor;
        }
        ctx.fillRect(-8, -2, 16, 4);
        ctx.restore();
      });
      ctx.shadowBlur = 0;
      // Draw UI / HUD Overlays (Mini-map)
      const mapSize = isMobile ? 110 : 130;
      const mapPadding = isMobile ? 15 : 20;
      
      ctx.save();
      // WE MUST RESET TRANSFORM TO SCREEN SPACE FOR HUD
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      
      // Map in Top Left (below the Hull stats)
      const hudHeight = isMobile ? 110 : 130;
      ctx.translate(mapPadding, hudHeight);
      
      // Map Background
      ctx.fillStyle = isMobile ? 'rgba(2, 6, 23, 0.4)' : 'rgba(2, 6, 23, 0.6)';
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(0, 0, mapSize, mapSize, 4);
      ctx.fill();
      ctx.stroke();

      // Grid Lines
      ctx.strokeStyle = 'rgba(34, 211, 238, 0.1)';
      for(let i = 1; i < 4; i++) {
        const pos = (mapSize / 4) * i;
        ctx.beginPath(); ctx.moveTo(pos, 0); ctx.lineTo(pos, mapSize); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(0, pos); ctx.lineTo(mapSize, pos); ctx.stroke();
      }

      const worldToMap = (val: number, max: number) => {
        const mapped = (val / max) * mapSize;
        return Math.max(0, Math.min(mapSize, mapped));
      };

      // Draw Player on Map
      const px = worldToMap(player.x, world.width);
      const py = worldToMap(player.y, world.height);
      ctx.fillStyle = '#22d3ee';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#22d3ee';
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw Enemy Ships on Map
      enemyShips.forEach(ship => {
        const sx = worldToMap(ship.x, world.width);
        const sy = worldToMap(ship.y, world.height);
        ctx.fillStyle = '#ef4444';
        ctx.fillRect(sx - 3, sy - 3, 6, 6);
      });

      // Draw Rescue Boats on Map
      gameState.current.rescueBoats.forEach(boat => {
        if (boat.rescued) return;
        const bx = worldToMap(boat.x, world.width);
        const by = worldToMap(boat.y, world.height);
        ctx.fillStyle = '#facc15';
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#facc15';
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      
      // Map Label
      ctx.fillStyle = 'rgba(34, 211, 238, 0.5)';
      ctx.font = 'bold 8px font-mono';
      ctx.textAlign = 'left';
      ctx.fillText("TACTICAL OVERLAY", 5, 12);
      
      ctx.restore();
      ctx.shadowBlur = 0;

      // --- Final HUD Layer (Out of Bounds Warning Removed) ---

      ctx.restore(); // Restore from world space translation
    };

    requestRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('game-fire', handleMobileAction as any);
      window.removeEventListener('level-reset', resetLevel);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [protagonist, antagonist]);

  return (
    <div ref={containerRef} className="w-full h-full cursor-crosshair">
      <canvas ref={canvasRef} />
    </div>
  );
}

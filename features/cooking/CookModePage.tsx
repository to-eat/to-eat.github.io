
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Check, ChevronRight, ChevronLeft, Play, Pause, RotateCcw, Award } from 'lucide-react';
import { useDataStore } from '@/store/useDataStore';
import { Button } from '@/components/atoms/Button';
import { toast } from 'sonner';

const CookModePage: React.FC = () => {
  const { orderId, itemId } = useParams();
  const navigate = useNavigate();
  const { mealKits } = useDataStore();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const kit = mealKits.find(k => k.id === itemId);
  const steps = kit?.steps || [];
  const currentStep = steps[currentStepIndex];

  useEffect(() => {
    // Reset timer when step changes
    setTimerActive(false);
    if (timerRef.current) clearInterval(timerRef.current);
    
    if (currentStep?.duration) {
      setTimeLeft(currentStep.duration);
    } else {
      setTimeLeft(0);
    }
  }, [currentStep]);

  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setTimerActive(false);
            toast.success("Timer Finished!");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  if (!kit) return <div>Recipe not found</div>;

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Completed
      toast.success("Bon Appétit! Meal prepared successfully.");
      navigate(`/tracking/${orderId}`);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const toggleTimer = () => setTimerActive(!timerActive);
  const resetTimer = () => {
    setTimerActive(false);
    setTimeLeft(currentStep.duration || 0);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progress = ((currentStepIndex + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Bar */}
      <div className="p-4 flex justify-between items-center bg-gray-800 border-b border-gray-700">
        <button onClick={() => navigate(-1)} className="text-gray-400 hover:text-white">
          <ArrowLeft size={24} />
        </button>
        <div className="flex-1 px-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1 font-bold tracking-wider">
            <span>STEP {currentStepIndex + 1} OF {steps.length}</span>
            <span>{kit.title}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-brand-500 h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <div className="w-6"></div> {/* Spacer */}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row h-full overflow-hidden">
        
        {/* Instruction Area */}
        <div className="flex-1 p-8 flex flex-col justify-center items-center relative overflow-y-auto">
           {/* Background decorative image if available, blurred */}
           {kit.image && (
             <div 
               className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
               style={{ backgroundImage: `url(${kit.image})` }}
             ></div>
           )}

           <div className="max-w-2xl w-full z-10 space-y-8">
             <div className="bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl border border-gray-700 shadow-2xl">
               <div className="flex items-start gap-6">
                 <div className="w-12 h-12 bg-brand-500 rounded-full flex items-center justify-center text-2xl font-bold shrink-0 shadow-lg shadow-brand-500/30">
                   {currentStep.order}
                 </div>
                 <div className="flex-1">
                   <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-6">
                     {currentStep.instruction}
                   </h2>
                   
                   {currentStep.tip && (
                     <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 flex gap-3 text-blue-200 text-sm">
                       <Award size={20} className="shrink-0 text-blue-400" />
                       <p><span className="font-bold text-blue-400">Pro Tip:</span> {currentStep.tip}</p>
                     </div>
                   )}
                 </div>
               </div>
             </div>

             {/* Timer Section */}
             {currentStep.duration && (
               <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-3xl border border-gray-700 flex flex-col items-center">
                 <div className="text-6xl font-mono font-bold text-white mb-6 tabular-nums tracking-widest">
                   {formatTime(timeLeft)}
                 </div>
                 <div className="flex gap-4">
                   <button 
                     onClick={toggleTimer}
                     className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                       timerActive ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' : 'bg-green-500 hover:bg-green-600 text-white'
                     }`}
                   >
                     {timerActive ? <Pause size={28} /> : <Play size={28} className="ml-1" />}
                   </button>
                   <button 
                     onClick={resetTimer}
                     className="w-16 h-16 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white transition-all"
                   >
                     <RotateCcw size={24} />
                   </button>
                 </div>
                 <p className="text-gray-400 text-sm mt-4 font-bold uppercase tracking-wider">Timer</p>
               </div>
             )}
           </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="p-6 bg-gray-800 border-t border-gray-700 flex justify-between items-center">
        <button 
          onClick={handlePrev}
          disabled={currentStepIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all ${
            currentStepIndex === 0 ? 'text-gray-600 cursor-not-allowed' : 'text-white hover:bg-gray-700'
          }`}
        >
          <ChevronLeft size={20} /> Previous
        </button>

        <Button 
          size="lg" 
          onClick={handleNext}
          className="px-8 py-4 text-lg bg-white text-brand-900 hover:bg-gray-100 flex items-center gap-2"
        >
          {currentStepIndex === steps.length - 1 ? (
            <>Finish Cooking <Check size={20} /></>
          ) : (
            <>Next Step <ChevronRight size={20} /></>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CookModePage;

import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'
import axios from "axios"
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const { interviewId, questions, userName } = interviewData;
  const [isIntroPhase, setIsIntroPhase] = useState(true);

  const [isMicOn, setIsMicOn] = useState(true);
  const recognitionRef = useRef(null);
  const [isAIPlaying, setIsAIPlaying] = useState(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(
    questions[0]?.timeLimit || 60
  );
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [voiceGender, setVoiceGender] = useState("female");
  const [subtitle, setSubtitle] = useState("");

  const videoRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      // Try known female voices first
      const femaleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
        );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      // Try known male voices
      const maleVoice =
        voices.find(v =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
        );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
        return;
      }

      // Fallback: first voice (assume female)
      setSelectedVoice(voices[0]);
      setVoiceGender("female");
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

  }, [])

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  /* ---------------- SPEAK FUNCTION ---------------- */
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel();

      // Add natural pauses after commas and periods
      const humanText = text
        .replace(/,/g, ", ... ")
        .replace(/\./g, ". ... ");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;

      // Human-like pacing
      utterance.rate = 0.92;     // slightly slower than normal
      utterance.pitch = 1.05;    // small warmth
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic()
        videoRef.current?.play();
      };


      utterance.onend = () => {
        videoRef.current?.pause();
        videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if (isMicOn) {
          startMic();
        }
        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };


      setSubtitle(text);

      window.speechSynthesis.speak(utterance);
    });
  };


  useEffect(() => {
    if (!selectedVoice) {
      return;
    }
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to meet you today. I hope you're feeling confident and ready.`
        );

        await speakText(
          "I'll ask you a few questions. Just answer naturally, and take your time. Let's begin."
        );

        setIsIntroPhase(false)
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        // If last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging.");
        }

        await speakText(currentQuestion.question);

        if (isMicOn) {
          startMic();
        }
      }

    }

    runIntro()

  }, [selectedVoice, isIntroPhase, currentIndex])



  useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0;
        }
        return prev - 1

      })
    }, 1000);

    return () => clearInterval(timer)

  }, [isIntroPhase, currentIndex])

  useEffect(() => {
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);


  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) return;

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript;

      setAnswer((prev) => prev + " " + transcript);
    };

    recognitionRef.current = recognition;

  }, []);


  const startMic = () => {
    if (recognitionRef.current && !isAIPlaying) {
      try {
        recognitionRef.current.start();
      } catch { }
    }
  };

  const stopMic = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };
  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
    } else {
      startMic();
    }
    setIsMicOn(!isMicOn);
  };


  const submitAnswer = async () => {
    if (isSubmitting) return;
    stopMic()
    setIsSubmitting(true)

    try {
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken:
          currentQuestion.timeLimit - timeLeft,
      } , {withCredentials:true})

      setFeedback(result.data.feedback)
      speakText(result.data.feedback)
      setIsSubmitting(false)
    } catch (error) {
      console.log(error)
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length) {
      finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);
  }

  const finishInterview = async () => {
    stopMic()
    setIsMicOn(false)
    try {
      const result = await axios.post(ServerUrl+ "/api/interview/finish" , { interviewId} , {withCredentials:true})

      console.log(result.data)
      onFinish(result.data)
    } catch (error) {
      console.log(error)
    }
  }


   useEffect(() => {
    if (isIntroPhase) return;
    if (!currentQuestion) return;

    if (timeLeft === 0 && !isSubmitting && !feedback) {
      submitAnswer()
    }
  }, [timeLeft]);

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);

  return (
    <div className='min-h-screen bg-zinc-950 bg-grid-pattern flex items-center justify-center p-4 sm:p-6 relative overflow-hidden'>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none"></div>

      <div className='w-full max-w-6xl min-h-[80vh] bg-zinc-900/60 backdrop-blur-xl rounded-[32px] shadow-2xl border border-white/10 flex flex-col lg:flex-row overflow-hidden relative z-10'>

        {/* Video / Status Section */}
        <div className='w-full lg:w-[35%] bg-zinc-950/40 backdrop-blur-md flex flex-col items-center p-6 space-y-6 border-r border-white/5'>
          
          {/* Video Player */}
          <div className='w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative group bg-zinc-900 aspect-video flex items-center justify-center'>
            <video
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
            />
            {/* Live Indicator Overlay */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 absolute"></span>
              <span className="text-[10px] text-zinc-300 font-bold uppercase tracking-wider">AI Live</span>
            </div>
          </div>

          {/* Subtitle Display */}
          {subtitle && (
            <div className='w-full max-w-md bg-zinc-900/70 border border-white/5 rounded-2xl p-4.5 shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-300'>
              <p className='text-zinc-200 text-sm sm:text-base font-medium text-center leading-relaxed'>{subtitle}</p>
            </div>
          )}

          {/* Status and Timer Panel */}
          <div className='w-full max-w-md bg-zinc-900/40 border border-white/5 rounded-2xl shadow-xl p-6 space-y-5'>
            <div className='flex justify-between items-center'>
              <span className='text-xs text-zinc-400 font-bold uppercase tracking-wider'>
                Interview Status
              </span>
              {isAIPlaying && (
                <span className='bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full animate-pulse'>
                  AI Speaking
                </span>
              )}
            </div>

            <div className="h-px bg-white/5"></div>

            <div className='flex justify-center py-2'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit} />
            </div>

            <div className="h-px bg-white/5"></div>

            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className="bg-zinc-950/30 p-3 rounded-xl border border-white/5">
                <span className='block text-2xl font-bold text-emerald-400'>{currentIndex + 1}</span>
                <span className='text-[10px] text-zinc-500 font-bold uppercase tracking-wider'>Current</span>
              </div>

              <div className="bg-zinc-950/30 p-3 rounded-xl border border-white/5">
                <span className='block text-2xl font-bold text-emerald-400'>{questions.length}</span>
                <span className='text-[10px] text-zinc-500 font-bold uppercase tracking-wider'>Total Questions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interaction Pane */}
        <div className='flex-1 flex flex-col p-6 sm:p-8 md:p-10 relative bg-transparent'>
          <h2 className='text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 mb-6 tracking-tight'>
            AI Smart Interview Console
          </h2>

          {!isIntroPhase && (
            <div className='relative mb-6 bg-zinc-950/40 p-6 rounded-2xl border border-white/5 shadow-inner animate-in fade-in duration-300'>
              <p className='text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-2'>
                Question {currentIndex + 1} of {questions.length}
              </p>
              <div className='text-base sm:text-lg font-bold text-white leading-relaxed'>{currentQuestion?.question}</div>
            </div>
          )}

          <textarea
            placeholder="Type or dictate your answer here..."
            onChange={(e) => setAnswer(e.target.value)}
            value={answer}
            className="flex-1 bg-zinc-950/60 p-6 rounded-2xl resize-none outline-none border border-white/5 focus:border-emerald-500/40 focus:ring-1 focus:ring-emerald-500/40 transition duration-300 text-zinc-200 placeholder-zinc-600 text-base shadow-inner leading-relaxed" 
          />

          {!feedback ? (
            <div className='flex items-center gap-4 mt-6'>
              <motion.button
                onClick={toggleMic}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className={`w-14 h-14 flex items-center justify-center rounded-2xl border transition-all duration-300 cursor-pointer shadow-lg ${
                  isMicOn 
                    ? 'bg-red-950/40 text-red-400 border-red-500/30 hover:bg-red-950/60 animate-pulse' 
                    : 'bg-zinc-800 text-zinc-400 border-white/5 hover:bg-zinc-700 hover:text-white'
                }`}>
                {isMicOn ? <FaMicrophone size={20} /> : <FaMicrophoneSlash size={20}/>}
              </motion.button>

              <motion.button
                onClick={submitAnswer}
                disabled={isSubmitting || !answer.trim()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none text-white py-4 rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition font-bold cursor-pointer text-sm sm:text-base'>
                {isSubmitting ? "Submitting Answer..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className='mt-6 bg-emerald-950/20 border border-emerald-500/20 p-6 rounded-2xl shadow-lg'>
              <p className='text-xs text-emerald-400 font-bold uppercase tracking-wider mb-2'>AI Feedback</p>
              <p className='text-zinc-200 font-medium mb-5 leading-relaxed text-sm sm:text-base'>{feedback}</p>

              <button
                onClick={handleNext}
                className='w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer text-sm sm:text-base'>
                Next Question <BsArrowRight size={18}/>
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Step2Interview

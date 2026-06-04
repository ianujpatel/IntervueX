import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({isModel = false}) {
    const dispatch = useDispatch()

    const handleGoogleAuth = async () => {
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            const result = await axios.post(ServerUrl + "/api/auth/google" , {name , email} , {withCredentials:true})
            dispatch(setUserData(result.data))
            
        } catch (error) {
            console.log(error)
              dispatch(setUserData(null))
        }
    }
  return (
    <div className={`
      w-full flex items-center justify-center
      ${isModel ? "py-4" : "min-h-screen bg-zinc-950 bg-grid-pattern flex items-center justify-center px-6 py-20 relative overflow-hidden"}
    `}>
        {!isModel && (
          <>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '4s' }}></div>
          </>
        )}

        <motion.div 
        initial={{opacity:0 , y:-40}} 
        animate={{opacity:1 , y:0}} 
        transition={{duration:0.6, ease: "easeOut"}}
        className={`
          w-full relative z-10
          ${isModel ? "max-w-md p-8 rounded-3xl" : "max-w-lg p-12 rounded-[32px]"}
          bg-zinc-900/60 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/80
        `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2.5 rounded-xl shadow-lg shadow-emerald-500/20'>
                    <BsRobot size={18}/>
                </div>
                <h2 className='font-bold text-white text-lg tracking-wide'>InterviewIQ.AI</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-bold text-center leading-snug mb-5 text-white'>
                Continue with
                <span className='bg-emerald-950/50 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full inline-flex items-center gap-2 mt-2 md:mt-0 md:ml-2 text-base md:text-lg'>
                    <IoSparkles size={16} className='text-emerald-400 animate-pulse'/>
                    AI Smart Interview
                </span>
            </h1>

            <p className='text-zinc-400 text-center text-sm md:text-base leading-relaxed mb-8 max-w-sm mx-auto'>
                Sign in to start AI-powered mock interviews,
                track your progress, and unlock detailed performance insights.
            </p>

            <motion.button 
            onClick={handleGoogleAuth}
            whileHover={{opacity:0.95 , scale:1.02}}
            whileTap={{opacity:1 , scale:0.98}}
            className='w-full flex items-center justify-center gap-3 py-3.5 bg-white text-zinc-950 font-bold rounded-full shadow-lg shadow-white/5 transition-all duration-300 hover:shadow-white/10 cursor-pointer'>
                <FcGoogle size={20}/>
                Continue with Google
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import { BsRobot, BsCoin } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAstronaut } from "react-icons/fa";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ServerUrl } from '../App';
import { setUserData } from '../redux/userSlice';
import AuthModel from './AuthModel';

function Navbar() {
    const {userData} = useSelector((state)=>state.user)
    const [showCreditPopup,setShowCreditPopup] = useState(false)
    const [showUserPopup,setShowUserPopup] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [showAuth, setShowAuth] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.get(ServerUrl + "/api/auth/logout" , {withCredentials:true})
            dispatch(setUserData(null))
            setShowCreditPopup(false)
            setShowUserPopup(false)
            navigate("/")

        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className='sticky top-0 z-50 flex justify-center px-4 pt-6 bg-zinc-950/20 backdrop-blur-md pb-4'>
        <motion.div 
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1 , y:0}}
        transition={{duration: 0.3}}
        className='w-full max-w-6xl bg-zinc-900/60 backdrop-blur-md rounded-[24px] shadow-2xl border border-white/5 px-8 py-4 flex justify-between items-center relative'>
            <div onClick={() => navigate("/")} className='flex items-center gap-3 cursor-pointer group'>
                <div className='bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20 group-hover:scale-105'>
                    <BsRobot size={18}/>
                </div>
                <h1 className='font-bold hidden md:block text-lg bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400 group-hover:from-white group-hover:to-emerald-400 transition-all duration-300'>InterviewIQ.AI</h1>
            </div>

            <div className='flex items-center gap-6 relative'>
                <div className='relative'>
                    <button onClick={()=>{
                        if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowCreditPopup(!showCreditPopup);
                        setShowUserPopup(false)
                    }} className='flex items-center gap-2 bg-zinc-800/40 hover:bg-zinc-800/80 border border-white/5 hover:border-emerald-500/30 px-4 py-2 rounded-full text-md transition duration-300 text-zinc-100 shadow-md group'>
                        <BsCoin size={18} className='text-emerald-400 group-hover:rotate-12 transition-transform duration-300'/>
                        <span className='font-medium'>{userData?.credits || 0}</span>
                    </button>

                    {showCreditPopup && (
                        <div className='absolute right-0 mt-3 w-64 bg-zinc-900/95 backdrop-blur-lg shadow-2xl border border-white/10 rounded-2xl p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                            <p className='text-sm text-zinc-400 mb-4'>Need more credits to continue mock interviews?</p>
                            <button onClick={() => {
                                setShowCreditPopup(false);
                                navigate("/pricing");
                            }} className='w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30'>Buy more credits</button>
                        </div>
                    )}
                </div>

                <div className='relative'>
                    <button
                    onClick={()=>{
                         if(!userData){
                            setShowAuth(true)
                            return;
                        }
                        setShowUserPopup(!showUserPopup);
                        setShowCreditPopup(false)
                    }} className='w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center font-bold border border-white/10 hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all duration-300 cursor-pointer shadow-md'>
                        {userData ? userData?.name.slice(0,1).toUpperCase() : <FaUserAstronaut size={16}/>}
                    </button>

                    {showUserPopup && (
                        <div className='absolute right-0 mt-3 w-52 bg-zinc-900/95 backdrop-blur-lg shadow-2xl border border-white/10 rounded-2xl p-3.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200'>
                            <p className='text-sm text-emerald-400 font-semibold px-2 mb-2 truncate border-b border-white/5 pb-2'>{userData?.name}</p>

                            <button onClick={() => {
                                setShowUserPopup(false);
                                navigate("/history");
                            }} className='w-full text-left text-sm py-2 px-2 hover:bg-white/5 rounded-lg text-zinc-400 hover:text-white transition duration-200'>Interview History</button>
                            
                            <button onClick={handleLogout} 
                            className='w-full text-left text-sm py-2 px-2 flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-lg transition duration-200 mt-1'>
                                <HiOutlineLogout size={16}/>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>

        {showAuth && <AuthModel onClose={()=>setShowAuth(false)}/>}
    </div>
  )
}

export default Navbar

import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from "react-icons/fa";
import Auth from '../pages/auth';

function AuthModel({onClose}) {
    const {userData} = useSelector((state)=>state.user)

    useEffect(()=>{
        if(userData){
            onClose()
        }

    },[userData , onClose])

  return (
    <div className='fixed inset-0 z-[999] flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl px-4 animate-in fade-in duration-300'>
        <div className='relative w-full max-w-md'>
            <button onClick={onClose} className='absolute top-6 right-6 z-20 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 p-2 rounded-xl border border-white/10 transition-all duration-200 cursor-pointer'>
             <FaTimes size={14}/>
            </button>
            <Auth isModel={true}/>
        </div>
    </div>
  )
}

export default AuthModel

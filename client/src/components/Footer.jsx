import React from 'react'
import { BsRobot } from 'react-icons/bs'

function Footer() {
  return (
    <div className='bg-transparent flex justify-center px-4 pb-10 pt-16'>
      <div className='w-full max-w-6xl bg-zinc-900/40 backdrop-blur-md rounded-[24px] shadow-xl border border-white/5 py-8 px-4 text-center'>
        <div className='flex justify-center items-center gap-3 mb-3'>
            <div className='bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-2 rounded-xl shadow-md'>
              <BsRobot size={16}/>
            </div>
            <h2 className='font-bold text-white tracking-wide'>InterviewIQ.AI</h2>
        </div>
        <p className='text-zinc-400 text-sm max-w-xl mx-auto leading-relaxed mt-2'>
          AI-powered interview preparation platform designed to improve
          communication skills, technical depth, and professional confidence.
        </p>
        <p className='text-zinc-600 text-xs mt-6'>
          © {new Date().getFullYear()} InterviewIQ.AI. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer

import React from 'react'
import { motion } from "motion/react"
import {
    FaUserTie,
    FaBriefcase,
    FaFileUpload,
    FaMicrophoneAlt,
    FaChartLine,
} from "react-icons/fa";
import { useState } from 'react';
import axios from "axios"
import { ServerUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Step1SetUp({ onStart }) {
    const {userData}= useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const [role, setRole] = useState("");
    const [experience, setExperience] = useState("");
    const [mode, setMode] = useState("Technical");
    const [resumeFile, setResumeFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resumeText, setResumeText] = useState("");
    const [analysisDone, setAnalysisDone] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const handleUploadResume = async () => {
        if (!resumeFile || analyzing) return;
        setAnalyzing(true)

        const formdata = new FormData()
        formdata.append("resume", resumeFile)

        try {
            const result = await axios.post(ServerUrl + "/api/interview/resume", formdata, { withCredentials: true })

            console.log(result.data)

            setRole(result.data.role || "");
            setExperience(result.data.experience || "");
            setProjects(result.data.projects || []);
            setSkills(result.data.skills || []);
            setResumeText(result.data.resumeText || "");
            setAnalysisDone(true);

            setAnalyzing(false);

        } catch (error) {
            console.log(error)
            setAnalyzing(false);
        }
    }

    const handleStart = async () => {
        setLoading(true)
        try {
           const result = await axios.post(ServerUrl + "/api/interview/generate-questions" , {role, experience, mode , resumeText, projects, skills } , {withCredentials:true}) 
           console.log(result.data)
           if(userData){
            dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
           }
           setLoading(false)
           onStart(result.data)

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='min-h-screen flex items-center justify-center bg-zinc-950 bg-grid-pattern px-4 py-12 relative overflow-hidden'>
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/5 via-transparent to-teal-500/5 pointer-events-none"></div>

            <div className='w-full max-w-5xl bg-zinc-900/60 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl grid md:grid-cols-2 overflow-hidden relative z-10'>

                {/* Left Panel */}
                <motion.div
                    initial={{ x: -40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className='relative bg-gradient-to-b from-zinc-900/90 to-zinc-950/90 p-10 md:p-12 border-r border-white/5 flex flex-col justify-center'>

                    <h2 className="text-3xl font-extrabold text-white mb-5 tracking-tight">
                        Start Your AI Interview
                    </h2>

                    <p className="text-zinc-400 text-sm leading-relaxed mb-10">
                        Practice real interview scenarios powered by advanced AI.
                        Elevate communication skills, close technical gaps, and build your confidence today.
                    </p>

                    <div className='space-y-4'>
                        {
                            [
                                {
                                    icon: <FaUserTie className="text-emerald-400 text-lg" />,
                                    text: "Choose Target Role & Experience",
                                },
                                {
                                    icon: <FaMicrophoneAlt className="text-emerald-400 text-lg" />,
                                    text: "Smart Voice Interactive Interview",
                                },
                                {
                                    icon: <FaChartLine className="text-emerald-400 text-lg" />,
                                    text: "Real-time Performance Analytics",
                                },
                            ].map((item, index) => (
                                <motion.div key={index}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + index * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    className='flex items-center space-x-4 bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 p-4 rounded-2xl shadow-md cursor-pointer transition duration-300'>
                                    <div className="bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                                      {item.icon}
                                    </div>
                                    <span className='text-zinc-200 font-semibold text-sm tracking-wide'>{item.text}</span>
                                </motion.div>
                            ))
                        }
                    </div>
                </motion.div>

                {/* Right Panel (Inputs) */}
                <motion.div
                    initial={{ x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="p-10 md:p-12 bg-transparent flex flex-col justify-center">

                    <h2 className='text-2xl font-bold text-white mb-8 tracking-tight'>
                        Interview Setup
                    </h2>

                    <div className='space-y-5'>
                        {/* Role Input */}
                        <div className='relative'>
                            <FaUserTie className='absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400' />
                            <input type='text' placeholder='Enter target role (e.g. React Developer)'
                                className='w-full pl-12 pr-4 py-3.5 bg-zinc-950/60 border border-white/10 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-zinc-100 placeholder-zinc-500 transition duration-200 text-sm'
                                onChange={(e) => setRole(e.target.value)} value={role} />
                        </div>

                        {/* Experience Input */}
                        <div className='relative'>
                            <FaBriefcase className='absolute top-1/2 -translate-y-1/2 left-4 text-zinc-400' />
                            <input type='text' placeholder='Experience level (e.g. 2 years)'
                                className='w-full pl-12 pr-4 py-3.5 bg-zinc-950/60 border border-white/10 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-zinc-100 placeholder-zinc-500 transition duration-200 text-sm'
                                onChange={(e) => setExperience(e.target.value)} value={experience} />
                        </div>

                        {/* Mode Select */}
                        <div className='relative'>
                            <select value={mode}
                                onChange={(e) => setMode(e.target.value)}
                                className='w-full py-3.5 px-4 bg-zinc-950/60 border border-white/10 rounded-2xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none text-zinc-100 transition duration-200 cursor-pointer text-sm appearance-none'>
                                <option value="Technical" className="bg-zinc-900 text-white">Technical Interview</option>
                                <option value="HR" className="bg-zinc-900 text-white">HR Interview</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-zinc-400">
                              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                            </div>
                        </div>

                        {/* Resume Upload Module */}
                        {!analysisDone && (
                            <motion.div
                                whileHover={{ scale: 1.01 }}
                                onClick={() => document.getElementById("resumeUpload").click()}
                                className='border border-dashed border-zinc-800 hover:border-emerald-500/40 bg-zinc-950/30 hover:bg-zinc-900/30 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300'>

                                <FaFileUpload className='text-3xl mx-auto text-emerald-400 mb-3' />

                                <input type="file"
                                    accept="application/pdf"
                                    id="resumeUpload"
                                    className='hidden'
                                    onChange={(e) => setResumeFile(e.target.files[0])} />

                                <p className='text-zinc-400 text-sm font-medium truncate px-4'>
                                    {resumeFile ? resumeFile.name : "Upload resume to customize questions (Optional)"}
                                </p>

                                {resumeFile && (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleUploadResume()
                                        }}
                                        className='mt-4 bg-white text-zinc-950 px-5 py-2 rounded-xl text-xs font-bold transition duration-200 hover:bg-zinc-200 shadow-md cursor-pointer'>
                                        {analyzing ? "Analyzing..." : "Analyze Resume"}
                                    </motion.button>
                                )}
                            </motion.div>
                        )}

                        {/* Resume Analysis Result */}
                        {analysisDone && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className='bg-zinc-950/40 border border-white/5 rounded-2xl p-5 space-y-4'>
                                <h3 className='text-sm font-bold text-zinc-200'>
                                    Resume Analysis Result
                                </h3>

                                {projects.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold text-zinc-400 mb-1.5'>
                                            Extracted Projects:
                                        </p>
                                        <ul className='list-disc list-inside text-zinc-300 text-xs space-y-1 pl-1'>
                                            {projects.map((p, i) => (
                                                <li key={i} className="truncate">{p}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {skills.length > 0 && (
                                    <div>
                                        <p className='text-xs font-semibold text-zinc-400 mb-1.5'>
                                            Extracted Skills:
                                        </p>
                                        <div className='flex flex-wrap gap-1.5'>
                                            {skills.map((s, i) => (
                                                <span key={i} className='bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-lg text-[10px] font-semibold tracking-wide'>
                                                  {s}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Submit button */}
                        <motion.button
                            onClick={handleStart}
                            disabled={!role || !experience || loading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className='w-full disabled:bg-zinc-800 disabled:text-zinc-600 disabled:shadow-none bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white py-3.5 rounded-full text-base font-bold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 cursor-pointer mt-4'>
                            {loading ? "Starting..." : "Start Interview"}
                        </motion.button>
                    </div>

                </motion.div>
            </div>
        </motion.div>
    )
}

export default Step1SetUp

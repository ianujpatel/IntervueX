import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ServerUrl } from '../App'
import { FaArrowLeft } from 'react-icons/fa'

function InterviewHistory() {
    const [interviews, setInterviews] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const getMyInterviews = async () => {
            try {
                const result = await axios.get(ServerUrl + "/api/interview/get-interview", { withCredentials: true })

                setInterviews(result.data)

            } catch (error) {
                console.log(error)
            }

        }

        getMyInterviews()

    }, [])


    return (
        <div className='min-h-screen bg-zinc-950 bg-grid-pattern py-16 relative overflow-hidden' >
            {/* Background Glow */}
            <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

            <div className='w-[90vw] lg:w-[70vw] max-w-5xl mx-auto relative z-10'>

                <div className='mb-10 w-full flex items-start gap-4 flex-wrap'>
                    <button
                        onClick={() => navigate("/")}
                        className='p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-white transition duration-200 cursor-pointer shadow-lg'>
                        <FaArrowLeft />
                    </button>

                    <div>
                        <h1 className='text-3xl font-extrabold text-white tracking-tight'>
                            Interview History
                        </h1>
                        <p className='text-zinc-400 text-sm mt-1'>
                            Track your past interviews and performance reports
                        </p>
                    </div>
                </div>


                {interviews.length === 0 ?
                    <div className='bg-zinc-900/60 backdrop-blur-md p-16 rounded-[28px] border border-white/5 text-center shadow-xl'>
                        <p className='text-zinc-400 font-medium'>
                            No interviews found. Start your first mock interview.
                        </p>
                    </div>

                    :

                    <div className='grid gap-4'>
                        {interviews.map((item, index) => (
                            <div key={index}
                             onClick={()=>navigate(`/report/${item._id}`)}
                             className='bg-zinc-900/40 backdrop-blur-md p-6 rounded-2xl border border-white/5 hover:border-emerald-500/30 hover:bg-zinc-900/60 shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 cursor-pointer'>
                                <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-6'>
                                    <div>
                                        <h3 className="text-lg font-bold text-white tracking-wide">
                                            {item.role}
                                        </h3>

                                        <p className="text-zinc-400 text-sm mt-1">
                                            {item.experience} • {item.mode}
                                        </p>

                                        <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold mt-3">
                                            {new Date(item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </p>
                                    </div>

                                    <div className='flex items-center justify-between md:justify-end gap-8 border-t border-white/5 pt-4 md:border-t-0 md:pt-0'>

                                        {/* SCORE */}
                                        <div className="text-left md:text-right">
                                            <p className="text-2xl font-extrabold text-emerald-400 leading-none">
                                                {item.finalScore || 0}/10
                                            </p>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mt-1">
                                                Overall Score
                                            </p>
                                        </div>

                                        {/* STATUS BADGE */}
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                                                item.status === "completed"
                                                    ? "bg-emerald-950/40 border-emerald-500/20 text-emerald-400"
                                                    : "bg-yellow-950/40 border-yellow-500/20 text-yellow-400"
                                            }`}
                                        >
                                            {item.status}
                                        </span>


                                    </div>
                                </div>

                            </div>

                        ))
                        }

                    </div>
                }
            </div>

        </div>
    )
}

export default InterviewHistory

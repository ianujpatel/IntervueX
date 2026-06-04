import React from 'react'
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function Timer({ timeLeft, totalTime }) {
    const percentage = (timeLeft/totalTime)*100
  return (
    <div className='w-20 h-20 transition-all duration-300'>
        <CircularProgressbar
        value={percentage}
        text={`${timeLeft}s`}
        styles={buildStyles({
          textSize: "26px",
          pathColor: "#10b981",
          textColor: "#ffffff",
          trailColor: "rgba(255, 255, 255, 0.05)",
          strokeLinecap: "round"
        })}
        />
    </div>
  )
}

export default Timer

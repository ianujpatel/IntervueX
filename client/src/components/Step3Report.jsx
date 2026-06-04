import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from "motion/react"
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

function Step3Report({ report }) {
  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-emerald-500 border-r-2 border-transparent mx-auto mb-4"></div>
          <p className="text-zinc-400 text-lg font-medium">Loading Report...</p>
        </div>
      </div>
    );
  }
  const navigate = useNavigate()
  const {
    finalScore = 0,
    confidence = 0,
    communication = 0,
    correctness = 0,
    questionWiseScore = [],
  } = report;

  const questionScoreData = questionWiseScore.map((score, index) => ({
    name: `Q${index + 1}`,
    score: score.score || 0
  }))

  const skills = [
    { label: "Confidence", value: confidence },
    { label: "Communication", value: communication },
    { label: "Correctness", value: correctness },
  ];

  let performanceText = "";
  let shortTagline = "";

  if (finalScore >= 8) {
    performanceText = "Ready for job opportunities.";
    shortTagline = "Excellent clarity and structured responses.";
  } else if (finalScore >= 5) {
    performanceText = "Needs minor improvement before interviews.";
    shortTagline = "Good foundation, refine articulation.";
  } else {
    performanceText = "Significant improvement required.";
    shortTagline = "Work on clarity and confidence.";
  }

  const score = finalScore;
  const percentage = (score / 10) * 100;


  const downloadPDF = () => {
  const doc = new jsPDF("p", "mm", "a4");

  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;

  let currentY = 25;

  // ================= TITLE =================
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(34, 197, 94);
  doc.text("AI Interview Performance Report", pageWidth / 2, currentY, {
    align: "center",
  });

  currentY += 5;

  // underline
  doc.setDrawColor(34, 197, 94);
  doc.line(margin, currentY + 2, pageWidth - margin, currentY + 2);

  currentY += 15;

  // ================= FINAL SCORE BOX =================
  doc.setFillColor(240, 253, 244);
  doc.roundedRect(margin, currentY, contentWidth, 20, 4, 4, "F");

  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text(
    `Final Score: ${finalScore}/10`,
    pageWidth / 2,
    currentY + 12,
    { align: "center" }
  );

  currentY += 30;

  // ================= SKILLS BOX =================
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(margin, currentY, contentWidth, 30, 4, 4, "F");

  doc.setFontSize(12);

  doc.text(`Confidence: ${confidence}`, margin + 10, currentY + 10);
  doc.text(`Communication: ${communication}`, margin + 10, currentY + 18);
  doc.text(`Correctness: ${correctness}`, margin + 10, currentY + 26);

  currentY += 45;

  // ================= ADVICE =================
  let advice = "";

  if (finalScore >= 8) {
    advice =
      "Excellent performance. Maintain confidence and structure. Continue refining clarity and supporting answers with strong real-world examples.";
  } else if (finalScore >= 5) {
    advice =
      "Good foundation shown. Improve clarity and structure. Practice delivering concise, confident answers with stronger supporting examples.";
  } else {
    advice =
      "Significant improvement required. Focus on structured thinking, clarity, and confident delivery. Practice answering aloud regularly.";
  }

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(220);
  doc.roundedRect(margin, currentY, contentWidth, 35, 4, 4);

  doc.setFont("helvetica", "bold");
  doc.text("Professional Advice", margin + 10, currentY + 10);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);

  const splitAdvice = doc.splitTextToSize(advice, contentWidth - 20);
  doc.text(splitAdvice, margin + 10, currentY + 20);

  currentY += 50;

  // ================= QUESTION TABLE =================
  autoTable(doc, {
  startY: currentY,
  margin: { left: margin, right: margin },
  head: [["#", "Question", "Score", "Feedback"]],
  body: questionWiseScore.map((q, i) => [
    `${i + 1}`,
    q.question,
    `${q.score}/10`,
    q.feedback,
  ]),
  styles: {
    fontSize: 9,
    cellPadding: 5,
    valign: "top",
  },
  headStyles: {
    fillColor: [34, 197, 94],
    textColor: 255,
    halign: "center",
  },
  columnStyles: {
    0: { cellWidth: 10, halign: "center" }, // index
    1: { cellWidth: 55 }, // question
    2: { cellWidth: 20, halign: "center" }, // score
    3: { cellWidth: "auto" }, // feedback
  },
  alternateRowStyles: {
    fillColor: [249, 250, 251],
  },
});


  doc.save("AI_Interview_Report.pdf");
};

  return (
    <div className='min-h-screen bg-zinc-950 bg-grid-pattern px-4 sm:px-6 lg:px-10 py-10 relative overflow-hidden'>
      {/* Glow Effects */}
      <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className='mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6'>
          <div className='flex items-start gap-4'>
            <button
              onClick={() => navigate("/history")}
              className='mt-1 p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-white transition duration-200 cursor-pointer shadow-lg'>
              <FaArrowLeft />
            </button>

            <div>
              <h1 className='text-3xl font-extrabold text-white tracking-tight'>
                Interview Analytics Dashboard
              </h1>
              <p className='text-zinc-400 text-sm mt-1'>
                AI-powered performance insights
              </p>
            </div>
          </div>

          <button onClick={downloadPDF} className='bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/35 transition duration-300 font-bold text-sm sm:text-base text-nowrap cursor-pointer'>
            Download PDF
          </button>
        </div>


        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>

          <div className='space-y-6'>
            {/* Overall Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 text-center shadow-2xl">

              <h3 className="text-zinc-400 text-xs font-bold uppercase tracking-wider mb-6">
                Overall Performance
              </h3>
              <div className='relative w-24 h-24 mx-auto'>
                <CircularProgressbar
                  value={percentage}
                  text={`${score}/10`}
                  styles={buildStyles({
                    textSize: "18px",
                    pathColor: "#10b981",
                    textColor: "#ffffff",
                    trailColor: "rgba(255, 255, 255, 0.05)",
                    strokeLinecap: "round"
                  })}
                />
              </div>

              <p className="text-zinc-500 mt-4 text-[10px] font-bold uppercase tracking-widest">
                Out of 10
              </p>

              <div className="mt-5 border-t border-white/5 pt-5">
                <p className="font-bold text-white text-base">
                  {performanceText}
                </p>
                <p className="text-zinc-400 text-xs mt-1.5 leading-relaxed">
                  {shortTagline}
                </p>
              </div>
            </motion.div>

            {/* Skill Breakdown Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 shadow-2xl'>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-6">
                Skill Evaluation
              </h3>

              <div className='space-y-5'>
                {
                  skills.map((s, i) => (
                    <div key={i}>
                      <div className='flex justify-between mb-2 text-sm'>
                        <span className="text-zinc-300 font-medium">{s.label}</span>
                        <span className='font-bold text-emerald-400'>{s.value}/10</span>
                      </div>

                      <div className='bg-zinc-950 border border-white/5 h-2 rounded-full overflow-hidden'>
                        <div className='bg-gradient-to-r from-emerald-500 to-teal-500 h-full rounded-full'
                          style={{ width: `${s.value * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </motion.div>
          </div>

          <div className='lg:col-span-2 space-y-6'>

            {/* Chart Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className='bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 shadow-2xl'>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-6">
                Performance Trend
              </h3>

              <div className='h-64 sm:h-72'>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={questionScoreData}>
                    <defs>
                      <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.05)" />
                    <XAxis dataKey="name" stroke="#71717a" fontSize={11} tickLine={false} />
                    <YAxis domain={[0, 10]} stroke="#71717a" fontSize={11} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        borderColor: 'rgba(255, 255, 255, 0.08)', 
                        borderRadius: '12px', 
                        color: '#f4f4f5',
                        fontSize: '13px'
                      }} 
                    />
                    <Area type="monotone"
                      dataKey="score"
                      stroke="#10b981"
                      fill="url(#colorScore)"
                      strokeWidth={3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            {/* Breakdown Cards */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className='bg-zinc-900/60 backdrop-blur-md rounded-3xl border border-white/5 p-6 sm:p-8 shadow-2xl'>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-wide mb-6">
                Question Breakdown
              </h3>
              <div className='space-y-6'>
                {questionWiseScore.map((q, i) => (
                  <div key={i} className='bg-zinc-950/40 p-5 rounded-2xl border border-white/5 hover:border-emerald-500/10 transition duration-300'>

                    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4.5'>
                      <div>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider mb-1">
                          Question {i + 1}
                        </p>

                        <p className="font-bold text-white text-sm sm:text-base leading-relaxed">
                          {q.question || "Question not available"}
                        </p>
                      </div>

                      <div className='bg-emerald-950/50 border border-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-extrabold text-xs sm:text-sm w-fit text-nowrap'>
                        {q.score ?? 0}/10
                      </div>
                    </div>

                    <div className='bg-zinc-900/80 border border-white/5 p-4.5 rounded-xl'>
                      <p className='text-[10px] text-emerald-400 font-bold uppercase tracking-wider mb-1.5'>
                        AI Feedback
                      </p>
                      <p className='text-sm text-zinc-300 leading-relaxed font-medium'>
                        {q.feedback && q.feedback.trim() !== ""
                          ? q.feedback
                          : "No feedback available for this question."}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step3Report

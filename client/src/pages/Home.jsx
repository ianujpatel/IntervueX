import React from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux'
import { motion } from "motion/react";
import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsArrowRight,
  BsStarFill,
  BsCheckCircleFill,
  BsLightningChargeFill,
  BsPeopleFill,
  BsTrophyFill,
} from "react-icons/bs";
import { HiSparkles } from "react-icons/hi";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthModel from '../components/AuthModel';
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import evalImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";
import Footer from '../components/Footer';

/* ─────────────────────────────────────────
   Tiny reusable components
───────────────────────────────────────── */
const SectionLabel = ({ children }) => (
  <div className="flex justify-center mb-5">
    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full">
      {children}
    </span>
  </div>
);

const SectionHeading = ({ children }) => (
  <motion.h2
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="text-4xl md:text-5xl font-extrabold text-center mb-20 text-white tracking-tight leading-tight"
  >
    {children}
  </motion.h2>
);

const GradientText = ({ children }) => (
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
    {children}
  </span>
);

/* ─────────────────────────────────────────
   Main Component
───────────────────────────────────────── */
function Home() {
  const { userData } = useSelector((state) => state.user);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();

  const handleStart = () => {
    if (!userData) { setShowAuth(true); return; }
    navigate("/interview");
  };

  const handleHistory = () => {
    if (!userData) { setShowAuth(true); return; }
    navigate("/history");
  };

  return (
    <div className="min-h-screen bg-zinc-950 bg-grid-pattern flex flex-col relative overflow-hidden">

      {/* ── Decorative Glows ── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none z-0" />
      <div className="absolute top-[900px] right-1/4 w-[500px] h-[500px] bg-teal-500/6 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="absolute bottom-[400px] left-1/4 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />

        <div className="flex-1 px-6">

          {/* ══════════════════════════════
              HERO
          ══════════════════════════════ */}
          <section className="py-28 max-w-6xl mx-auto">

            {/* Badge */}
            <div className="flex justify-center mb-8">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/80 backdrop-blur-md text-zinc-300 text-xs px-5 py-2.5 rounded-full flex items-center gap-2 border border-white/10 hover:border-emerald-500/30 transition duration-300 shadow-xl shadow-black/20"
              >
                <HiSparkles size={14} className="text-emerald-400 animate-pulse" />
                AI-Powered Smart Interview Platform
              </motion.div>
            </div>

            {/* Headline */}
            <div className="text-center mb-14">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto text-white"
              >
                Practice Interviews with <br />
                <GradientText>AI Intelligence</GradientText>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-zinc-400 mt-7 max-w-2xl mx-auto text-lg md:text-xl font-normal leading-relaxed"
              >
                Role-based mock interviews with smart follow-ups,
                adaptive difficulty, and real-time performance evaluation.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="flex flex-wrap justify-center gap-4 mt-10"
              >
                <button
                  onClick={handleStart}
                  className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer"
                >
                  Start Interview
                  <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <button
                  onClick={handleHistory}
                  className="bg-zinc-900/80 hover:bg-zinc-800/80 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white font-semibold px-10 py-4 rounded-full transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                >
                  View History
                </button>
              </motion.div>

              {/* Trust line */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-center gap-2 mt-8 text-zinc-500 text-sm"
              >
                <div className="flex -space-x-1.5">
                  {["E", "J", "S", "A"].map((l, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-700 to-teal-600 border-2 border-zinc-950 flex items-center justify-center text-[10px] text-white font-bold"
                    >
                      {l}
                    </div>
                  ))}
                </div>
                <span>Trusted by <strong className="text-zinc-300">2,400+</strong> job seekers</span>
                <div className="flex gap-0.5 ml-1">
                  {[...Array(5)].map((_, i) => (
                    <BsStarFill key={i} size={10} className="text-amber-400" />
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ── Stats Bar ── */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-6 mb-0"
            >
              {[
                { icon: <BsPeopleFill className="text-emerald-400" />, value: "2,400+", label: "Users Trained" },
                { icon: <BsTrophyFill className="text-amber-400" />, value: "94%", label: "Offer Rate" },
                { icon: <BsLightningChargeFill className="text-teal-400" />, value: "50K+", label: "Sessions Done" },
                { icon: <BsStarFill className="text-rose-400" />, value: "4.9/5", label: "Average Rating" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col items-center text-center gap-1">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-extrabold text-white">{s.value}</div>
                  <div className="text-xs text-zinc-500">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </section>

          {/* ══════════════════════════════
              STEPS
          ══════════════════════════════ */}
          <section className="max-w-6xl mx-auto mb-40">
            <SectionLabel>How It Works</SectionLabel>
            <SectionHeading>
              Three Steps to <GradientText>Interview Mastery</GradientText>
            </SectionHeading>

            <div className="flex flex-col md:flex-row justify-center items-stretch gap-8 relative">
              {/* Connector line (desktop only) */}
              <div className="hidden md:block absolute top-[52px] left-[calc(16.66%+28px)] right-[calc(16.66%+28px)] h-px bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />

              {[
                {
                  icon: <BsRobot size={22} />,
                  step: "01",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts interview difficulty specifically tailored to your selected target job role.",
                  color: "from-emerald-500/20 to-teal-500/10",
                },
                {
                  icon: <BsMic size={22} />,
                  step: "02",
                  title: "Smart Voice Interview",
                  desc: "Interactive dialogue featuring dynamic follow-up questions tailored to your answers.",
                  color: "from-teal-500/20 to-emerald-500/10",
                },
                {
                  icon: <BsClock size={22} />,
                  step: "03",
                  title: "Timer Based Simulation",
                  desc: "Experience real-world interview pressure with real-time countdown progress tracking.",
                  color: "from-emerald-500/20 to-teal-500/10",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className="relative flex-1 bg-zinc-900/40 backdrop-blur-md rounded-[28px] border border-white/5 hover:border-emerald-500/30 px-8 pt-16 pb-10 shadow-2xl transition-all duration-300 flex flex-col group overflow-hidden"
                >
                  {/* subtle bg gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[28px]`} />

                  {/* Step number */}
                  <div className="absolute -top-px left-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-black text-[10px] font-black tracking-widest px-3 py-1 rounded-b-lg">
                    STEP {item.step}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-5 bg-zinc-800/80 border border-white/10 text-emerald-400 w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:border-emerald-500/40 group-hover:text-emerald-300 transition-all duration-300">
                    {item.icon}
                  </div>

                  <div className="relative">
                    <h3 className="font-bold text-white mb-3 text-lg tracking-wide">{item.title}</h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════
              AI CAPABILITIES
          ══════════════════════════════ */}
          <section className="max-w-6xl mx-auto mb-40">
            <SectionLabel>Core Features</SectionLabel>
            <SectionHeading>
              Advanced AI <GradientText>Capabilities</GradientText>
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  image: evalImg,
                  icon: <BsBarChart size={18} />,
                  title: "AI Answer Evaluation",
                  desc: "Deep performance metrics covering communication clarity, technical accuracy, and voice confidence.",
                  bullets: ["Real-time scoring", "Tone analysis", "Keyword detection"],
                },
                {
                  image: resumeImg,
                  icon: <BsFileEarmarkText size={18} />,
                  title: "Resume Based Interview",
                  desc: "Instantly extracts project and skill data from your uploaded PDF to ask project-specific questions.",
                  bullets: ["PDF parsing", "Skill extraction", "Project deep-dives"],
                },
                {
                  image: pdfImg,
                  icon: <BsFileEarmarkText size={18} />,
                  title: "Downloadable PDF Report",
                  desc: "Gain downloadable records indicating your primary strengths, growth areas, and step-by-step advice.",
                  bullets: ["Strengths & gaps", "Action plan", "Shareable format"],
                },
                {
                  image: analyticsImg,
                  icon: <BsBarChart size={18} />,
                  title: "History & Analytics",
                  desc: "Track metrics over time with clean visual charts and a detailed question-by-question breakdown.",
                  bullets: ["Progress charts", "Score trends", "Session archive"],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[32px] p-7 shadow-xl hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start gap-7">
                    {/* Image */}
                    <div className="w-full sm:w-5/12 flex justify-center bg-zinc-950/50 p-4 rounded-2xl border border-white/5 group-hover:border-emerald-500/10 transition-colors duration-300 shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-auto object-contain max-h-44 rounded-xl"
                      />
                    </div>

                    {/* Content */}
                    <div className="w-full sm:w-7/12">
                      <div className="bg-emerald-950/40 border border-emerald-500/20 text-emerald-400 w-11 h-11 rounded-xl flex items-center justify-center mb-4">
                        {item.icon}
                      </div>
                      <h3 className="font-bold text-white mb-2 text-lg tracking-wide">{item.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4">{item.desc}</p>
                      <ul className="space-y-1.5">
                        {item.bullets.map((b, i) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-zinc-400">
                            <BsCheckCircleFill size={12} className="text-emerald-500 shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════
              INTERVIEW MODES
          ══════════════════════════════ */}
          <section className="max-w-6xl mx-auto mb-40">
            <SectionLabel>Interview Modes</SectionLabel>
            <SectionHeading>
              Multiple Interview <GradientText>Modes</GradientText>
            </SectionHeading>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  img: hrImg,
                  title: "HR Interview Mode",
                  desc: "Behavioral assessment, soft skills, culture-fit criteria, and articulation quality evaluation.",
                  tag: "Behavioral",
                },
                {
                  img: techImg,
                  title: "Technical Mode",
                  desc: "In-depth role-specific questioning evaluating conceptual correctness and analytical logic.",
                  tag: "Technical",
                },
                {
                  img: confidenceImg,
                  title: "Confidence Detection",
                  desc: "Sound wave and pacing indicators that provide real-time speech feedback.",
                  tag: "Voice AI",
                },
                {
                  img: creditImg,
                  title: "Credits System",
                  desc: "Pay-as-you-go credits designed to unlock custom premium interview sessions with ease.",
                  tag: "Flexible",
                },
              ].map((mode, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  className="group bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[32px] p-7 shadow-xl hover:border-emerald-500/20 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex-1">
                      <span className="inline-block text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4">
                        {mode.tag}
                      </span>
                      <h3 className="font-bold text-white text-lg tracking-wide mb-2">{mode.title}</h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">{mode.desc}</p>
                    </div>

                    <div className="shrink-0 w-28 h-28 flex items-center justify-center bg-zinc-950/50 p-4 rounded-2xl border border-white/5 group-hover:border-emerald-500/10 transition-colors duration-300">
                      <img src={mode.img} alt={mode.title} className="w-full h-full object-contain" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ══════════════════════════════
              FINAL CTA BANNER
          ══════════════════════════════ */}
          <section className="max-w-6xl mx-auto mb-28">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative overflow-hidden bg-gradient-to-br from-emerald-950/60 to-teal-950/40 border border-emerald-500/20 rounded-[40px] p-12 md:p-16 text-center shadow-2xl"
            >
              {/* Glow inside card */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-teal-500/10 to-emerald-500/5 rounded-[40px]" />
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 bg-emerald-500/15 blur-[80px] rounded-full" />

              <div className="relative">
                <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full mb-6 font-bold tracking-widest uppercase">
                  <HiSparkles size={12} className="animate-pulse" />
                  Free to Start
                </div>

                <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-5 tracking-tight">
                  Ready to Ace Your <br />
                  <GradientText>Next Interview?</GradientText>
                </h2>

                <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                  Join thousands of candidates who sharpened their skills and landed their dream roles with AI-powered practice.
                </p>

                <div className="flex flex-wrap justify-center gap-4">
                  <button
                    onClick={handleStart}
                    className="group bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-semibold px-12 py-4 rounded-full transition-all duration-300 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-[1.03] active:scale-[0.98] flex items-center gap-2 cursor-pointer text-base"
                  >
                    Start Free Interview
                    <BsArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                  </button>

                  <button
                    onClick={handleHistory}
                    className="text-zinc-300 hover:text-white border border-white/10 hover:border-white/25 bg-zinc-900/60 hover:bg-zinc-800/60 font-semibold px-10 py-4 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
                  >
                    View My History
                  </button>
                </div>
              </div>
            </motion.div>
          </section>

        </div>

        {showAuth && <AuthModel onClose={() => setShowAuth(false)} />}
        <Footer />
      </div>
    </div>
  );
}

export default Home;
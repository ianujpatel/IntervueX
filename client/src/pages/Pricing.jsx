import React, { useState } from 'react'
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react";
import axios from 'axios';
import { ServerUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState("free");
  const [loadingPlan, setLoadingPlan] = useState(null);
  const dispatch = useDispatch()

  const plans = [
    {
      id: "free",
      name: "Free Pack",
      price: "₹0",
      credits: 100,
      description: "Perfect for beginners starting their mock interview preparation.",
      features: [
        "100 AI Interview Credits",
        "Basic Performance Report",
        "Voice Interview Access",
        "Limited History Tracking",
      ],
      default: true,
    },
    {
      id: "basic",
      name: "Starter Pack",
      price: "₹100",
      credits: 150,
      description: "Great for focused practice and consistent skill improvement.",
      features: [
        "150 AI Interview Credits",
        "Detailed Feedback Insights",
        "Performance Analytics Graph",
        "Full Interview History Access",
      ],
    },
    {
      id: "pro",
      name: "Pro Pack",
      price: "₹500",
      credits: 650,
      description: "Best value pack designed for serious corporate job preparation.",
      features: [
        "650 AI Interview Credits",
        "Advanced AI Expert Feedback",
        "Skill Performance Trend Analysis",
        "Priority AI Query Processing",
      ],
      badge: "Best Value",
    },
  ];



  const handlePayment = async (plan) => {
    try {
      setLoadingPlan(plan.id)

      const amount =  
      plan.id === "basic" ? 100 :
      plan.id === "pro" ? 500 : 0;

      const result = await axios.post(ServerUrl + "/api/payment/order" , {
        planId: plan.id,
        amount: amount,
        credits: plan.credits,
      },{withCredentials:true})
      

      const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: result.data.amount,
      currency: "INR",
      name: "InterviewIQ.AI",
      description: `${plan.name} - ${plan.credits} Credits`,
      order_id: result.data.id,

      handler:async function (response) {
        const verifypay = await axios.post(ServerUrl + "/api/payment/verify" ,response , {withCredentials:true})
        dispatch(setUserData(verifypay.data.user))

          alert("Payment Successful 🎉 Credits Added!");
          navigate("/")

      },
      theme:{
        color: "#10b981",
      },

      }

      const rzp = new window.Razorpay(options)
      rzp.open()

      setLoadingPlan(null);
    } catch (error) {
     console.log(error)
     setLoadingPlan(null);
    }
  }



  return (
    <div className='min-h-screen bg-zinc-950 bg-grid-pattern py-20 px-6 relative overflow-hidden'>
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none z-0"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className='mb-16 flex items-start gap-4'>
          <button onClick={() => navigate("/")} className='p-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-emerald-500/30 text-zinc-300 hover:text-white transition duration-200 cursor-pointer shadow-lg'>
            <FaArrowLeft />
          </button>

          <div className="text-center w-full">
            <h1 className="text-4xl font-extrabold text-white tracking-tight">
              Choose Your Plan
            </h1>
            <p className="text-zinc-400 mt-3 text-base max-w-md mx-auto">
              Flexible credit options to accelerate your interview performance goals.
            </p>
          </div>
        </div>


        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch'>

          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id

            return (
              <motion.div key={plan.id}
                whileHover={!plan.default ? { y: -6 } : {}}
                onClick={() => !plan.default && setSelectedPlan(plan.id)}
                className={`relative rounded-3xl p-8 transition-all duration-300 border flex flex-col justify-between ${
                  isSelected
                    ? "border-emerald-500 bg-zinc-900 shadow-2xl shadow-emerald-950/10"
                    : "border-white/5 bg-zinc-900/40 backdrop-blur-md shadow-lg"
                  }
                  ${plan.default ? "cursor-default" : "cursor-pointer"}
                `}
              >

                <div>
                  {/* Badge */}
                  {plan.badge && (
                    <div className="absolute top-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-lg shadow-emerald-500/20">
                      {plan.badge}
                    </div>
                  )}

                  {/* Default Tag */}
                  {plan.default && (
                    <div className="absolute top-6 right-6 bg-zinc-800 text-zinc-400 text-[9px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full border border-white/5">
                      Default
                    </div>
                  )}

                  {/* Plan Name */}
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    {plan.name}
                  </h3>

                  {/* Price */}
                  <div className="mt-6 border-b border-white/5 pb-6">
                    <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                      {plan.price}
                    </span>
                    <p className="text-zinc-400 mt-2 text-sm font-semibold">
                      {plan.credits} Credits Included
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-400 mt-6 text-xs leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Features */}
                  <div className="mt-8 space-y-4 text-left">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <FaCheckCircle className="text-emerald-400 text-xs shrink-0" />
                        <span className="text-zinc-300 text-xs font-medium">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {!plan.default && (
                  <button
                    disabled={loadingPlan === plan.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isSelected) {
                        setSelectedPlan(plan.id)
                      } else {
                        handlePayment(plan)
                      }
                    }} 
                    className={`w-full mt-8 py-3.5 rounded-xl font-bold transition duration-300 text-xs tracking-wider uppercase cursor-pointer ${
                      isSelected
                        ? "bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/20"
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white border border-white/5"
                    }`}
                  >
                    {loadingPlan === plan.id
                      ? "Processing..."
                      : isSelected
                        ? "Proceed to Pay"
                        : "Select Plan"}
                  </button>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Pricing

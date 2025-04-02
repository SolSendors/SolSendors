import React from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';

export default function App() {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-purple-950 to-black text-white font-sans relative overflow-hidden">
      {/* Particle FX */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "transparent" },
          particles: {
            color: { value: "#a855f7" },
            number: { value: 50 },
            size: { value: { min: 1, max: 4 } },
            move: { enable: true, speed: 0.5 },
            links: { enable: true, color: "#9333ea" },
            opacity: { value: 0.6 },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 6 }} className="absolute w-[500px] h-[500px] bg-purple-700 opacity-30 rounded-full blur-3xl top-0 left-1/4" />
        <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 8 }} className="absolute w-[400px] h-[400px] bg-purple-500 opacity-20 rounded-full blur-2xl bottom-20 right-1/4" />
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 7 }} className="absolute w-[450px] h-[450px] bg-purple-600 opacity-25 rounded-full blur-3xl top-1/3 right-1/3" />

        {/* Flashy Lightning SVG */}
        <svg className="absolute w-full h-full z-0 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <motion.polyline
            points="33,0 36,20 30,20 33,40"
            stroke="#a855f7"
            strokeWidth="3"
            fill="none"
            className="absolute left-1/3"
            initial={{ y: -100 }}
            animate={{ y: ["-100%", "120%"] }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 10px #a855f7)" }}
          />
          <motion.polyline
            points="33,0 36,20 30,20 33,40"
            stroke="#9333ea"
            strokeWidth="3"
            fill="none"
            className="absolute left-2/3"
            initial={{ y: -100 }}
            animate={{ y: ["-100%", "120%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            style={{ filter: "drop-shadow(0 0 15px #9333ea)" }}
          />
        </svg>
      </div>

      {/* Header */}
      <motion.header initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="py-6 px-6 flex items-center justify-between border-b border-purple-800 relative z-10">
        <div className="text-purple-500 text-2xl font-bold flex items-center gap-2 animate-pulse">
          <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}>🚀</motion.span>
          <span className="tracking-wide drop-shadow-[0_0_6px_rgba(168,85,247,0.9)]">SolSendors</span>
        </div>
        <nav className="space-x-6 text-sm text-white">
          <a href="#" className="hover:text-purple-400 transition duration-300">Features</a>
          <a href="#" className="hover:text-purple-400 transition duration-300">Leaderboard</a>
          <a href="#" className="hover:text-purple-400 transition duration-300">Community</a>
        </nav>
        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium ml-4 transition transform hover:scale-105 shadow-md">Connect Wallet</motion.button>
      </motion.header>

      {/* Hero Section */}
      <main className="relative w-full flex flex-col items-center justify-center text-center py-28 px-6 z-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-7xl font-extrabold text-purple-400 mb-6 leading-tight max-w-4xl drop-shadow-[0_0_20px_rgba(168,85,247,0.95)] animate-pulse"
        >
          THE FUTURE OF SOLANA TOKEN CREATION
        </motion.h1>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#7e22ce" }}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-10 py-4 rounded-full text-xl shadow-lg transition mb-20 animate-bounce"
        >
          CREATE YOUR SOLANA TOKEN
        </motion.button>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full mb-24">
          {[{
            icon: "🛡️",
            title: "Safe and Secure",
            desc: "KYC is required before token creation, keeping investors protected."
          }, {
            icon: "🪪",
            title: "KYC-Backed Tokens",
            desc: "Every token is permanently tied to a verified creator ID."
          }, {
            icon: "💰",
            title: "Tax & RevShare",
            desc: "Enable automated tax and revenue distribution in SOL."
          }].map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 * i }}
              whileHover={{ scale: 1.08 }}
              className="bg-zinc-900 border border-purple-800 p-8 rounded-xl shadow-lg text-center hover:shadow-purple-700 transition transform hover:rotate-1"
            >
              <div className="text-purple-500 text-4xl mb-3 animate-bounce">{card.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-purple-300 drop-shadow-[0_0_12px_rgba(168,85,247,0.7)]">{card.title}</h3>
              <p className="text-gray-400 text-sm">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center border-t border-purple-800 text-sm text-gray-500 relative z-10">
        © {new Date().getFullYear()} SolSendors. All rights reserved.
      </footer>
    </div>
  );
}

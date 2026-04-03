import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import DarkVeil from './DarkVeil';
import rangePic from '../../asset/range.avif';
import trocPic from '../../asset/troc.jpeg';
import tucsonPic from '../../asset/tucson.jpeg';
import golfPic from '../../asset/golf.jpg';

// Dynamic data for the new Interactive Process section
const PROCESS_STEPS = [
  { id: '01', title: 'The Request', desc: 'Submit your preferences through our secure portal or dedicated concierge line.', img: rangePic },
  { id: '02', title: 'The Curation', desc: 'Our specialists match your profile with the perfect vehicle, ensuring exact specifications.', img: trocPic },
  { id: '03', title: 'The Delivery', desc: 'White-glove drop-off at your hotel, airport, or private residence. Fully detailed and fueled.', img: tucsonPic },
  { id: '04', title: 'The Drive', desc: 'Experience absolute freedom. 24/7 support remains invisible but instantly available.', img: golfPic },
];

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero Reveal
      gsap.fromTo(
        '.hero-text',
        { y: 60, opacity: 0, rotationX: -20 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1.2, stagger: 0.15, ease: 'expo.out' }
      );

      // 2. Text & Content Stagger
      const textBlocks = gsap.utils.toArray('.text-block');
      textBlocks.forEach((block: any) => {
        gsap.fromTo(
          block.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: { trigger: block, start: 'top 85%' }
          }
        );
      });

      // 3. Animated Counters (Fixed Math Logic)
      const stats = gsap.utils.toArray('.stat-number');
      stats.forEach((stat: any) => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const suffix = stat.getAttribute('data-suffix') || '';
        
        // Create a proxy object to hold the raw number
        const counter = { val: 0 };

        gsap.to(counter, {
          val: target,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: { 
            trigger: '.stats-section', 
            start: 'top 90%' 
          },
          onUpdate: function () {
            // Push the clean math to the screen, then add the suffix
            stat.innerHTML = Math.ceil(counter.val) + suffix;
          }
        });
      });

      // 4. Value Cards Stagger
      gsap.fromTo(
        '.value-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'back.out(1.2)',
          scrollTrigger: { trigger: '.values-section', start: 'top 80%' }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 3D Mouse Movement effect for the Value Cards
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, card: HTMLElement) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotation
    const rotateY = ((x - centerX) / centerX) * 10;

    gsap.to(card, {
      rotateX,
      rotateY,
      transformPerspective: 1000,
      ease: "power2.out",
      duration: 0.4
    });
  };

  const handleMouseLeave = (card: HTMLElement) => {
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      ease: "power2.out",
      duration: 0.6
    });
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050508] text-white font-sans selection:bg-[#00d2ff] selection:text-white flex flex-col relative overflow-hidden">
      
      {/* DarkVeil Background Effect */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <DarkVeil
          hueShift={24}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.8}
          scanlineFrequency={2}
          warpAmount={0}
        />
      </div>

      <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-900/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-[#00d2ff]/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-32 pt-10">
          <div className="hero-text inline-block px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 text-[#00d2ff] text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-md hover:bg-[#00d2ff]/20 transition-colors cursor-default">
            The Pinnacle of Driving
          </div>
          <h1 className="hero-text text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter mb-8" style={{ perspective: '1000px' }}>
            Beyond <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00d2ff] to-blue-600">Transportation.</span>
          </h1>
          <p className="hero-text text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-light tracking-wide leading-relaxed">
            We don't just rent cars. We engineer unforgettable moments behind the wheel of the world's most breathtaking automotive masterpieces.
          </p>
        </div>

        {/* --- STATS SECTION --- */}
        <div className="stats-section grid grid-cols-2 md:grid-cols-4 gap-8 mb-40 border-y border-white/5 py-12 bg-[#0f172a]/40 backdrop-blur-md rounded-3xl">
          {[
            { label: 'Exotic Vehicles', value: '150', suffix: '+' },
            { label: 'Happy Clients', value: '10', suffix: 'k+' },
            { label: 'Global Hubs', value: '12', suffix: '' },
            { label: 'Years of Excellence', value: '15', suffix: '' },
          ].map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <h3 
                className="stat-number text-4xl md:text-5xl font-bold text-white mb-2 group-hover:scale-110 transition-transform duration-300 group-hover:text-[#00d2ff]"
                data-target={stat.value}
                data-suffix={stat.suffix}
              >
                0
              </h3>
              <p className="text-slate-400 uppercase tracking-widest text-xs font-semibold group-hover:text-white transition-colors">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* --- SECTION 1: INTERACTIVE PROCESS --- */}
        <div className="mb-40 bg-[#0f172a]/30 border border-white/5 rounded-[2rem] p-8 md:p-16 backdrop-blur-sm">
          <div className="text-center mb-16 text-block">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">How It Works</h2>
            <p className="text-gray-400 font-light max-w-2xl mx-auto">A seamless, invisible choreography to get you behind the wheel.</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Interactive Steps List */}
            <div className="flex-1 flex flex-col justify-center gap-6 text-block">
              {PROCESS_STEPS.map((step, index) => (
                <div 
                  key={step.id}
                  onMouseEnter={() => setActiveStep(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-500 border ${
                    activeStep === index 
                      ? 'bg-white/10 border-[#00d2ff]/30 shadow-[0_0_30px_rgba(0,210,255,0.1)]' 
                      : 'bg-transparent border-transparent hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl font-black transition-colors duration-500 ${activeStep === index ? 'text-[#00d2ff]' : 'text-slate-600'}`}>
                      {step.id}
                    </span>
                    <div>
                      <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${activeStep === index ? 'text-white' : 'text-slate-400'}`}>
                        {step.title}
                      </h3>
                      <p className={`text-sm leading-relaxed transition-all duration-500 overflow-hidden ${activeStep === index ? 'max-h-24 opacity-100 text-slate-300' : 'max-h-0 opacity-0'}`}>
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dynamic Image Showcase */}
            <div className="flex-1 relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              {PROCESS_STEPS.map((step, index) => (
                <img
                  key={step.id}
                  src={step.img}
                  alt={step.title}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
                    activeStep === index ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'
                  }`}
                />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent z-20 opacity-60" />
            </div>
          </div>
        </div>

        {/* --- SECTION 2: THE LUXE STANDARD (3D Interactive Grid) --- */}
        <div className="values-section mb-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 text-block">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">The Luxe Standard</h2>
              <p className="text-gray-400 font-light max-w-xl">Our commitment to ensuring your experience is completely flawless.</p>
            </div>
            <a href="/fleet" className="hidden md:flex mt-8 px-8 py-4 bg-[#00d2ff] text-[#020617] font-black text-sm uppercase tracking-widest rounded-xl hover:brightness-110 hover:scale-[1.02] transition-transform duration-300 items-center gap-3">
              Explore The Fleet
              <span>→</span>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Absolute Discretion', desc: 'Privacy is paramount. We offer completely confidential bookings and ghost-drop deliveries.' },
              { title: 'Zero Compromise', desc: 'Our vehicles are rotated annually. You will never drive a model that feels anything less than showroom new.' },
              { title: 'Unlimited Horizons', desc: 'No restrictive mileage caps on select models. If the road calls, you should have the freedom to answer.' },
            ].map((value, i) => (
               <div 
                key={i} 
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
                className="value-card group relative p-8 rounded-3xl bg-[#0f172a]/50 border border-white/5 hover:border-[#00d2ff]/40 transition-all duration-300 overflow-hidden cursor-crosshair"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* 3D Content wrapper */}
                <div style={{ transform: 'translateZ(30px)' }}>
                  <div className="w-14 h-14 mb-8 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff] font-black text-xl group-hover:bg-[#00d2ff] group-hover:text-[#020617] transition-all duration-500 shadow-[0_0_15px_rgba(0,210,255,0)] group-hover:shadow-[0_0_20px_rgba(0,210,255,0.5)]">
                    0{i + 1}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-[#00d2ff] transition-colors">{value.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="md:hidden w-full mt-8 px-8 py-4 bg-[#00d2ff] text-[#020617] font-black text-sm uppercase tracking-widest rounded-xl hover:brightness-110 transition-all duration-300 flex justify-center items-center gap-3">
            Explore The Fleet →
          </button>
        </div>

      </main>
      
    </div>
  );
};

export default About;
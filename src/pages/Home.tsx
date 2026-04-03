import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Fuel, Gauge, ArrowRight } from 'lucide-react';

import { CARS } from '../types';
import Hero from '../components/Hero';
import BookingForm from '../components/BookingForm';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact'; 

// ==========================================
// 1. Ultra-Premium Cinematic Card (Merged)
// ==========================================
function MarqueeCard({ car }: { car: any }) {
  const displaySeats = car.specs?.seats || car.seats || '4';
  const displayFuel = car.specs?.fuel || car.engine || 'Petrol';
  const displayAccel = car.specs?.acceleration?.split(' ')[0] || car.trans || 'Auto';
  const displayPrice = car.pricePerDay || parseFloat((car.price || '0').toString().replace(/[^0-9.]/g, ''));

  return (
    <div className="group relative w-[280px] h-[400px] md:w-[360px] md:h-[485px] flex-shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-white/10 bg-slate-900 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-[#00d2ff]/50 cursor-pointer">
      <img 
        src={car.image} 
        alt={car.name} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-100 scale-105"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 md:via-slate-950/60 to-transparent opacity-90 transition-opacity duration-500" />
      
      <div className="absolute top-4 left-4 md:top-5 md:left-5 backdrop-blur-md bg-white/10 border border-white/20 px-3 py-1 md:px-4 md:py-1.5 rounded-full text-[10px] md:text-xs text-white uppercase font-bold tracking-widest">
        {car.type}
      </div>

      <div className="absolute bottom-0 left-0 w-full p-4 md:p-6 flex flex-col justify-end h-full">
        <div className="mb-3 md:mb-4 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
          <p className="text-[#00d2ff] text-xs md:text-sm font-bold uppercase tracking-widest mb-1">{car.brand || 'Luxury'}</p>
          <h3 className="text-xl md:text-2xl font-display font-bold text-white leading-tight mb-2">{car.name}</h3>
          <div className="text-white font-medium">
            <span className="text-lg md:text-xl font-bold">{displayPrice} DH</span>
            <span className="text-slate-400 text-xs md:text-sm"> / day</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 md:gap-2 py-3 md:py-4 border-t border-white/10 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-75">
          <div className="flex flex-col items-start gap-1">
            <Users size={14} className="text-slate-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs text-slate-300 font-medium">{displaySeats} Seats</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <Fuel size={14} className="text-slate-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs text-slate-300 font-medium truncate w-full">{displayFuel}</span>
          </div>
          <div className="flex flex-col items-start gap-1">
            <Gauge size={14} className="text-slate-400 md:w-4 md:h-4" />
            <span className="text-[10px] md:text-xs text-slate-300 font-medium truncate w-full">{displayAccel}</span>
          </div>
        </div>

        <Link 
          to={`/car/${car.id}`} 
          className="w-full py-2.5 md:py-3 rounded-xl backdrop-blur-md bg-white/10 border border-white/20 text-white text-sm md:text-base font-semibold flex items-center justify-center gap-2 md:gap-4 hover:bg-[#00d2ff] hover:text-[#020617] hover:border-[#00d2ff] transition-all duration-300 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 md:delay-100"
        >
          View Details
          <ArrowRight size={16} className="md:w-[18px] md:h-[18px] group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}

// ==========================================
// 2. The GSAP Marquee Container (Merged)
// ==========================================
function TestMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const displayCars = isMobile ? CARS : [...CARS, ...CARS, ...CARS]; 

  useEffect(() => {
    let ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const tween = gsap.to(rowRef.current, {
          xPercent: -33.333333,
          repeat: -1, 
          duration: 40, 
          ease: "none",
        });

        if (containerRef.current) {
          const pauseTween = () => tween.pause();
          const playTween = () => tween.play();
          
          containerRef.current.addEventListener("mouseenter", pauseTween);
          containerRef.current.addEventListener("mouseleave", playTween);

          return () => {
            containerRef.current?.removeEventListener("mouseenter", pauseTween);
            containerRef.current?.removeEventListener("mouseleave", playTween);
          };
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []); 

  return (
    <section className="py-12 md:py-20 relative w-screen left-1/2 -translate-x-1/2 overflow-hidden">
      <div 
        ref={containerRef} 
        className="relative z-10 w-full flex overflow-x-auto md:overflow-hidden snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
      >
        <div ref={rowRef} className="flex flex-nowrap gap-4 md:gap-6 px-4 md:px-6 w-max">
          {displayCars.map((car, i) => (
            <div key={`${car.id}-${i}`} className="snap-center shrink-0 pb-4 md:pb-0 pt-4 md:pt-0">
              <MarqueeCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ==========================================
// MAIN HOME COMPONENT
// ==========================================
export default function Home() {
  const fleetHeaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (fleetHeaderRef.current) {
        gsap.fromTo(fleetHeaderRef.current.children,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, 
            y: 0, 
            stagger: 0.15, 
            duration: 1, 
            ease: "power3.out",
            scrollTrigger: {
              trigger: fleetHeaderRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main className="bg-[#020617] min-h-screen selection:bg-[#00d2ff]/30 selection:text-white overflow-x-hidden relative">
      
      

      <div className="relative z-10 block">
        <div id="top"></div> 
        <Hero />
        
        <section id="cars" className="py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#00d2ff]/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
              <div ref={fleetHeaderRef} className="relative">
                <div className="w-12 h-1 bg-[#00d2ff] rounded-full mb-6 shadow-[0_0_10px_rgba(0,210,255,0.5)]" />
                <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-6">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                    Our Premium Fleet
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed font-light">
                  Choose from our wide range of luxury vehicles, from high-performance sports cars to executive SUVs.
                </p>
              </div>
            </div>

            <div className="relative -mx-6 md:mx-0">
              <div id="services"></div>
              <TestMarquee />
            </div>
          </div>
        </section>
        
        <div id="about"></div>
        <About />
        
        <Testimonials />
        <div id="contact"></div>
        <Contact />
      </div>
    </main>
  );
}
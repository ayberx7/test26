import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { CARS } from '../types';
import FloatingLines from './FloatingLines';

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const gridImagesRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop Animations
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            scrub: 1.2,
            pin: true,
          },
        });

        tl.to(mainImageRef.current, {
          scale: 0.3,
          xPercent: -35,
          yPercent: -30,
          borderRadius: '2rem',
          filter: 'brightness(1)', 
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0)
        .to(textContainerRef.current, {
          y: 50,
          opacity: 0.9,
          scale: 0.9,
          duration: 1.5,
          ease: 'power4.inOut',
        }, 0);

        const items = gridImagesRef.current?.querySelectorAll('.grid-item');
        if (items) {
          tl.from(items, {
            opacity: 0,
            y: 100,
            scale: 0.8,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
          }, 0.4);
        }
      });

      // Mobile Animations
      mm.add("(max-width: 1023px)", () => {
        gsap.to(mainImageRef.current, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            scrub: true,
          },
          opacity: 0.4,
          scale: 1.1
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mainCar = CARS[0];
  const gridCars = CARS.slice(1, 4);

  // Note: Changed bg-slate-950 to bg-[#020617] to match the rest of your app's theme!
  return (
    <section ref={sectionRef} className="relative min-h-screen bg-[#020617] overflow-hidden flex items-center justify-center">
      
      {/* FloatingLines Background Effect */}
      <div className="absolute inset-0 -z-40">
        <FloatingLines 
          enabledWaves={["top", "bottom"]}
          lineCount={5}
          lineDistance={5}
          bendRadius={5}
          bendStrength={-0.5}
          interactive={true}
          parallax={true}
        />
      </div>
      
      {/* Semi-transparent overlay to ensure text readability */}
      <div className="absolute inset-0 bg-[#000000]/60 -z-30" />
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-600/10 blur-[120px] -z-20" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00d2ff]/10 blur-[120px] -z-20" />

      {/* Main Image */}
      <div 
        ref={mainImageRef} 
        className="absolute inset-0 z-0 w-full h-full origin-center overflow-hidden brightness-[0.5] will-change-transform"
      >
        <img 
          src={mainCar?.image} 
          alt="Main Car" 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      {/* Grid Images - Desktop Only */}
      <div ref={gridImagesRef} className="absolute inset-0 z-10 pointer-events-none hidden lg:block">
        <div className="grid-item absolute top-[10%] right-[8%] w-[22vw] aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[0]?.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="grid-item absolute bottom-[12%] left-[8%] w-[18vw] aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[1]?.image} className="w-full h-full object-cover" alt="" />
        </div>
        <div className="grid-item absolute bottom-[10%] right-[15%] w-[15vw] aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          <img src={gridCars[2]?.image} className="w-full h-full object-cover" alt="" />
        </div>
      </div>

      {/* Text Content */}
      <div 
        ref={textContainerRef}
        className="relative z-20 flex flex-col items-center text-center px-6 max-w-6xl"
      >
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-white tracking-tight leading-[0.9] mb-6">
          The most powerful <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-600 italic">
            driving experience.
          </span>
        </h1>
        
        <p className="text-base md:text-xl text-slate-300 mb-10 max-w-2xl font-light">
          Your vision deserves tools with precision, absolute freedom, and the raw power to deliver an unforgettable journey.
        </p>
        
        <Link 
          to="/fleet"
          className="group flex items-center gap-3 rounded-full bg-white px-8 py-4 font-bold text-[#020617] hover:bg-[#00d2ff] transition-all duration-300 shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)]"
        >
          <span>Explore Fleet</span>
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
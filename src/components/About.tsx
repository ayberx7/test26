import React, { useRef, useEffect } from 'react';
import seatLeonPic from '../../asset/seat leon.png';
import { Shield, Award, Zap, Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BorderGlow from './BorderGlow';

export default function About() {
  const outerRef = useRef<HTMLDivElement>(null);
  const scrollTrackRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <Shield size={32} strokeWidth={1.5} />,
      title: 'Secure & Insured',
      description: 'Full comprehensive insurance coverage for all our vehicles, ensuring complete peace of mind.'
    },
    {
      icon: <Award size={32} strokeWidth={1.5} />,
      title: 'Premium Quality',
      description: 'Our fleet consists of the latest models, meticulously maintained to exact factory standards.'
    },
    {
      icon: <Zap size={32} strokeWidth={1.5} />,
      title: 'Fast Booking',
      description: 'Book your dream car in less than 60 seconds with our streamlined digital process.'
    },
    {
      icon: <Heart size={32} strokeWidth={1.5} />,
      title: '24/7 Support',
      description: 'Dedicated white-glove concierge team available around the clock to assist you.'
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      // --- DESKTOP: Bulletproof Horizontal Scroll ---
      mm.add("(min-width: 1024px)", () => { 
        const track = scrollTrackRef.current;
        
        if (track) {
          // ADDED: Math.max ensures we never get weird negative scrolling values, 
          // and stops EXACTLY at the end of the content width.
          const getScrollAmount = () => Math.max(0, track.scrollWidth - window.innerWidth);

          const tween = gsap.to(track, {
            x: () => -getScrollAmount(),
            ease: "none",
          });

          ScrollTrigger.create({
            trigger: outerRef.current,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true, 
          });
        }
      });

      // --- MOBILE & TABLET: Smooth Vertical Fade ---
      mm.add("(max-width: 1023px)", () => {
        const blocks = gsap.utils.toArray(".mobile-fade");
        blocks.forEach((block: any) => {
          gsap.fromTo(block, 
            { opacity: 0, y: 40 },
            { 
              opacity: 1, 
              y: 0, 
              duration: 1, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: block,
                start: "top 85%",
              }
            }
          );
        });
      });

    }, outerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={outerRef} 
      id="about" 
      className="relative w-full overflow-hidden bg-transparent pt-20 lg:pt-0"
    >
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 left-[5%] w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-[10%] w-[500px] h-[500px] bg-[#00d2ff]/10 rounded-full blur-[150px] mix-blend-screen pointer-events-none -z-10" />

      <div className="lg:h-screen w-full flex items-center">
        
        {/* THE TRACK: Fixed Padding Issue here (Changed lg:px to lg:pl and lg:pr-16) */}
        <div 
          ref={scrollTrackRef} 
          className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20 pl-6 pr-6 lg:pl-[10vw] lg:pr-16 w-full lg:w-max h-auto will-change-transform pb-20 lg:pb-0"
        >

          {/* --- BLOCK 1: Text Intro --- */}
          <div className="mobile-fade w-full lg:w-[35vw] shrink-0 flex flex-col justify-center">
            <div className="w-16 h-1 bg-[#00d2ff] rounded-full mb-8 shadow-[0_0_15px_rgba(0,210,255,0.4)]" />
            
            <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-display font-black text-white mb-8 leading-[1.05] tracking-tight">
              Redefining the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-500 italic pr-6 drop-shadow-sm">
                Luxury Rental
              </span> <br className="hidden lg:block" /> Experience.
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light max-w-lg border-l-2 border-[#00d2ff]/30 pl-6 backdrop-blur-sm">
              We blend a seamless digital booking experience with white-glove concierge service, ensuring your journey is completely flawless from start to finish.
            </p>
          </div>

          {/* --- BLOCK 2: Cinematic Hero Image --- */}
          <div className="mobile-fade w-full lg:w-[450px] shrink-0 relative flex justify-center mt-10 lg:mt-0">
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl bg-white/5 backdrop-blur-md border border-white/10 p-2 w-full">
              <img 
                src={seatLeonPic} 
                alt="Seat Leon" 
                className="rounded-[1.5rem] w-full h-[400px] lg:h-[550px] object-cover hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617]/80 via-transparent to-transparent pointer-events-none rounded-[1.5rem]" />
            </div>
            
            <div className="absolute -bottom-8 -right-2 lg:-right-8 backdrop-blur-xl bg-[#020617]/80 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl p-6 lg:p-8 z-20 max-w-[220px] lg:max-w-[260px] transform hover:-translate-y-2 transition-transform duration-500">
              <div className="text-5xl lg:text-6xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00d2ff] to-blue-400 mb-2">
                10+
              </div>
              <div className="text-xs lg:text-sm text-slate-300 font-bold uppercase tracking-widest leading-snug">
                Years of Excellence
              </div>
            </div>
          </div>

          {/* --- BLOCK 3: The 2x2 Grid Feature Cards --- */}
          {/* FIXED: Removed the extra lg:pr-[10vw] padding here */}
          <div className="w-full lg:w-max shrink-0 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-16 lg:mt-0 lg:ml-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="mobile-fade w-full lg:w-[320px] shrink-0 h-full"
              >
                <BorderGlow
                  edgeSensitivity={30}
                  glowColor="0 210 255" 
                  backgroundColor="#020617" 
                  borderRadius={32} 
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={true} 
                  colors={['#00d2ff', '#3b82f6', '#020617']} 
                >
                  <div className="p-8 h-full flex flex-col group relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff] mb-8 group-hover:scale-110 group-hover:bg-[#00d2ff] group-hover:text-[#020617] group-hover:shadow-[0_0_20px_rgba(0,210,255,0.4)] transition-all duration-500">
                      {feature.icon}
                    </div>
                    <h4 className="text-white font-display font-bold text-2xl mb-4 tracking-wide group-hover:text-[#00d2ff] transition-colors duration-300">
                      {feature.title}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed font-light">
                      {feature.description}
                    </p>
                  </div>
                </BorderGlow>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
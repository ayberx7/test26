import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar'; // Adjust path if needed
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, MapPin, Star, Shield, Clock, Gem, ArrowRight } from 'lucide-react';
import DarkVeil from './DarkVeil'; // Adjust path if needed
import benzPIC from '../../asset/benz.jpeg'; // Adjust path if needed
import golfPic from '../../asset/golf.jpg'; // Adjust path if needed
import trocPic from '../../asset/troc.jpeg'; // Adjust path if needed

const SERVICES = [
  {
    id: '01',
    title: 'Executive Chauffeur',
    subtitle: 'Discreet, seamless, and impeccably timed.',
    desc: 'For those who prefer to work, relax, or prepare while in transit. Our chauffeurs are highly trained in defensive driving, route optimization, and absolute discretion. Perfect for corporate roadshows, airport transfers, or daily executive commuting.',
    icon: <Briefcase size={24} />,
    image: benzPIC,
    align: 'left'
  },
  {
    id: '02',
    title: 'Self-Drive Curations',
    subtitle: 'Unleash raw power on your own terms.',
    desc: 'Take the wheel of the worlds most exhilarating machines. Whether you are carving coastal highways for a weekend getaway or testing the limits of a supercar on a designated route, we provide the keys to absolute freedom without mileage anxiety.',
    icon: <MapPin size={24} />,
    image: golfPic,
    align: 'right'
  },
  {
    id: '03',
    title: 'Special Events & VIP',
    subtitle: 'Arrive in a statement piece.',
    desc: 'Weddings, premieres, galas, and high-profile arrivals demand a vehicle that matches the occasion. We coordinate directly with your event planners to ensure flawless timing, perfect vehicle presentation, and red-carpet readiness.',
    icon: <Star size={24} />,
    image: trocPic,
    align: 'left'
  }
];

const ADD_ONS = [
  { title: 'Armored Vehicles', desc: 'Ballistic-rated luxury transport for high-risk profiles.', icon: <Shield size={28} /> },
  { title: '24/7 Concierge', desc: 'Instant support, route changes, and dining reservations on the fly.', icon: <Clock size={28} /> },
  { title: 'Bespoke Sourcing', desc: 'If you want a specific rare model not in our fleet, we will find it.', icon: <Gem size={28} /> },
];

const Services: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.fromTo(
        '.hero-reveal',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );

      // Alternating Services Reveal
      const serviceBlocks = gsap.utils.toArray('.service-block');
      serviceBlocks.forEach((block: any, i) => {
        const image = block.querySelector('.service-image');
        const content = block.querySelector('.service-content');
        
        gsap.fromTo(image, 
          { opacity: 0, scale: 0.9, x: i % 2 === 0 ? -50 : 50 },
          { opacity: 1, scale: 1, x: 0, duration: 1.2, ease: 'power3.out', scrollTrigger: { trigger: block, start: 'top 80%' } }
        );

        gsap.fromTo(content.children,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out', scrollTrigger: { trigger: block, start: 'top 75%' } }
        );
      });

      // Add-ons Grid Reveal
      gsap.fromTo('.add-on-card',
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'back.out(1.2)', scrollTrigger: { trigger: '.add-ons-section', start: 'top 85%' } }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-[#050508] text-white font-sans selection:bg-[#00d2ff] selection:text-white flex flex-col relative overflow-hidden">
      
      {/* DarkVeil Background (Fixed) */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <DarkVeil
          hueShift={24}
          noiseIntensity={0.05}
          scanlineIntensity={0.2}
          speed={0.8}
          scanlineFrequency={2}
          warpAmount={0}
        />
      </div>

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#00d2ff]/10 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute top-1/2 left-[-10%] w-[50vw] h-[50vw] bg-blue-900/10 blur-[150px] rounded-full pointer-events-none z-0" />

      {/* Navbar */}
      <div className="relative z-10">
        <Navbar />
      </div>

      <main className="flex-grow max-w-7xl mx-auto px-6 md:px-12 py-32 relative z-10">
        
        {/* --- HERO SECTION --- */}
        <div className="text-center mb-32 max-w-4xl mx-auto">
          <div className="hero-reveal inline-block px-4 py-1.5 rounded-full border border-[#00d2ff]/30 bg-[#00d2ff]/10 text-[#00d2ff] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-md">
            Our Offerings
          </div>
          <h1 className="hero-reveal text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-8 leading-tight">
            Tailored Experiences, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#00d2ff] to-blue-600 italic pr-2">
              Flawless Execution.
            </span>
          </h1>
          <p className="hero-reveal text-slate-400 text-lg md:text-xl font-light tracking-wide leading-relaxed max-w-2xl mx-auto">
            Whether you require a commanding presence for a corporate summit, or an adrenaline-fueled weekend escape, we orchestrate every detail.
          </p>
        </div>

        {/* --- MAIN SERVICES --- */}
        <div className="flex flex-col gap-32 mb-40">
          {SERVICES.map((service, index) => (
            <div key={service.id} className={`service-block flex flex-col ${service.align === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12 lg:gap-20`}>
              
              {/* Image Side */}
              <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl border border-white/5 service-image group">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/20 to-transparent opacity-80" />
                
                {/* Number Badge */}
                <div className="absolute bottom-8 left-8 text-6xl font-black text-white/20">
                  {service.id}
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-1/2 service-content flex flex-col justify-center">
                <div className="w-16 h-16 rounded-2xl bg-[#00d2ff]/10 border border-[#00d2ff]/20 flex items-center justify-center text-[#00d2ff] mb-8 shadow-[0_0_20px_rgba(0,210,255,0.1)]">
                  {service.icon}
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-4">{service.title}</h2>
                <h3 className="text-xl text-[#00d2ff] font-medium italic mb-6">{service.subtitle}</h3>
                <p className="text-slate-400 text-lg leading-relaxed font-light mb-10 border-l-2 border-white/10 pl-6">
                  {service.desc}
                </p>
                <Link to="/fleet" className="inline-flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-[#00d2ff] transition-colors w-max group">
                  Inquire Now 
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              
            </div>
          ))}
        </div>

        {/* --- PREMIUM ADD-ONS GRID --- */}
        <div className="add-ons-section mb-20 bg-[#0f172a]/30 border border-white/5 rounded-[2rem] p-8 md:p-16 backdrop-blur-sm">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Premium Upgrades</h2>
            <p className="text-slate-400 font-light">Elevating the standard definition of luxury.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ADD_ONS.map((addon, i) => (
              <div key={i} className="add-on-card p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#00d2ff]/30 hover:bg-[#00d2ff]/5 transition-all duration-300 group">
                <div className="text-[#00d2ff] mb-6 group-hover:scale-110 transition-transform origin-left">
                  {addon.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{addon.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{addon.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default Services;
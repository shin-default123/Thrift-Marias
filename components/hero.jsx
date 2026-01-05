'use client';

import { useState } from 'react';
import { X, ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="flex flex-col w-full">
      
      {showBanner && (
        <div className="bg-red-900 text-white px-4 py-2.5 relative animate-in slide-in-from-top duration-300">
          <div className="max-w-7xl mx-auto flex items-center justify-center text-sm font-medium gap-2 text-center pr-8">
            <span className="animate-pulse">🔥</span>
            <span>
              <strong>LIMITED TIME OFFER:</strong> Get free shipping on orders over Php 300!
            </span>
          </div>
          <button 
            onClick={() => setShowBanner(false)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Hero Section */}
      <section className="relative w-full overflow-hidden bg-primary text-primary-foreground">
        
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent blur-3xl" />
          <div 
            className="absolute inset-0" 
            style={{ 
              backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', 
              backgroundSize: '30px 30px' 
            }} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                  <span className="block text-accent">Up to 50% OFF</span>
                  <span className="font-serif italic font-light block mt-2">Vintage Finds</span>
                </h1>
                
                <p className="text-lg md:text-xl opacity-90 max-w-lg mx-auto lg:mx-0 font-light leading-relaxed">
                  Sustainable fashion curated for the bold. Discover unique pieces that tell a story without hurting the planet.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a 
                  href="/shop?gender=men" 
                  className="group px-8 py-4 rounded-full bg-background text-primary font-bold text-lg shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 flex items-center justify-center gap-2"
                >
                  Shop Men
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a 
                  href="/shop?gender=women" 
                  className="group px-8 py-4 rounded-full bg-transparent border-2 border-primary-foreground/30 text-primary-foreground font-bold text-lg hover:bg-primary-foreground/10 transition-all flex items-center justify-center gap-2"
                >
                  Shop Women
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative h-100">
              <div className="absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-[60%] w-64 h-80 bg-white rotate-[-6deg] p-3 shadow-2xl rounded-2xl border-4 border-white/20 transition-transform hover:rotate-[-8deg] duration-500">
                <div className="w-full h-full bg-zinc-200 rounded-xl flex items-center justify-center bg-[url('/hero1.jpg')] bg-cover bg-center">
                  <span className="text-zinc-500 sr-only">Vintage</span>
                </div>
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-[40%] w-64 h-80 bg-white rotate-[6deg] p-3 shadow-2xl rounded-2xl border-4 border-white/20 transition-transform hover:rotate-[8deg] duration-500 z-10">
                <div className="w-full h-full bg-zinc-300 rounded-xl flex items-center justify-center bg-[url('/hero2.jpg')] bg-cover bg-center">
                  <span className="text-zinc-500 sr-only">Thrift</span>
                </div>
              </div>

              <div className="absolute top-0 right-10 animate-bounce delay-700">
                <Sparkles className="w-12 h-12 text-accent" />
              </div>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/cart-context';

export default function Navbar() {
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path) => pathname === path;

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/about', label: 'About' },
  ];

  return (
    <nav className="w-full sticky top-0 z-50 shadow-sm bg-card border-b border-border/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 group-hover:scale-105 transition-transform overflow-hidden">
              <Image 
                src="/logo.png" 
                alt="Thrift Marias Logo" 
                width={48} 
                height={48}
                className="object-cover p-1" 
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold font-serif leading-none tracking-tight">
                Thrift Marias
              </span>
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                —thrift finds by ❝𝗧𝗥𝗘𝗦 𝗠𝗔𝗥𝗜𝗔𝗦❞
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className={`text-sm font-semibold tracking-wide transition-colors hover:text-primary ${
                  isActive(link.href) 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link 
              href="/cart" 
              className="relative group px-5 py-2.5 rounded-full font-semibold transition-all hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-lg hover:shadow-primary/25 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline">Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-[10px] font-bold ring-2 ring-card animate-in zoom-in">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-card border-b border-border shadow-xl animate-in slide-in-from-top-5">
          <div className="px-4 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium px-4 py-2 rounded-lg transition-colors ${
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary' 
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
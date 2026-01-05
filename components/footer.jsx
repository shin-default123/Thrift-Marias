'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-20 border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 border border-primary/20 overflow-hidden">
                <Image 
                  src="/logo.png" 
                  alt="Thrift Marias Logo" 
                  width={48} 
                  height={48}
                  className="object-cover p-1" 
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-serif">Thrift Marias</h3>
                <p className="text-sm opacity-70">—thrift finds by ❝𝗧𝗥𝗘𝗦 𝗠𝗔𝗥𝗜𝗔𝗦❞</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Discover unique vintage pieces that tell a story. 
              Sustainable fashion for the conscious shopper.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Shop</h4>
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/shop" 
                  className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?gender=men" 
                  className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Men&apos;s Collection
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?gender=women" 
                  className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Women&apos;s Collection
                </Link>
              </li>
              <li>
                <Link 
                  href="/shop?category=Accessories" 
                  className="opacity-70 hover:opacity-100 hover:text-primary transition-colors"
                >
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-4">
              <li>
                <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  Contact Us
                </span>
              </li>
              <li>
                <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  Shipping Info
                </span>
              </li>
              <li>
                <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  Returns & Exchanges
                </span>
              </li>
              <li>
                <span className="opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                  Size Guide
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Stay Updated</h4>
            <p className="text-sm opacity-80 mb-4">
              Subscribe for exclusive offers and style tips
            </p>
            <form className="space-y-3">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-3 rounded-l-lg border border-r-0 border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="submit"
                  className="px-5 py-3 rounded-r-lg bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity"
                >
                  <Mail className="w-5 h-5" />
                </button>
              </div>
            </form>
            <div className="flex gap-4 mt-6">
              <a href="https://www.facebook.com/krong.krong.9041" className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-sm opacity-70">
            © {new Date().getFullYear()} Thrift Marias. All rights reserved. 
            <span className="block mt-2 text-xs">
              —thrift finds by ❝𝗧𝗥𝗘𝗦 𝗠𝗔𝗥𝗜𝗔𝗦❞
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
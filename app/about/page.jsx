'use client';

import Link from 'next/link';
import { 
  Clock, 
  MapPin, 
  AlertCircle, 
  Calendar, 
  Shirt, 
  Truck, 
  ShoppingBag,
  MessageCircle 
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-foreground">
          About Thrift Marias
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Your destination for sustainable style. Please read our guidelines below to ensure a smooth shopping experience.
        </p>
      </div>

      {/* Operational Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        
        {/* Operating Hours */}
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Clock className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-serif">Operating Hours</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-medium">Tuesday - Friday</span>
              <span className="text-primary font-bold">Open</span>
            </div>
            <div className="flex justify-between items-center border-b border-border/50 pb-3">
              <span className="font-medium">Saturday - Monday</span>
              <span className="text-muted-foreground">Rest Day (Closed)</span>
            </div>
            
            <div className="mt-6 p-4 bg-muted/50 rounded-xl flex items-start gap-3">
              <Calendar className="w-5 h-5 text-primary mt-0.5 shrink-0" />
              <div>
                <span className="font-bold text-foreground block mb-1">New Arrivals</span>
                <p className="text-sm text-muted-foreground">
                  Fresh drops happen <span className="font-semibold text-primary">Every Tuesday</span>!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fulfillment / Delivery */}
        <div className="bg-card border border-border p-8 rounded-3xl shadow-sm hover:border-primary/50 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-primary/10 rounded-xl">
              <Truck className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-serif">How to Get Your Items</h2>
          </div>
          
          <ul className="space-y-5">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              <div>
                <span className="font-bold block">Meet Up</span>
                <span className="text-muted-foreground">Plaza</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              <div>
                <span className="font-bold block">Delivery</span>
                <span className="text-muted-foreground">Via Maxim (Buyer shoulders the fee)</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="w-5 h-5 text-muted-foreground shrink-0 mt-1" />
              <div>
                <span className="font-bold block">Pick Up</span>
                <span className="text-muted-foreground">Tentative location. </span>
                <span className="text-red-500 text-sm font-medium block mt-1">
                  *No pickup without prior confirmation.
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Policies Section */}
      <section className="mb-16">
        <div className="bg-muted/30 border border-border rounded-3xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <AlertCircle className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl font-bold font-serif">Must Read Before Ordering</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-y-6 gap-x-12">
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Shirt className="w-5 h-5 text-primary shrink-0" />
                <span className="text-muted-foreground">
                  All items are thrifted and need washing (unless stated otherwise).
                </span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">!</div>
                <span className="text-muted-foreground">
                  Manage your expectations; items may or may not have flaws.
                </span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 text-xs font-bold text-primary">!</div>
                <span className="text-muted-foreground">
                  Color may vary due to lighting and screen exposure.
                </span>
              </li>
            </ul>

            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-xs font-bold text-red-600">₱</div>
                <span className="text-foreground font-medium">
                  Strictly "Mine Now, Pay Now/Tomorrow".
                </span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-xs font-bold text-red-600">X</div>
                <span className="text-foreground font-medium">
                  No Return, No Exchange, No Refund.
                </span>
              </li>
              <li className="flex gap-3">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-xs font-bold text-red-600">X</div>
                <span className="text-foreground font-medium">
                  Strictly No Cancellation.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Customer Service Note */}
      <div className="text-center bg-card border border-border p-8 rounded-3xl max-w-2xl mx-auto">
        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-3">Customer Care</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Expect a delayed response during our rest days (Sat-Mon), but rest assured we will get back to you as soon as possible. For the best assistance, please contact us during business hours (Tue-Fri).
        </p>
        <p className="font-medium text-primary">
          Thank you for your understanding!
        </p>
      </div>

      <div className="mt-16 text-center">
        <Link 
          href="/shop" 
          className="inline-flex items-center justify-center px-8 py-4 rounded-full font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
}
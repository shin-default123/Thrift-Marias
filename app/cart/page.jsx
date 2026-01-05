'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/contexts/cart-context';
import { 
  Trash2, 
  Minus, 
  Plus, 
  ArrowRight, 
  ShoppingBag, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';

export default function CartPage() {
const { cartItems = [], removeFromCart, updateQuantity } = useCart() || {};
  const FREE_SHIPPING_THRESHOLD = 300;
  const SHIPPING_FLAT_RATE = 50; 
  
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = isFreeShipping ? 0 : SHIPPING_FLAT_RATE;
  const finalTotal = subtotal + shippingCost;
  const amountLeftForFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal;
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold font-serif mb-3 text-foreground">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 text-lg max-w-md text-center">
          Looks like you haven't added any vintage treasures yet.
        </p>
        <Link 
          href="/shop" 
          className="px-8 py-3.5 rounded-full font-bold bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl md:text-4xl font-bold font-serif mb-8 text-foreground">
        Your Cart <span className="text-muted-foreground text-lg font-sans font-medium ml-2">({cartItems.length} items)</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-sm">
            <div className="hidden md:grid grid-cols-12 gap-4 p-6 border-b border-border bg-muted/30 text-sm font-bold text-muted-foreground uppercase tracking-wider">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y divide-border">
              {cartItems.map((item) => (
                <div key={item.id} className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group transition-colors hover:bg-muted/5">
                  
                  <div className="md:col-span-6 flex gap-4">
                    <div className="relative w-24 h-24 bg-muted rounded-xl overflow-hidden shrink-0 border border-border/50">
                      {item.image ? (
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-2xl">🛍️</div>
                      )}
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="text-xs font-bold text-primary uppercase mb-1">{item.category}</span>
                      <Link href={`/product/${item.id}`} className="font-bold text-lg text-foreground hover:underline line-clamp-1">
                        {item.name}
                      </Link>
                      <div className="text-sm text-muted-foreground mt-1">
                        Size: <span className="font-medium text-foreground">{item.size}</span>
                      </div>
                      <div className="md:hidden mt-2 font-bold text-primary">
                        Php {formatPrice(item.price)}
                      </div>
                    </div>
                  </div>

                  <div className="hidden md:block md:col-span-2 text-center font-medium text-foreground">
                    Php {formatPrice(item.price)}
                  </div>

                  <div className="md:col-span-2 flex items-center justify-start md:justify-center">
                    <div className="flex items-center border border-border rounded-lg bg-background">
                      <button 
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        disabled={item.quantity <= 1}
                        className="p-2 hover:bg-muted text-muted-foreground disabled:opacity-30 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:bg-muted text-foreground transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>

                  <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-4 mt-4 md:mt-0">
                    <span className="font-bold text-lg md:text-base text-foreground">
                      Php {formatPrice(item.price * item.quantity)}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <ShieldCheck className="w-4 h-4" />
            <span>Secure checkout powered by Stripe / GCash (Simulated)</span>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="bg-card border border-border rounded-3xl p-6 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold font-serif mb-6">Order Summary</h2>

            <div className="mb-8 p-4 bg-muted/30 rounded-xl border border-border/50">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-green-600 font-bold text-sm">
                  <Truck className="w-4 h-4" />
                  <span>You got free shipping!</span>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Add <strong>Php {formatPrice(amountLeftForFreeShipping)}</strong> for free shipping</span>
                    <span className="font-bold">{Math.round(shippingProgress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary transition-all duration-500" 
                      style={{ width: `${shippingProgress}%` }} 
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-6 border-b border-border pb-6">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="font-medium text-foreground">Php {formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span className="font-medium text-foreground">
                  {isFreeShipping ? <span className="text-green-600">Free</span> : `Php ${formatPrice(shippingCost)}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-lg font-bold text-foreground">Total</span>
              <div className="text-right">
                <span className="text-3xl font-bold text-primary block leading-none">
                  Php {formatPrice(finalTotal)}
                </span>
                <span className="text-xs text-muted-foreground mt-1 block">Includes VAT</span>
              </div>
            </div>

            <button className="w-full py-4 rounded-full font-bold text-lg bg-primary text-primary-foreground hover:opacity-90 transition-all shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 group">
              Proceed to Checkout
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              By proceeding, you agree to our Terms and Conditions.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
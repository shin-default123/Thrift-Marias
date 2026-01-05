'use client';

import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/libs/data';
import { useCart } from '@/contexts/cart-context';
import ProductCard from '@/components/product-card';
import { 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  ChevronLeft,
  Share2
} from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((p) => p.id === Number(params.id));

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-bold mb-4">Product not found</h2>
        <p className="text-muted-foreground mb-8">The item you are looking for might have been removed or sold.</p>
        <button 
          onClick={() => router.back()}
          className="px-6 py-3 bg-primary text-primary-foreground rounded-full font-bold"
        >
          Go Back
        </button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'decimal',
    minimumFractionDigits: 2,
  }).format(product.price);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      <button 
        onClick={() => router.back()}
        className="flex items-center text-muted-foreground hover:text-primary transition-colors mb-8 group"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to shopping
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
        
        <div className="relative aspect-square lg:aspect-4/5 bg-muted rounded-3xl overflow-hidden border border-border shadow-sm">
          {product.image ? (
            <Image 
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          ) : (
             <div className="absolute inset-0 flex items-center justify-center text-6xl">🛍️</div>
          )}
          
          <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-full border border-border/50 shadow-sm">
            <span className="font-bold text-sm text-foreground uppercase tracking-wide">
              Condition: {product.condition}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="mb-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <span className="text-sm font-bold text-primary tracking-wider uppercase mb-2 block">
                  {product.gender === 'women' ? "Women's" : product.gender === 'men' ? "Men's" : "Unisex"} / {product.category}
                </span>
                <h1 className="text-4xl md:text-5xl font-bold font-serif text-foreground mb-4">
                  {product.name}
                </h1>
              </div>
              <button className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors">
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">
                Php {formattedPrice}
              </span>
              <div className="h-6 w-px bg-border"></div>
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                <span className="font-medium">{product.rating}/5</span>
                <span className="text-muted-foreground">(Verified Thrift)</span>
              </div>
            </div>

            <div className="prose prose-stone max-w-none mb-8">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="mb-8">
              <span className="block text-sm font-bold text-foreground mb-3">Size</span>
              <div className="inline-flex items-center justify-center min-w-12 px-4 py-3 border-2 border-primary rounded-xl font-bold text-primary bg-primary/5">
                {product.size}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10 border-b border-border pb-10">
              <div className="flex items-center border border-border rounded-full p-1 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button 
                onClick={handleAddToCart}
                className="flex-1 py-4 px-8 bg-primary text-primary-foreground rounded-full font-bold text-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold block text-foreground">Fast Delivery</span>
                  <span className="text-muted-foreground">Via Maxim delivery</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold block text-foreground">Quality Checked</span>
                  <span className="text-muted-foreground">Inspected for flaws</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm">
                  <span className="font-bold block text-foreground">No Returns</span>
                  <span className="text-muted-foreground">Final sale policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-16">
          <h2 className="text-3xl font-bold font-serif mb-8">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(item => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
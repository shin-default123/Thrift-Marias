'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Star, Heart } from 'lucide-react';
import { useCart } from '../contexts/cart-context.jsx';
import { useState } from 'react';

export default function ProductCard({ product, showAddButton = true }) {
  const { addToCart } = useCart();
  const [isFavorite, setIsFavorite] = useState(false);

  const formattedPrice = new Intl.NumberFormat('en-PH', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(product.price);

  const genderBadge = {
    'men': { text: 'Men', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20' },
    'women': { text: 'Women', color: 'bg-pink-500/10 text-pink-600 border-pink-500/20' },
    'unisex': { text: 'Unisex', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20' },
  }[product.gender];

  const conditionColor = {
    'Excellent': 'bg-emerald-500/10 text-emerald-600',
    'Like New': 'bg-green-500/10 text-green-600',
    'Very Good': 'bg-blue-500/10 text-blue-600',
    'Good': 'bg-amber-500/10 text-amber-600',
  }[product.condition] || 'bg-gray-500/10 text-gray-600';

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link href={`/product/${product.id}`}>
      <article className="group product-card rounded-3xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md h-full flex flex-col">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <span className="text-4xl">🛍️</span>
            </div>
          )}
          
          {/* Top badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            {genderBadge && (
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${genderBadge.color}`}>
                {genderBadge.text}
              </span>
            )}
            <span className={`px-3 py-1.5 rounded-full text-xs font-bold border backdrop-blur-md ${conditionColor}`}>
              {product.condition}
            </span>
          </div>
          
          {/* Favorite button */}
          <button
            onClick={handleFavorite}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 hover:bg-white hover:border-primary/50 transition-colors shadow-sm z-10"
          >
            <Heart 
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} 
            />
          </button>
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
        
        {/* Content Section */}
        <div className="p-5 flex flex-col flex-1 gap-4">
          <div className="space-y-1">
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
              {product.name}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
          </div>
          
          {/* Price & Rating Row */}
          <div className="flex items-end justify-between mt-auto">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Price</span>
              <span className="font-bold text-xl text-primary">
                Php {formattedPrice}
              </span>
            </div>

            <div className="flex items-center gap-1 mb-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium text-foreground">
                {product.rating}
              </span>
            </div>
          </div>
          
          {showAddButton && (
            <button
              onClick={handleAddToCart}
              className="w-full py-3 rounded-xl font-bold transition-transform active:scale-[0.98] bg-primary text-primary-foreground shadow-sm hover:opacity-90 mt-2"
            >
              Add to Cart
            </button>
          )}
        </div>
      </article>
    </Link>
  );
}
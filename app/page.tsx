import Hero from '@/components/hero';
import ProductGrid from '../components/product-grid';
import { products } from '../libs/data';
import Link from 'next/link';
import { Sparkles, Truck, Shield, Leaf } from 'lucide-react';

export default function HomePage() {
  const featuredProducts = products.slice(0, 8);

  const features = [
    {
      icon: <Truck className="w-8 h-8 text-primary" />,
      title: "Free Shipping",
      desc: "On orders over Php 300" 
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Quality Checked",
      desc: "Every item inspected"
    },
    {
      icon: <Leaf className="w-8 h-8 text-primary" />,
      title: "Sustainable",
      desc: "Eco-friendly fashion"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      title: "Unique Finds",
      desc: "One-of-a-kind pieces"
    }
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="text-center p-8 rounded-3xl bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
            >
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-2 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/10 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-semibold text-sm text-primary tracking-wide uppercase">Featured Collection</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 text-foreground">
            Handpicked for You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our curated selection of premium thrift finds for men and women. 
            Sustainable fashion that doesn't break the bank.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
        
        <div className="text-center mt-16">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-3 px-10 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105 active:scale-95 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
          >
            View All Products
            <Sparkles className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
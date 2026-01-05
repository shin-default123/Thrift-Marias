'use client';

import { useState, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CategoryFilter from '../../components/category-filter';
import ProductGrid from '../../components/product-grid';
import { products } from '../../libs/data';
import { Filter, SlidersHorizontal, X } from 'lucide-react';

export default function ShopPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState(searchParams.get('gender') || 'all');
  
  const [sortOption, setSortOption] = useState('Featured');
  
  const maxProductPrice = Math.max(...products.map(p => p.price));
  const [maxPrice, setMaxPrice] = useState(maxProductPrice);
  const [selectedConditions, setSelectedConditions] = useState([]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const categoryMatch = selectedCategory === 'All' || product.category === selectedCategory;
      const genderMatch = selectedGender === 'all' || product.gender === selectedGender || 
                        (selectedGender === 'unisex' && product.gender === 'unisex');
      const priceMatch = product.price <= maxPrice;
      const conditionMatch = selectedConditions.length === 0 || selectedConditions.includes(product.condition);

      return categoryMatch && genderMatch && priceMatch && conditionMatch;
    });

    switch (sortOption) {
      case 'Price: Low to High':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'Price: High to Low':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'Newest':
        result.sort((a, b) => b.id - a.id); 
        break;
      case 'Featured':
      default:
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [selectedCategory, selectedGender, maxPrice, selectedConditions, sortOption]);

  // Handlers
  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
    const params = new URLSearchParams(searchParams.toString());
    if (gender === 'all') params.delete('gender');
    else params.set('gender', gender);
    router.replace(`/shop?${params.toString()}`, { scroll: false });
  };

  const toggleCondition = (condition) => {
    setSelectedConditions(prev => 
      prev.includes(condition) 
        ? prev.filter(c => c !== condition) 
        : [...prev, condition]
    );
  };

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedGender('all');
    handleGenderChange('all');
    setMaxPrice(maxProductPrice);
    setSelectedConditions([]);
    setSortOption('Featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10 md:mb-16 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold font-serif mb-4 text-foreground">
          Thrift Store
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Discover unique vintage pieces for every style. Curated just for you.
        </p>
      </div>

      <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
        
        <div className="lg:hidden mb-2">
          <button 
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-card border border-border rounded-xl font-medium shadow-sm active:bg-muted transition-colors"
          >
            {isMobileFiltersOpen ? <X className="w-5 h-5" /> : <SlidersHorizontal className="w-5 h-5" />}
            {isMobileFiltersOpen ? 'Close Filters' : 'Show Filters'}
          </button>
        </div>

        <div className={`lg:col-span-3 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-24 space-y-10">
            
            <CategoryFilter
              selectedCategory={selectedCategory}
              selectedGender={selectedGender}
              onCategoryChange={setSelectedCategory}
              onGenderChange={handleGenderChange}
            />
            
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-foreground">Max Price</h3>
                  <span className="text-sm font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
                    Php {maxPrice}
                  </span>
                </div>
                
                <div className="p-5 rounded-2xl bg-card border border-border/60 shadow-sm">
                  <div className="space-y-6">
                    <input
                      type="range"
                      min="0"
                      max={maxProductPrice}
                      step="50"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">Php 0</span>
                      <span className="font-semibold text-foreground">Php {maxProductPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-xl text-foreground">Condition</h3>
                  {selectedConditions.length > 0 && (
                    <button 
                      onClick={() => setSelectedConditions([])}
                      className="text-xs text-primary hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                
                <div className="space-y-3 pl-1">
                  {['Excellent', 'Like New', 'Very Good', 'Good'].map((condition) => (
                    <label key={condition} className="flex items-center gap-3 cursor-pointer group py-1 select-none">
                      <div className="relative flex items-center justify-center w-5 h-5">
                        <input 
                          type="checkbox" 
                          checked={selectedConditions.includes(condition)}
                          onChange={() => toggleCondition(condition)}
                          className="peer appearance-none w-5 h-5 border-2 border-muted-foreground/30 rounded-md checked:bg-primary checked:border-primary transition-all cursor-pointer" 
                        />
                        <svg className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className={`text-base transition-colors ${selectedConditions.includes(condition) ? 'text-foreground font-medium' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {condition}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <div className="flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4 mb-8 pb-6 border-b border-border/40">
            <div>
              <h2 className="text-3xl font-bold text-foreground">
                {selectedGender !== 'all' ? `${selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)}'s ` : ''}
                {selectedCategory !== 'All' ? selectedCategory : 'All Products'}
              </h2>
              <p className="text-base text-muted-foreground mt-2">
                Showing <span className="font-semibold text-foreground">{filteredAndSortedProducts.length}</span> results
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">Sort by</span>
              <div className="relative">
                <select 
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-card border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer shadow-sm hover:border-primary/50 transition-colors"
                >
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 1L5 5L9 1" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {filteredAndSortedProducts.length > 0 ? (
            <ProductGrid products={filteredAndSortedProducts} />
          ) : (
            <div className="text-center py-24 px-4 bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-card flex items-center justify-center shadow-sm">
                <Filter className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground">No products found</h3>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                We couldn't find any items matching your filters. Try adjusting your search criteria.
              </p>
              <button
                onClick={resetFilters}
                className="px-8 py-3 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
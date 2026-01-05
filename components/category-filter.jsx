'use client';

import { categories } from '../libs/data';
import { Filter, Check } from 'lucide-react';

export default function CategoryFilter({ 
  selectedCategory, 
  selectedGender,
  onCategoryChange,
  onGenderChange 
}) {
  const genders = [
    { value: 'all', label: 'All', emoji: '👥' },
    { value: 'men', label: 'Men', emoji: '👨' },
    { value: 'women', label: 'Women', emoji: '👩' },
    { value: 'unisex', label: 'Unisex', emoji: '⚥' },
  ];

  const filteredCategories = categories.filter(cat => 
    selectedGender === 'all' || cat.gender === selectedGender || cat.gender === 'unisex'
  );

  // Get unique categories
  const uniqueCategories = Array.from(
    new Map(filteredCategories.map(cat => [cat.name, cat])).values()
  );

  return (
    <div className="space-y-10">
      {/* Gender Filter */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-bold text-xl text-foreground">Filter by Gender</h3>
        </div>
        
        {/* Grid Layout for Gender Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {genders.map((gender) => {
            const isSelected = selectedGender === gender.value;
            return (
              <button
                key={gender.value}
                onClick={() => onGenderChange(gender.value)}
                className={`
                  relative flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200 border
                  ${isSelected 
                    ? 'bg-primary text-primary-foreground border-primary shadow-md transform scale-[1.02]' 
                    : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <span className="text-lg">{gender.emoji}</span>
                <span>{gender.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="font-bold text-xl text-foreground mb-4">Shop by Category</h3>
        <div className="flex flex-wrap gap-2">
          {uniqueCategories.map((category) => {
            const isSelected = selectedCategory === category.name;
            return (
              <button
                key={category.name}
                onClick={() => onCategoryChange(category.name)}
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 border
                  ${isSelected 
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm' 
                    : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:bg-muted/50'
                  }
                `}
              >
                <span>{category.icon}</span>
                {category.name}
                {isSelected && <Check className="w-3.5 h-3.5 ml-1 animate-in zoom-in" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
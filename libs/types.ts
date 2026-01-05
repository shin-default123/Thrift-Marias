export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  rating: number;
  description: string;
  size: string;
  condition: string;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  name: string;
  icon: string;
  gender?: 'men' | 'women' | 'unisex';
}
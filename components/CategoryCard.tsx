
import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link 
      to={`/category/${category.id}`} 
      className="group block overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ease-in-out hover:scale-105 active:scale-100 hover:shadow-xl"
    >
      <div className="aspect-w-3 aspect-h-2">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex h-20 items-center justify-center p-4 text-center">
        <h3 className="text-xl font-display font-bold text-primary-blue">{category.name}</h3>
      </div>
    </Link>
  );
};

export default CategoryCard;

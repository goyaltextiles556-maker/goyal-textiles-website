
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index = 0 }) => {
  return (
    <ReactRouterDOM.Link 
      to={`/category/${category.id}`} 
      className="group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-xl transition-all duration-350 ease-out hover:-translate-y-1.5 active:scale-[0.98] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-w-3 aspect-h-2 relative overflow-hidden bg-gray-100">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-primary-blue/0 group-hover:bg-primary-blue/10 transition-all duration-300 ease-out" />
      </div>
      <div className="flex h-20 items-center justify-center p-4 text-center group-hover:bg-blue-50/50 transition-colors duration-300">
        <h3 className="text-xl font-display font-bold text-primary-blue group-hover:text-blue-800 transition-colors duration-300 ease-out">
          {category.name}
        </h3>
      </div>
    </ReactRouterDOM.Link>
  );
};

export default CategoryCard;

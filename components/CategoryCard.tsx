
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
      className="group block overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.99] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="aspect-w-3 aspect-h-2">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>
      <div className="flex h-20 items-center justify-center p-4 text-center">
        <h3 className="text-xl font-display font-bold text-primary-blue">
          {category.name}
        </h3>
      </div>
    </ReactRouterDOM.Link>
  );
};

export default CategoryCard;

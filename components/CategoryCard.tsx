
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
      className="group block overflow-hidden rounded-xl bg-white card-shadow-subtle hover:card-shadow-elevated transition-all duration-400 ease-out hover:-translate-y-3 active:scale-[0.98] opacity-0 animate-fade-in-up"
      style={{ animationDelay: `${index * 120}ms` }}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 h-56 sm:h-64">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-blue/50 via-primary-blue/15 to-transparent group-hover:from-primary-blue/60 group-hover:via-primary-blue/25 transition-all duration-400 ease-out" />
      </div>
      <div className="flex h-28 items-center justify-center p-4 text-center group-hover:bg-blue-50/80 transition-all duration-300">
        <h3 className="text-2xl font-bold text-primary-blue group-hover:text-blue-900 transition-colors duration-300 ease-out leading-tight">
          {category.name}
        </h3>
      </div>
    </ReactRouterDOM.Link>
  );
};

export default CategoryCard;

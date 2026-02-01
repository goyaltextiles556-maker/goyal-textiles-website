
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <ReactRouterDOM.Link 
      to={`/category/${category.id}`} 
      className="group block overflow-hidden rounded-lg bg-white shadow-md transition-transform,transition-shadow duration-300 ease-out hover:-translate-y-1.5 active:scale-[0.98] active:shadow-lg hover:shadow-xl"
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

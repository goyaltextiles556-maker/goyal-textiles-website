
import React from 'react';
import { Link } from 'react-router-dom';
import type { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={`/category/${category.id}`} className="group block text-center">
      <div className="overflow-hidden aspect-w-3 aspect-h-2 rounded-lg">
        <img 
          src={category.image} 
          alt={category.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
      </div>
      <h3 className="mt-4 text-xl font-display font-bold text-primary-blue">{category.name}</h3>
    </Link>
  );
};

export default CategoryCard;
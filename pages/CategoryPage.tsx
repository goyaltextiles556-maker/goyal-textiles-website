
import React from 'react';
import { categories } from '../data/products';
import CategoryCard from '../components/CategoryCard';

const CategoryPage: React.FC = () => {
  return (
    <div className="text-center">
  <h1 className="text-4xl font-display font-bold text-primary-blue mb-8">All Categories</h1>
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;


import React, { useState, useMemo } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  const { categoryId } = ReactRouterDOM.useParams<{ categoryId: string }>();
  const [sortOption, setSortOption] = useState('relevance');
  
  const category = categories.find(c => c.id === categoryId);
  
  const sortedProducts = useMemo(() => {
    const filteredProducts = products.filter(p => p.category === categoryId);
    
    switch (sortOption) {
      case 'price-asc':
        return [...filteredProducts].sort((a, b) => a.price - b.price);
      case 'price-desc':
        return [...filteredProducts].sort((a, b) => b.price - a.price);
      case 'latest':
        // Assuming product IDs are somewhat sequential, a reverse sort can act as "latest"
        return [...filteredProducts].sort((a, b) => b.id.localeCompare(a.id));
      case 'relevance':
      default:
        return filteredProducts;
    }
  }, [categoryId, sortOption]);

  if (!category) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h2 className="text-2xl font-semibold text-gray-800">Category not found</h2>
        <ReactRouterDOM.Link to="/" className="text-primary-blue hover:underline hover:text-blue-800 transition-colors duration-300 mt-6 inline-block font-medium">
          Back to Home
        </ReactRouterDOM.Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-2">{category.name}</h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-primary-blue/80 to-transparent mx-auto"></div>
      </div>
      
      <div className="flex justify-end mb-6">
        <div className="relative">
          <select 
            id="sort" 
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none w-48 bg-white border border-gray-300/60 rounded-lg py-2 pl-3 pr-8 text-sm text-gray-700 focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all duration-300 ease-out hover:border-gray-400/60 cursor-pointer"
          >
            <option value="relevance">Sort by: Relevance</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="latest">Latest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
            </svg>
          </div>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {sortedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 animate-fade-in-up py-12 text-lg">No products found in this category yet.</p>
      )}
    </div>
  );
};

export default ProductListPage;

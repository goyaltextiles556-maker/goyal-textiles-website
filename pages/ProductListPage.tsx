
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  const { categoryId } = ReactRouterDOM.useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const filteredProducts = products.filter(p => p.category === categoryId);

  if (!category) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h2 className="text-2xl font-semibold">Category not found</h2>
        <ReactRouterDOM.Link to="/categories" className="text-primary-blue hover:underline hover:text-blue-800 transition-colors duration-300 mt-4 inline-block">
          Back to Categories
        </ReactRouterDOM.Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in-up">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12 hover:scale-105 transition-transform duration-300">{category.name}</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 animate-fade-in-up">No products found in this category yet.</p>
      )}
    </div>
  );
};

export default ProductListPage;

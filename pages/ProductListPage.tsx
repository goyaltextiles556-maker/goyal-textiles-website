
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';

const ProductListPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  
  const category = categories.find(c => c.id === categoryId);
  const filteredProducts = products.filter(p => p.category === categoryId);

  if (!category) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h2 className="text-2xl font-semibold text-gray-800">Category not found</h2>
        <Link to="/" className="text-primary-blue hover:underline hover:text-blue-800 transition-colors duration-300 mt-6 inline-block font-medium">
          Back to Home
        </Link>
      </div>
    );
  }
  
  return (
    <div className="animate-fade-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-2">{category.name}</h1>
        <div className="h-1.5 w-16 bg-gradient-to-r from-primary-blue/80 to-transparent mx-auto"></div>
      </div>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
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

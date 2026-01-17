
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
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Category not found</h2>
        <Link to="/categories" className="text-primary-blue hover:underline mt-4 inline-block">
          Back to Categories
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">{category.name}</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found in this category yet.</p>
      )}
    </div>
  );
};

export default ProductListPage;

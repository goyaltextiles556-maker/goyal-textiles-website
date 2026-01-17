
import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  return (
    <div className="bg-white border border-gray-200/80 p-4 flex flex-col h-full rounded-lg">
      <Link to={`/product/${product.id}`} className="block mb-4">
        <div className="aspect-w-1 aspect-h-1 bg-gray-100 overflow-hidden rounded-md">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex-grow flex flex-col">
        {product.brand && <p className="text-xs uppercase tracking-wider text-gray-500">{product.brand}</p>}
        <h3 className="text-lg font-medium text-gray-800 flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-primary-blue transition-colors">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
        
        <div className="mt-2">
          <p className="text-lg font-semibold text-gray-900">
            ₹{product.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500"> / {product.unit}</span>
          </p>
          {hasDiscount && (
            <div className="flex items-center space-x-2 text-sm">
              <p className="text-gray-500 line-through">
                ₹{product.originalPrice!.toLocaleString()}
              </p>
              <p className="font-semibold text-green-600">
                {discountPercentage}% OFF
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="secondary" className="w-full">View Details</Button>
        </Link>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
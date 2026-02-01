
import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from './Button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const displayUnit = product.unit === 'meter' ? 'meter' : 'set';

  return (
    <div 
      className="bg-white border border-gray-200/80 p-4 flex flex-col h-full rounded-lg shadow-sm transition-transform,transition-shadow duration-300 ease-out hover:shadow-lg hover:-translate-y-1.5 active:scale-[0.98]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <ReactRouterDOM.Link to={`/product/${product.id}`} className="block mb-4">
        <div className="relative w-full aspect-square bg-gray-100 overflow-hidden rounded-md">
          {/* First Image (Visible by default) */}
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className={`
                absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-out
                ${isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'}
            `}
            onError={(e) => {
              console.error(`Failed to load image: ${product.images[0]}`);
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
            }}
          />
          {/* Second Image (Visible on hover) */}
          {product.images.length > 1 && (
            <img 
                src={product.images[1]} 
                alt={`${product.name} alternate view`} 
                className={`
                    absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out
                    ${isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}
                `}
                onError={(e) => {
                  console.error(`Failed to load image: ${product.images[1]}`);
                  (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
                }}
            />
          )}
        </div>
      </ReactRouterDOM.Link>
      <div className="flex-grow flex flex-col">
        {product.brand && <p className="text-xs uppercase tracking-wider text-gray-500">{product.brand}</p>}
        <h3 className="text-lg font-medium text-gray-800 flex-grow">
          <ReactRouterDOM.Link to={`/product/${product.id}`} className="hover:text-primary-blue transition-colors">
            {product.name}
          </ReactRouterDOM.Link>
        </h3>
        <p className="text-gray-600 mt-1 text-sm">{product.description}</p>
        
        <div className="mt-2">
          <p className="text-lg font-semibold text-gray-900">
            ₹{product.price.toLocaleString()}
            <span className="text-sm font-normal text-gray-500"> / {displayUnit}</span>
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
        <ReactRouterDOM.Link to={`/product/${product.id}`} className="w-full">
          <Button variant="secondary" className="w-full">View Details</Button>
        </ReactRouterDOM.Link>
        <Button onClick={handleAddToCart} className="w-full">Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;

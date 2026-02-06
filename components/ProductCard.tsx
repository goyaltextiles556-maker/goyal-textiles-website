
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types';
import { useCart } from '../hooks/useCart';
import Button from './Button';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
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
      className="bg-white border border-gray-200/60 p-4 flex flex-col h-full rounded-xl shadow-sm hover:shadow-xl hover:border-primary-blue/40 transition-all duration-350 ease-out hover:-translate-y-2 active:scale-[0.99] opacity-0 animate-fade-in-up group overflow-hidden"
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block mb-4">
        <div className="relative w-full aspect-square bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden rounded-lg">
          {product.images.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={idx === 0 ? product.name : `${product.name} alternate view`}
              className={`
                absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out group-hover:brightness-110
                ${idx === 0 ? 'group-hover:scale-105' : ''}
                ${idx === 0
                  ? isHovered && product.images.length > 1 ? 'opacity-0' : 'opacity-100'
                  : isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                }
              `}
              onError={(e) => {
                console.error(`Failed to load image: ${src}`);
              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23e5e7eb" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="system-ui" font-size="16" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
              }}
            />
          ))}
        </div>
      </Link>
      <div className="flex-grow flex flex-col">
        {product.brand && <p className="text-sm uppercase tracking-wider text-gray-900 mb-1.5 group-hover:text-primary-blue transition-colors duration-300 font-bold">{product.brand}</p>}
        <h3 className="text-xs font-medium text-gray-600 flex-grow">
          <Link to={`/product/${product.id}`} className="hover:text-primary-blue transition-colors duration-300 ease-out line-clamp-2 block">
            {product.name}
          </Link>
        </h3>
        <p className="text-gray-600 mt-2 text-xs leading-relaxed line-clamp-2">{product.description}</p>
        
        <div className="mt-3">
          <p className="text-lg font-bold text-gray-900 transition-colors duration-300 group-hover:text-primary-blue">
            ₹{product.price.toLocaleString()}
            <span className="text-xs font-normal text-gray-500/80 ml-1"> / {displayUnit}</span>
          </p>
          {hasDiscount && (
            <div className="flex items-center space-x-2 text-sm mt-2 transition-all duration-300">
              <p className="text-gray-500/80 line-through text-xs">
                ₹{product.originalPrice!.toLocaleString()}
              </p>
              <p className="font-bold text-green-600 bg-green-50/80 px-2.5 py-0.5 rounded-md transition-all duration-300 group-hover:bg-green-100/80 text-xs">
                {discountPercentage}% OFF
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        <Link to={`/product/${product.id}`} className="w-full">
          <Button variant="secondary" className="w-full text-xs py-2">View Details</Button>
        </Link>
        <button onClick={handleAddToCart} className="w-full">
          <Button className="w-full text-xs py-2">Add to Cart</Button>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;


import React, { useState } from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { products } from '../data/products';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import PolicySummary from '../components/PolicySummary';

const ProductDetailPage: React.FC = () => {
  const { productId } = ReactRouterDOM.useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <ReactRouterDOM.Link to="/" className="text-primary-blue hover:underline hover:text-blue-800 transition-colors duration-300 mt-4 inline-block">Back to Home</ReactRouterDOM.Link>
      </div>
    );
  }

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + product.images.length) % product.images.length);
  };
  
  const displayUnit = product.unit === 'meter' ? 'meter' : 'set';
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    const alertMessage = `${quantity} ${displayUnit}(s) of ${product.name} added to cart.`;
    alert(alertMessage);
  };

  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <img src={product.images[currentImageIndex]} alt={`${product.name} ${currentImageIndex + 1}`} className="w-full h-full object-cover hover:brightness-105 transition-all duration-300" />
          </div>
          {product.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95">
                <FiChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-2 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95">
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {product.brand && <p className="text-sm uppercase tracking-wider text-gray-500 hover:text-primary-blue transition-colors duration-300">{product.brand}</p>}
          <h1 className="text-4xl font-display font-bold text-primary-blue mt-2 hover:text-blue-800 transition-colors duration-300">{product.name}</h1>
          
          <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-900 hover:text-primary-blue transition-colors duration-300">
              ₹{product.price.toLocaleString()}
              <span className="text-lg font-normal text-gray-500"> / {displayUnit}</span>
            </p>
            {hasDiscount && (
              <div className="flex items-center space-x-3 text-md mt-1">
                <p className="text-gray-500 line-through">
                  ₹{product.originalPrice!.toLocaleString()}
                </p>
                <p className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded transition-all duration-300 hover:bg-green-100">
                  {discountPercentage}% OFF
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4 text-gray-700">
            <p className="transition-all duration-300">{product.longDescription}</p>
            <div className="hover:bg-blue-50/50 p-3 rounded transition-colors duration-300">
              <h3 className="font-semibold text-gray-800">Intended Use:</h3>
              <p>{product.intendedUse}</p>
            </div>
            <div className="hover:bg-blue-50/50 p-3 rounded transition-colors duration-300">
              <h3 className="font-semibold text-gray-800">Material Details:</h3>
              <p>{product.materialDetails}</p>
            </div>
          </div>
          
          <div className="mt-8 flex items-center space-x-4">
            <label htmlFor="quantity" className="font-medium">Quantity ({displayUnit}s):</label>
            <input 
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue hover:border-primary-blue transition-colors duration-300"
            />
          </div>

          <div className="mt-8 max-w-xs hover:scale-105 transition-transform duration-300 active:scale-95">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>

          <PolicySummary />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

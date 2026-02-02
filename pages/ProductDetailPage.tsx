
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
      <div className="text-center py-16 animate-fade-in-up">
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10 animate-fade-in-up">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Image Gallery */}
        <div className="relative animate-fade-in">
          <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 mb-4">
            <img src={product.images[currentImageIndex]} alt={`${product.name} ${currentImageIndex + 1}`} className="w-full h-full object-cover hover:brightness-105 transition-all duration-300" />
          </div>
          {product.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl">
                <FiChevronLeft size={24} className="text-primary-blue" />
              </button>
              <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl">
                <FiChevronRight size={24} className="text-primary-blue" />
              </button>
            </>
          )}
        </div>

        {/* Product Details */}
        <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
          {product.brand && <p className="text-sm uppercase tracking-wider text-gray-500/70 hover:text-primary-blue transition-colors duration-300 font-semibold">{product.brand}</p>}
          <h1 className="text-4xl font-display font-bold text-primary-blue mt-3 hover:text-blue-900 transition-colors duration-300 leading-tight">{product.name}</h1>
          
          <div className="mt-6">
            <p className="text-4xl font-bold text-gray-900 hover:text-primary-blue transition-colors duration-300">
              ₹{product.price.toLocaleString()}
              <span className="text-lg font-normal text-gray-500/80 ml-2"> / {displayUnit}</span>
            </p>
            {hasDiscount && (
              <div className="flex items-center space-x-4 text-lg mt-3">
                <p className="text-gray-500/80 line-through text-xl">
                  ₹{product.originalPrice!.toLocaleString()}
                </p>
                <p className="font-bold text-green-600 bg-green-50/80 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-green-100/80">
                  {discountPercentage}% OFF
                </p>
              </div>
            )}
          </div>

          <div className="mt-8 space-y-5 text-gray-700 leading-relaxed">
            <p className="text-base transition-all duration-300">{product.longDescription}</p>
            <div className="hover:bg-blue-50/60 p-5 rounded-lg transition-colors duration-300 border border-blue-100/0 hover:border-blue-100/50">
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Intended Use:</h3>
              <p className="text-gray-700">{product.intendedUse}</p>
            </div>
            <div className="hover:bg-blue-50/60 p-5 rounded-lg transition-colors duration-300 border border-blue-100/0 hover:border-blue-100/50">
              <h3 className="font-bold text-gray-800 mb-2 text-lg">Material Details:</h3>
              <p className="text-gray-700">{product.materialDetails}</p>
            </div>
          </div>
          
          <div className="mt-10 flex items-center space-x-4">
            <label htmlFor="quantity" className="font-semibold text-lg text-gray-800">Quantity ({displayUnit}s):</label>
            <input 
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              className="w-24 border-2 border-gray-300/60 rounded-lg shadow-sm py-2.5 px-3 text-center focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue hover:border-primary-blue transition-all duration-300 font-semibold"
            />
          </div>

          <div className="mt-10 max-w-xs hover:scale-105 transition-transform duration-300 active:scale-95">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>

          <PolicySummary />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

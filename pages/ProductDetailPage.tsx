
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import PolicySummary from '../components/PolicySummary';
import { createRipple } from '../utils/rippleEffect';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h2 className="text-2xl font-semibold text-gray-800">Product not found</h2>
        <Link to="/" className="text-primary-blue hover:underline hover:text-blue-800 transition-colors duration-300 mt-6 inline-block font-medium">
          Back to Home
        </Link>
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
        {/* Image Gallery Column */}
        <div className="space-y-6">
          <div className="relative animate-fade-in group">
            <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.images[currentImageIndex]} alt={`${product.name} ${currentImageIndex + 1}`} className="w-full h-full object-cover group-hover:brightness-105 transition-all duration-300" />
            </div>
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100" onMouseEnter={createRipple} aria-label="Previous image">
                  <FiChevronLeft size={24} className="text-primary-blue" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg hover:shadow-xl opacity-0 group-hover:opacity-100" onMouseEnter={createRipple} aria-label="Next image">
                  <FiChevronRight size={24} className="text-primary-blue" />
                </button>
              </>
            )}
          </div>
          
          {product.fabricDetails && (
            <div className="bg-blue-50/60 border border-blue-100/50 rounded-xl p-5 animate-fade-in-up" style={{ animationDelay: '50ms' }}>
              <h3 className="text-lg font-bold text-primary-blue mb-4">Fabric Information</h3>
              <div className="space-y-3 text-sm text-gray-800">
                {product.fabricDetails.width && <div className="flex justify-between"><span className="font-semibold text-gray-600">Width:</span><span>{product.fabricDetails.width}</span></div>}
                {product.fabricDetails.lengthNeeded && <div className="flex justify-between"><span className="font-semibold text-gray-600">Length Needed:</span><span>{product.fabricDetails.lengthNeeded}</span></div>}
                {product.fabricDetails.usageReference && <div className="flex justify-between"><span className="font-semibold text-gray-600">Usage Reference:</span><span>{product.fabricDetails.usageReference}</span></div>}
              </div>
            </div>
          )}
        </div>

        {/* Product Details Column */}
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
            <label className="font-semibold text-lg text-gray-800">Quantity ({displayUnit}s):</label>
            <div className="flex items-center border-2 border-gray-300/60 rounded-lg bg-white hover:border-primary-blue/30 transition-colors duration-300">
              <button 
                onClick={() => setQuantity(q => Math.max(1, q - 1))} 
                className="p-3 hover:bg-gray-100 rounded-l-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed" 
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
              >
                <FiMinus size={16} className="text-gray-700" />
              </button>
              <span className="px-5 font-semibold text-center text-gray-800 w-16">{quantity}</span>
              <button 
                onClick={() => setQuantity(q => q + 1)} 
                className="p-3 hover:bg-gray-100 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50" 
                aria-label="Increase quantity"
              >
                <FiPlus size={16} className="text-gray-700" />
              </button>
            </div>
          </div>

          <div className="mt-10 max-w-xs">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>

          <PolicySummary />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
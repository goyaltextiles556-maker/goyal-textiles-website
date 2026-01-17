
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold">Product not found</h2>
        <Link to="/" className="text-primary-blue hover:underline mt-4 inline-block">Back to Home</Link>
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
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity} ${product.unit}(s) of ${product.name} added to cart.`);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="relative">
          <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden">
            <img src={product.images[currentImageIndex]} alt={`${product.name} ${currentImageIndex + 1}`} className="w-full h-full object-cover" />
          </div>
          {product.images.length > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full transition">
                <FiChevronLeft size={24} />
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full transition">
                <FiChevronRight size={24} />
              </button>
            </>
          )}
        </div>

        {/* Product Details */}
        <div>
          {product.brand && <p className="text-sm uppercase tracking-wider text-gray-500">{product.brand}</p>}
          <h1 className="text-4xl font-display font-bold text-primary-blue mt-2">{product.name}</h1>
          
          <div className="mt-4">
            <p className="text-3xl font-semibold text-gray-900">
              ₹{product.price.toLocaleString()}
              <span className="text-lg font-normal text-gray-500"> / {product.unit}</span>
            </p>
            {hasDiscount && (
              <div className="flex items-center space-x-3 text-md mt-1">
                <p className="text-gray-500 line-through">
                  ₹{product.originalPrice!.toLocaleString()}
                </p>
                <p className="font-semibold text-green-600">
                  {discountPercentage}% OFF
                </p>
              </div>
            )}
          </div>

          <div className="mt-6 space-y-4 text-gray-700">
            <p>{product.longDescription}</p>
            <div>
              <h3 className="font-semibold text-gray-800">Intended Use:</h3>
              <p>{product.intendedUse}</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Material Details:</h3>
              <p>{product.materialDetails}</p>
            </div>
          </div>
          
          <div className="mt-8 flex items-center space-x-4">
            <label htmlFor="quantity" className="font-medium">Quantity ({product.unit}s):</label>
            <input 
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10)))}
              min="1"
              className="w-20 border-gray-300 rounded-md shadow-sm focus:ring-primary-blue focus:border-primary-blue"
            />
          </div>

          <div className="mt-8 max-w-xs">
            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
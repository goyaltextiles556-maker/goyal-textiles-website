
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { FiChevronDown, FiInfo, FiMinus, FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';
import PolicySummary from '../components/PolicySummary';

// Simple state-managed accordion component
const Accordion: React.FC<{ title: string; children: React.ReactNode; defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b border-gray-200/80">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left hover:bg-gray-50/70 px-2 rounded-t-md"
      >
        <span className="font-semibold text-lg text-gray-800">{title}</span>
        <FiChevronDown className={`transition-transform duration-300 text-gray-500 ${isOpen ? 'rotate-180' : ''}`} size={20} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-[1000px]' : 'max-h-0'}`}>
        <div className="pb-6 pt-2 px-2 text-gray-700 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};

const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find(p => p.id === productId);
  const { addToCart } = useCart();
  
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  
  // Swipe gallery state
  const [dragStartX, setDragStartX] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);

  // Conditional quantity logic
  const isDecimal = product?.unit === 'meter' && product?.category !== 'gifting';
  const [quantity, setQuantity] = React.useState<number>(isDecimal ? 1.0 : 1);

  const step = isDecimal ? 0.2 : 1;
  const minQuantity = isDecimal ? 0.2 : 1;
  const quantityPrecision = isDecimal ? 1 : 0;

  // Refs for long-press functionality
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const handleQuantityChange = (newQuantity: number) => {
    const roundedQuantity = parseFloat(newQuantity.toFixed(2));
    if (roundedQuantity >= minQuantity) {
        setQuantity(roundedQuantity);
    } else {
        setQuantity(minQuantity);
    }
  };

  // Handlers for long-press quantity buttons
  const stopCounter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleIncrement = () => {
    setQuantity(q => parseFloat((q + step).toFixed(2)));
  };
  
  const handleDecrement = () => {
    setQuantity(q => {
      const newQuantity = parseFloat((q - step).toFixed(2));
      return newQuantity >= minQuantity ? newQuantity : minQuantity;
    });
  };

  const startIncrement = () => {
    stopCounter();
    handleIncrement(); // Increment once immediately
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(handleIncrement, 100);
    }, 400);
  };

  const startDecrement = () => {
    stopCounter();
    handleDecrement(); // Decrement once immediately
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(handleDecrement, 100);
    }, 400);
  };
  
  // Swipe handlers for image gallery
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (product && product.images.length <= 1) return;
    setIsDragging(true);
    setDragStartX('touches' in e ? e.touches[0].clientX : e.clientX);
    e.preventDefault();
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || (product && product.images.length <= 1)) return;
    const currentX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = currentX - dragStartX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragThreshold = 50; // pixels
    if (dragOffset > dragThreshold) {
      prevImage();
    } else if (dragOffset < -dragThreshold) {
      nextImage();
    }

    setDragOffset(0); // Reset offset
  };

  const nextImage = React.useCallback(() => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  }, [product]);

  const prevImage = React.useCallback(() => {
    if (!product) return;
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  }, [product]);

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
  
  const composition = product.materialDetails.split('.')[0]?.trim();
  const careInstructions = product.materialDetails.split('.').slice(1).join('.').trim();
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity.toFixed(quantityPrecision)} ${product.unit}(s) of ${product.name} added to cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Image Gallery Column */}
        <div className="space-y-4 lg:sticky lg:top-24 lg:z-10">
          <div 
            className="relative animate-fade-in group"
          >
            <div 
              className="overflow-hidden rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              onMouseDown={handleDragStart} onMouseMove={handleDragMove} onMouseUp={handleDragEnd} onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart} onTouchMove={handleDragMove} onTouchEnd={handleDragEnd}
            >
              <div 
                className="flex"
                style={{
                  transform: `translateX(calc(-${currentImageIndex * 100}% + ${dragOffset}px))`,
                  transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: product.images.length > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                }}
              >
                {product.images.map((img, index) => (
                  <div key={index} className="w-full flex-shrink-0 aspect-square bg-gradient-to-br from-gray-50 to-gray-100">
                    <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover select-none" draggable="false" />
                  </div>
                ))}
              </div>
            </div>

            {product.images.length > 1 && (
              <>
                <button 
                  onClick={prevImage} 
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:opacity-70 lg:group-hover:opacity-100" 
                  aria-label="Previous image"
                >
                  <FiChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage} 
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm p-2 rounded-full shadow-md text-gray-700 hover:bg-white hover:scale-110 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100 lg:opacity-70 lg:group-hover:opacity-100"
                  aria-label="Next image"
                >
                  <FiChevronRight size={24} />
                </button>
              </>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="flex justify-center gap-3 overflow-x-auto py-2 -mx-2 px-2">
              {product.images.map((img, index) => (
                <button 
                  key={index} 
                  onClick={() => setCurrentImageIndex(index)} 
                  className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue ${currentImageIndex === index ? 'border-primary-blue shadow-md' : 'border-gray-200/80 hover:border-primary-blue/50'}`}
                  aria-label={`Go to image ${index + 1}`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details Column */}
        <div className="animate-fade-in-up flex flex-col space-y-8" style={{ animationDelay: '100ms' }}>
          <div>
            {product.brand && <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">{product.brand}</p>}
            <h1 className="text-3xl sm:text-4xl font-bold font-display text-primary-blue mt-1">{product.name}</h1>
            <p className="text-lg text-gray-600 mt-4 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 border-y border-gray-200/80 py-5">
            {product.fabricDetails?.width && <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Width</p><p className="text-base font-semibold text-gray-800 mt-1">{product.fabricDetails.width}</p></div>}
            {composition && <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Composition</p><p className="text-base font-semibold text-gray-800 mt-1">{composition}</p></div>}
            {product.intendedUse && <div><p className="text-xs font-bold text-gray-500 uppercase tracking-wider">Ideal For</p><p className="text-base font-semibold text-gray-800 mt-1">{product.intendedUse.split(',')[0]}</p></div>}
          </div>

          {/* Purchase Section */}
          <div className="space-y-6">
            <div className="flex justify-between items-baseline">
              <div>
                <p className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</p>
                <p className="text-sm text-gray-500 -mt-1">per {product.unit}</p>
              </div>
              {hasDiscount && (
                <div className="flex items-center gap-x-2">
                  <p className="text-gray-400 line-through text-lg">₹{product.originalPrice!.toLocaleString()}</p>
                  <p className="font-bold text-green-600 bg-green-100/80 px-2.5 py-1 rounded-md text-xs">{Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)}% OFF</p>
                </div>
              )}
            </div>
            <div className="bg-gray-50/80 rounded-xl p-5 border border-gray-200/60">
              <div className="flex items-center justify-between">
                <label htmlFor="quantity-input" className="font-semibold text-lg text-gray-800">Quantity</label>
                <div className="flex items-center border-2 border-gray-300/60 rounded-lg bg-white has-[:focus]:border-primary-blue/50 has-[:focus]:ring-2 has-[:focus]:ring-primary-blue/20 transition-all duration-300 w-fit">
                  <button 
                    onMouseDown={startDecrement} onMouseUp={stopCounter} onMouseLeave={stopCounter} onTouchStart={startDecrement} onTouchEnd={stopCounter}
                    className="p-3 hover:bg-gray-100 rounded-l-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label="Decrease quantity" 
                    disabled={quantity <= minQuantity}
                  >
                    <FiMinus size={16} className="text-gray-700" />
                  </button>
                  <input
                    id="quantity-input"
                    type="number"
                    value={quantity.toFixed(quantityPrecision)}
                    onChange={(e) => handleQuantityChange(parseFloat(e.target.value) || minQuantity)}
                    step={step}
                    min={minQuantity}
                    className="w-20 text-center font-semibold text-gray-800 bg-transparent focus:outline-none"
                    aria-label="Product quantity"
                  />
                  <button 
                    onMouseDown={startIncrement} onMouseUp={stopCounter} onMouseLeave={stopCounter} onTouchStart={startIncrement} onTouchEnd={stopCounter}
                    className="p-3 hover:bg-gray-100 rounded-r-md transition-colors duration-200" 
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={16} className="text-gray-700" />
                  </button>
                </div>
              </div>
              {isDecimal && product.fabricDetails?.usageReference && (
                <div className="mt-4 text-xs text-gray-600 bg-blue-100/50 p-3 rounded-lg border border-blue-200/50 flex items-start gap-2">
                  <FiInfo className="flex-shrink-0 mt-0.5 text-blue-700" size={14}/><span>{product.fabricDetails.usageReference}</span>
                </div>
              )}
              <div className="mt-5 pt-5 border-t border-gray-200/80 flex items-baseline justify-between">
                <p className="text-lg font-bold text-gray-900">Total Price</p>
                <p className="text-3xl font-bold text-primary-blue">₹{(product.price * quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
              </div>
            </div>
          </div>
          
          <Button onClick={handleAddToCart}>Add to Cart</Button>
          
          <div className="pt-4">
            <Accordion title="Description" defaultOpen={true}>
              <p className="max-w-prose leading-relaxed">{product.longDescription}</p>
            </Accordion>
            <Accordion title="Specifications">
              <dl className="space-y-3 text-sm">
                {product.fabricDetails?.width && <div className="grid grid-cols-2"><dt className="font-semibold text-gray-600">Width</dt><dd className="text-gray-800">{product.fabricDetails.width}</dd></div>}
                {composition && <div className="grid grid-cols-2"><dt className="font-semibold text-gray-600">Composition</dt><dd className="text-gray-800">{composition}</dd></div>}
                {product.intendedUse && <div className="grid grid-cols-2"><dt className="font-semibold text-gray-600">Intended Use</dt><dd className="text-gray-800">{product.intendedUse}</dd></div>}
              </dl>
            </Accordion>
            {careInstructions && (
              <Accordion title="Care Instructions">
                <p>{careInstructions}</p>
              </Accordion>
            )}
             <Accordion title="Our Policies">
              <PolicySummary />
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

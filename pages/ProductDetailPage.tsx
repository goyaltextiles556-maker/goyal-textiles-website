
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { products, categories } from '../data/products';
import { FiChevronLeft, FiChevronRight, FiMinus, FiPlus, FiInfo, FiChevronDown } from 'react-icons/fi';
import Button from '../components/Button';
import { useCart } from '../hooks/useCart';

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
  
  // Conditional quantity logic
  const isDecimal = product?.unit === 'meter' && product?.category !== 'gifting';
  const [quantity, setQuantity] = React.useState<number>(isDecimal ? 1.0 : 1);

  const step = isDecimal ? 0.2 : 1;
  const minQuantity = isDecimal ? 0.2 : 1;
  const quantityPrecision = isDecimal ? 1 : 0;

  const handleQuantityChange = (newQuantity: number) => {
    const roundedQuantity = parseFloat(newQuantity.toFixed(2));
    if (roundedQuantity >= minQuantity) {
        setQuantity(roundedQuantity);
    } else {
        setQuantity(minQuantity);
    }
  };

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
  
  const category = categories.find(c => c.id === product.category);
  const composition = product.materialDetails.split('.')[0]?.trim();
  const careInstructions = product.materialDetails.split('.').slice(1).join('.').trim();

  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  
  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${quantity.toFixed(quantityPrecision)} ${product.unit}(s) of ${product.name} added to cart.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Image Gallery Column */}
        <div className="space-y-4 sticky top-24">
          <div className="relative animate-fade-in group">
            <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
              <img src={product.images[currentImageIndex]} alt={`${product.name} ${currentImageIndex + 1}`} className="w-full h-full object-cover group-hover:brightness-105 transition-all duration-300" />
            </div>
            {product.images.length > 1 && (
              <>
                <button onClick={prevImage} className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg opacity-0 group-hover:opacity-100" aria-label="Previous image">
                  <FiChevronLeft size={24} className="text-primary-blue" />
                </button>
                <button onClick={nextImage} className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-3 rounded-full transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-blue hover:scale-110 active:scale-95 shadow-lg opacity-0 group-hover:opacity-100" aria-label="Next image">
                  <FiChevronRight size={24} className="text-primary-blue" />
                </button>
              </>
            )}
          </div>
          {product.images.length > 1 && (
            <div className="flex justify-center gap-3">
              {product.images.map((img, index) => (
                <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${currentImageIndex === index ? 'border-primary-blue scale-105 shadow-md' : 'border-transparent hover:border-gray-300'}`}>
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
                <label className="font-semibold text-lg text-gray-800">Quantity</label>
                <div className="flex items-center border-2 border-gray-300/60 rounded-lg bg-white hover:border-primary-blue/30 transition-colors duration-300 w-fit">
                  <button onClick={() => handleQuantityChange(quantity - step)} className="p-3 hover:bg-gray-100 rounded-l-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Decrease quantity" disabled={quantity <= minQuantity}><FiMinus size={16} className="text-gray-700" /></button>
                  <input type="text" value={quantity.toFixed(quantityPrecision)} readOnly className="w-20 text-center font-semibold text-gray-800 bg-transparent focus:outline-none cursor-default" />
                  <button onClick={() => handleQuantityChange(quantity + step)} className="p-3 hover:bg-gray-100 rounded-r-md transition-colors duration-200" aria-label="Increase quantity"><FiPlus size={16} className="text-gray-700" /></button>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;

import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';
import { FiPlus, FiMinus, FiTrash2, FiShoppingCart } from 'react-icons/fi';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cartCount === 0) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <div className="inline-block p-5 bg-blue-100/60 rounded-full mb-6">
          <FiShoppingCart size={40} className="text-primary-blue" />
        </div>
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-10 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <ReactRouterDOM.Link to="/#categories" className="inline-block w-full max-w-xs mx-auto">
          <Button>Browse Fabrics</Button>
        </ReactRouterDOM.Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-8">Shopping Cart <span className="block sm:inline text-2xl font-medium text-gray-600">({cartCount} {cartCount === 1 ? 'item' : 'items'})</span></h1>
      <div className="bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {cartItems.map((item, index) => {
          const isDecimal = item.product.unit === 'meter' && item.product.category !== 'gifting';
          const step = isDecimal ? 0.2 : 1;
          const minQuantity = isDecimal ? 0.2 : 1;
          const quantityPrecision = isDecimal ? 1 : 0;

          const handleQuantityChange = (newQuantity: number) => {
            const roundedQuantity = parseFloat(newQuantity.toFixed(2));
            updateQuantity(item.cartItemId, roundedQuantity >= minQuantity ? roundedQuantity : minQuantity);
          };

          return (
            <div key={item.cartItemId} className="p-4 sm:p-6 border-b border-gray-200/50 last:border-b-0 hover:bg-blue-50/40 transition-colors duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 50}ms` }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                
                {/* Image */}
                <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="flex-shrink-0 self-center">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 sm:w-32 sm:h-32 object-cover rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:brightness-110"/>
                </ReactRouterDOM.Link>
                
                {/* Details & Desktop Actions */}
                <div className="mt-4 sm:mt-0 flex-grow flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  {/* Name & Price */}
                  <div className="flex-grow min-w-0">
                    <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="font-semibold text-base sm:text-lg hover:text-primary-blue transition-colors duration-250 ease-out line-clamp-2">{item.product.name}</ReactRouterDOM.Link>
                    <p className="text-sm text-gray-500 mt-1">₹{item.product.price.toLocaleString()} / {item.product.unit}</p>
                  </div>
                  
                  {/* Desktop Quantity */}
                  <div className="hidden sm:flex items-center border border-gray-300/60 rounded-lg bg-white group-hover:border-primary-blue/30 transition-colors duration-300 mx-6">
                    <button onClick={() => handleQuantityChange(item.quantity - step)} className="p-2.5 hover:bg-gray-100 rounded-l-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Decrease quantity" disabled={item.quantity <= minQuantity}><FiMinus size={16} className="text-gray-700" /></button>
                    <span className="px-3 font-semibold text-center text-gray-800 w-16">{item.quantity.toFixed(quantityPrecision)}</span>
                    <button onClick={() => handleQuantityChange(item.quantity + step)} className="p-2.5 hover:bg-gray-100 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50" aria-label="Increase quantity"><FiPlus size={16} className="text-gray-700" /></button>
                  </div>
                  
                  {/* Desktop Total */}
                  <p className="hidden sm:block font-bold text-lg text-primary-blue w-32 text-right">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  
                  {/* Desktop Delete */}
                  <button onClick={() => removeFromCart(item.cartItemId)} className="hidden sm:flex p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 ml-6" aria-label="Remove item"><FiTrash2 size={20} /></button>
                </div>
              </div>

              {/* Mobile Quantity & Total */}
              <div className="sm:hidden mt-4 pt-4 border-t border-gray-200/60">
                <div className="flex items-center justify-between">
                  <div className="flex items-center border border-gray-300/60 rounded-lg bg-white transition-colors duration-300">
                    <button onClick={() => handleQuantityChange(item.quantity - step)} className="p-2.5 hover:bg-gray-100 rounded-l-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed" aria-label="Decrease quantity" disabled={item.quantity <= minQuantity}><FiMinus size={16} className="text-gray-700" /></button>
                    <span className="px-3 font-semibold text-center text-gray-800 w-16">{item.quantity.toFixed(quantityPrecision)}</span>
                    <button onClick={() => handleQuantityChange(item.quantity + step)} className="p-2.5 hover:bg-gray-100 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50" aria-label="Increase quantity"><FiPlus size={16} className="text-gray-700" /></button>
                  </div>
                  <p className="font-bold text-lg text-primary-blue">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <button onClick={() => removeFromCart(item.cartItemId)} className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200" aria-label="Remove item"><FiTrash2 size={20} /></button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="w-full max-w-md bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between text-xl mb-3">
            <span className="font-semibold text-gray-700">Subtotal:</span>
            <span className="font-bold text-primary-blue">₹{subtotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
          </div>
          <p className="text-xs text-gray-500 mt-3 pb-6 border-b border-gray-200/50">Shipping & taxes calculated at checkout.</p>
          <div className="mt-6">
            <ReactRouterDOM.Link to="/checkout">
              <Button>Proceed to Checkout</Button>
            </ReactRouterDOM.Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;

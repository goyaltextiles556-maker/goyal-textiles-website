
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';

const CartPage: React.FC = () => {
  const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  if (cartCount === 0) {
    return (
      <div className="text-center py-20 animate-fade-in-up">
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-10 text-lg">Looks like you haven't added anything to your cart yet.</p>
        <ReactRouterDOM.Link to="/#categories">
          <div className="w-80 mx-auto">
            <Button>Browse Fabrics</Button>
          </div>
        </ReactRouterDOM.Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-6">Shopping Cart ({cartCount} {cartCount === 1 ? 'item' : 'items'})</h1>
      <div className="bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {cartItems.map((item, index) => {
          const isDecimal = item.product.unit === 'meter' && item.product.category !== 'gifting';
          const step = isDecimal ? 0.2 : 1;
          const minQuantity = isDecimal ? 0.2 : 1;
          const quantityPrecision = isDecimal ? 1 : 0;

          const handleQuantityChange = (newQuantity: number) => {
            const roundedQuantity = parseFloat(newQuantity.toFixed(2));
            if (roundedQuantity >= minQuantity) {
              updateQuantity(item.cartItemId, roundedQuantity);
            } else {
              updateQuantity(item.cartItemId, minQuantity);
            }
          };

          return (
            <div key={item.cartItemId} className="flex p-4 sm:p-6 border-b border-gray-200/50 last:border-b-0 hover:bg-blue-50/40 transition-colors duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 50}ms` }}>
              <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 sm:w-28 sm:h-28 object-cover mr-4 sm:mr-6 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:brightness-110"/>
              </ReactRouterDOM.Link>
              
              <div className="flex-grow flex flex-col justify-between min-w-0">
                <div>
                  <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="font-semibold text-base sm:text-lg hover:text-primary-blue transition-colors duration-250 ease-out line-clamp-2">{item.product.name}</ReactRouterDOM.Link>
                  <p className="text-sm text-gray-500 mt-1 whitespace-nowrap">₹{item.product.price.toLocaleString()} / {item.product.unit}</p>
                </div>
                <p className="font-bold text-lg text-gray-900 mt-2">
                  Total: ₹{(item.product.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>

              <div className="flex flex-col items-end justify-between ml-4 flex-shrink-0">
                <button 
                   onClick={() => removeFromCart(item.cartItemId)} 
                   className="p-2.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                   aria-label="Remove item"
                  >
                    <FiTrash2 size={20} />
                  </button>
                  
                <div className="flex items-center border border-gray-300/60 rounded-lg bg-white group-hover:border-primary-blue/30 transition-colors duration-300 mt-2">
                  <button 
                    onClick={() => handleQuantityChange(item.quantity - step)} 
                    className="p-2.5 hover:bg-gray-100 rounded-l-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50 disabled:opacity-50 disabled:cursor-not-allowed" 
                    aria-label="Decrease quantity"
                    disabled={item.quantity <= minQuantity}
                  >
                    <FiMinus size={16} className="text-gray-700" />
                  </button>
                  <span className="px-3 font-semibold text-center text-gray-800 w-16">{item.quantity.toFixed(quantityPrecision)}</span>
                  <button 
                    onClick={() => handleQuantityChange(item.quantity + step)} 
                    className="p-2.5 hover:bg-gray-100 rounded-r-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-blue/50" 
                    aria-label="Increase quantity"
                  >
                    <FiPlus size={16} className="text-gray-700" />
                  </button>
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
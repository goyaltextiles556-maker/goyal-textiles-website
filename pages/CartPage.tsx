
import React from 'react';
// FIX: Use namespace import for react-router-dom to fix "no exported member" errors.
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import Button from '../components/Button';

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
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-6">Shopping Cart</h1>
      <div className="bg-white border border-gray-200/70 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
        {cartItems.map((item, index) => {
          const displayUnit = item.product.unit === 'meter' ? 'meter' : 'set';
          return (
            <div key={item.product.id} className="flex items-center p-6 border-b border-gray-200/50 last:border-b-0 hover:bg-blue-50/40 transition-colors duration-300 animate-fade-in-up group" style={{ animationDelay: `${index * 50}ms` }}>
              <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="flex-shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-28 h-28 object-cover mr-6 rounded-lg hover:shadow-lg transition-shadow duration-300 cursor-pointer hover:brightness-110"/>
              </ReactRouterDOM.Link>
              <div className="flex-grow">
                <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="font-semibold text-lg hover:text-primary-blue transition-colors duration-250 ease-out">{item.product.name}</ReactRouterDOM.Link>
                <p className="text-sm text-gray-500 mt-1">₹{item.product.price.toLocaleString()} / {displayUnit}</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-red-600 hover:text-red-800 hover:underline hover:scale-105 mt-2 transition-all duration-250 ease-out inline-block font-medium">Remove</button>
              </div>
              <div className="flex items-center space-x-4">
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                  min="1"
                  className="w-20 border border-gray-300/60 rounded-lg text-center py-2 hover:border-primary-blue transition-colors duration-300 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 font-medium"
                />
                 <p className="w-32 text-right font-bold text-lg text-gray-900">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 flex justify-end animate-fade-in-up" style={{ animationDelay: '200ms' }}>
        <div className="w-full max-w-md bg-white border border-gray-200/70 rounded-xl p-6 shadow-sm">
          <div className="flex justify-between text-xl mb-3">
            <span className="font-semibold text-gray-700">Subtotal:</span>
            <span className="font-bold text-primary-blue">₹{subtotal.toLocaleString()}</span>
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

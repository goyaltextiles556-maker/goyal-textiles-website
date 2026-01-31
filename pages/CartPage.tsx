
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
      <div className="text-center py-20">
        <h1 className="text-4xl font-display font-bold text-primary-blue mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <ReactRouterDOM.Link to="/#categories">
          <Button>Browse Fabrics</Button>
        </ReactRouterDOM.Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-display font-bold text-primary-blue text-center mb-12">Shopping Cart</h1>
      <div className="bg-white border border-gray-200/80 rounded-lg overflow-hidden">
        {cartItems.map(item => {
          const displayUnit = item.product.unit === 'meter' ? 'meter' : 'set';
          return (
            <div key={item.product.id} className="flex items-center p-4 border-b last:border-b-0">
              <img src={item.product.images[0]} alt={item.product.name} className="w-24 h-24 object-cover mr-4 rounded-md"/>
              <div className="flex-grow">
                <ReactRouterDOM.Link to={`/product/${item.product.id}`} className="font-medium hover:text-primary-blue">{item.product.name}</ReactRouterDOM.Link>
                <p className="text-sm text-gray-500">₹{item.product.price.toLocaleString()} / {displayUnit}</p>
                <button onClick={() => removeFromCart(item.product.id)} className="text-xs text-red-600 hover:underline mt-1">Remove</button>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.product.id, parseInt(e.target.value, 10))}
                  min="1"
                  className="w-16 border-gray-300 rounded-md text-center"
                />
                 <p className="w-24 text-right font-semibold">₹{(item.product.price * item.quantity).toLocaleString()}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-end">
        <div className="w-full max-w-sm">
          <div className="flex justify-between text-lg">
            <span>Subtotal:</span>
            <span className="font-semibold">₹{subtotal.toLocaleString()}</span>
          </div>
          <p className="text-sm text-gray-500 mt-2 text-right">Shipping & taxes calculated at checkout.</p>
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

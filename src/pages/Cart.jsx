import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const { token, isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const initializedCart = storedCart.map(item => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(initializedCart);
  }, []);

  const updateCartStorage = (updatedCart) => {
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated')); // dispatch here every time
};


  const handleDeleteItem = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    updateCartStorage(updatedCart);
  };

  const handleClearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    window.dispatchEvent(new Event('cartUpdated')); // <--- dispatch event!
  };

  const handleQuantityChange = (index, delta) => {
    const updatedCart = [...cartItems];
    let newQty = updatedCart[index].quantity + delta;
    if (newQty < 1) newQty = 1;
    updatedCart[index].quantity = newQty;
    setCartItems(updatedCart);
    updateCartStorage(updatedCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const handleProceedToPayment = async () => {
    if (!isLoggedIn) {
      alert('Please log in or sign up before proceeding to payment.');
      navigate('/login');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/verify-user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200) {
        const productIds = cartItems.map(item => item.id);
        alert(`Proceeding to payment for products: ${productIds.join(', ')}`);
        // TODO: Integrate payment gateway here
      } else {
        alert('Session expired. Please log in again.');
        navigate('/login');
      }
    } catch (error) {
      console.error(error);
      alert('Error verifying session. Please log in again.');
      navigate('/login');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border p-4 rounded shadow"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p>Size: {item.size}</p>
                  <p className="font-bold">${item.price}</p>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(idx, -1)}
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(idx, 1)}
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteItem(idx)}
                  className="text-red-600 font-bold px-3 py-1 border border-red-600 rounded hover:bg-red-600 hover:text-white transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>

          <div className="text-right text-xl font-bold mt-6">
            Total: ${getTotalPrice().toFixed(2)}
          </div>

          <div className="mt-6 text-right flex justify-end gap-4">
            <button
              onClick={handleClearCart}
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Clear Cart
            </button>

            <button
              onClick={handleProceedToPayment}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              Proceed to Payment
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;

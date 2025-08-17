import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchByCategory = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://addis-neger-backend.onrender.com/api/products/category/${categoryName}`);
        setProducts(res.data);
      } catch (err) {
        console.error('Error fetching category products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchByCategory();
  }, [categoryName]);

  const addToCart = (product) => {
    const item = {
      _id: product._id,
      name: product.title,
      price: product.price,
      image: `https://addis-neger-backend.onrender.com${product.image}`,
      quantity: 1,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = existingCart.find(p => p._id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      existingCart.push(item);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    setMessage(`${product.title} added to cart`);
    window.dispatchEvent(new Event('cartUpdated'));
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-8 text-center capitalize text-gray-900">
        {categoryName} Products
      </h2>

      {loading ? (
        <div className="text-center text-gray-500 text-xl py-20">Loading products...</div>
      ) : (
        <>
          {message && (
            <p className="mb-4 text-green-600 font-semibold text-center">{message}</p>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={`https://addis-neger-backend.onrender.com${product.image}`}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.title}</h3>
                  <p className="text-indigo-600 font-bold text-xl mb-3">${product.price.toFixed(2)}</p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && (
              <p className="col-span-full text-center text-gray-500 text-lg">No products found.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryProducts;

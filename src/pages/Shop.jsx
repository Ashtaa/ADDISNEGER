import React from 'react';
import { useNavigate } from 'react-router-dom';
import j3main from './../img/j3-main.jpg';
import j3main2 from './../img/j3-1.jpg';
import j3main3 from './../img/j3-2.jpg';

function Shop() {
  const navigate = useNavigate();

  const products = [
    {
      id: 1,
      img: j3main,
      detail: 'Jordan 3 Travis Scott',
      price: 199,
    },
    {
      id: 2,
      img: j3main2,
      detail: 'Jordan 4 OG',
      price: 199,
    },
    {
      id: 3,
      img: j3main3,
      detail: 'Yeezy Boost 350',
      price: 199,
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Shop Our Collection</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition duration-300"
          >
            {/* Clickable Image */}
            <img
              src={item.img}
              alt={item.detail}
              onClick={() => navigate(`/product/${item.id}`)}
              className="w-full h-64 object-cover rounded-lg mb-4 cursor-pointer"
            />
            <h3 className="text-lg font-semibold text-gray-700">{item.detail}</h3>
            <p className="text-blue-600 mt-2 font-bold">${item.price}</p>
            {/* Remove Add to Cart here, you add from detail page */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Shop;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import productImg from '../img/j3-main.jpg';
import productImg1 from '../img/j3-1.jpg';
import productImg2 from '../img/j3-2.jpg';
import productImg3 from '../img/j3-3.jpg';

// Define all products here
const PRODUCTS = [
  {
    id: 1,
    name: 'Air Jordan 1 Low',
    price: 150,
    rating: 4.5,
    description: 'Legendary style and comfort from Nike.',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    images: [productImg, productImg1, productImg2, productImg3],
  },
  {
    id: 2,
    name: 'Jordan 4 OG',
    price: 199,
    rating: 4.7,
    description: 'Classic Jordan 4 OG sneakers.',
    sizes: ['38', '39', '40', '41', '42', '43', '44'],
    images: [productImg1, productImg2, productImg3, productImg],
  },
  {
    id: 3,
    name: 'Yeezy Boost 350',
    price: 220,
    rating: 4.8,
    description: 'Popular Yeezy Boost 350 by Kanye West.',
    sizes: ['38', '39', '40', '41', '42', '43'],
    images: [productImg2, productImg3, productImg, productImg1],
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = PRODUCTS.find(p => p.id === parseInt(id));

  if (!product) {
    return <div className="p-6 text-center">Product not found.</div>;
  }

  const [selectedImage, setSelectedImage] = useState(product.images[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [error, setError] = useState('');

  const handleAddToCart = () => {
    if (!selectedSize) {
      setError('Please select a size before adding to cart.');
      return;
    }

    setError('');

    const item = {
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: selectedImage,
    };

    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
    existingCart.push(item);
    localStorage.setItem('cart', JSON.stringify(existingCart));

    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col md:flex-row gap-10">
      {/* LEFT SIDE */}
      <div className="flex w-full md:w-1/2">
        {/* Thumbnails */}
        <div className="flex flex-col gap-3 mr-4">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-16 h-16 object-cover rounded border cursor-pointer 
                          ${selectedImage === img ? 'border-black' : 'border-gray-300'}`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* Main Image */}
        <div className="flex-1">
          <img
            src={selectedImage}
            alt="main"
            className="w-full h-full object-contain rounded-lg shadow"
          />
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 space-y-5">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-gray-700 text-lg">${product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* Size Selection */}
        <div>
          <h3 className="font-medium mb-1">Select Size</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-1 rounded transition 
                  ${selectedSize === size ? 'bg-black text-white' : 'hover:bg-black hover:text-white'}`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Show error if any */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="mt-4 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
        >
          Add to Cart
        </button>

        {/* Tabs */}
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold">About the Company</h2>
          <p className="text-sm text-gray-600">
            Nike, Inc. is an American athletic footwear and apparel corporation...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import perfume from './../img/perfume.jpg';
import shoe from './../img/shoe.jpg';
import watch from './../img/watch.jpg';
import cloth from './../img/cloth.jpg';

function Catagory() {
  const navigate = useNavigate();

  const categories = [
    { id: 1, name: 'cloth', label: 'Cloth', image: cloth },
    { id: 2, name: 'shoes', label: 'Shoes', image: shoe },
    { id: 3, name: 'watch', label: 'Watch', image: watch },
    { id: 4, name: 'perfume', label: 'Perfume', image: perfume },
  ];

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="cursor-pointer bg-white shadow-md rounded-2xl overflow-hidden transition-transform hover:scale-105"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img
              src={cat.image}
              alt={cat.label}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-center font-semibold text-lg">
              {cat.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Catagory;

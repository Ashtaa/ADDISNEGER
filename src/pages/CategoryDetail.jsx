import React from 'react';
import { useParams } from 'react-router-dom';

const CategoryDetail = () => {
  const { name } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold capitalize mb-4">{name} Collection</h1>
      <p className="text-gray-600">Show products related to {name} here...</p>

      {/* You can map filtered products here based on the category name */}
    </div>
  );
};

export default CategoryDetail;

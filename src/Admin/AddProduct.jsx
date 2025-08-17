import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [form, setForm] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    inStock: true,
    sizes: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [products, setProducts] = useState([]);

  // Fetch all products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://addis-neger-backend.onrender.com/api/products/');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setMessage('❌ Failed to load products.');
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'file') {
      setForm((prev) => ({ ...prev, image: e.target.files[0] }));
    } else if (name === 'inStock') {
      setForm((prev) => ({ ...prev, [name]: value === 'true' }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit new product
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }

    try {
      await axios.post('https://addis-neger-backend.onrender.com/api/products/add', formData);
      setMessage('✅ Product added successfully!');
      setForm({
        title: '',
        price: '',
        description: '',
        category: '',
        inStock: true,
        sizes: '',
        image: null,
      });
      fetchProducts(); // Refresh product list
    } catch (error) {
      setMessage('❌ Failed to add product.');
      console.error(error);
    }
  };

  // Delete a product by id
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`https://addis-neger-backend.onrender.com/api/products/${id}`);
      setMessage('✅ Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      setMessage('❌ Failed to delete product.');
      console.error(error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          <option value="cloth">Cloth</option>
          <option value="shoes">Shoes</option>
          <option value="watch">Watch</option>
          <option value="perfume">Perfume</option>
        </select>
        <input
          type="text"
          name="sizes"
          placeholder="Sizes (comma separated)"
          value={form.sizes}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="inStock"
          value={form.inStock}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="true">In Stock</option>
          <option value="false">Out of Stock</option>
        </select>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit Product
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}

      <h3 className="text-xl font-bold mt-10 mb-4">Existing Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.length === 0 && <p>No products found.</p>}
        {products.map((product) => (
          <div key={product._id} className="bg-gray-100 p-4 rounded shadow relative">
            <img
              src={`https://addis-neger-backend.onrender.com${product.image}`}
              alt={product.title}
              className="w-full h-40 object-cover rounded"
            />
            <h4 className="font-semibold mt-2">{product.title}</h4>
            <p className="text-gray-700">${product.price.toFixed(2)}</p>
            <button
              onClick={() => handleDelete(product._id)}
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;

import React, { useState } from 'react';
import './ProductForm.css';

const ProductForm = ({ onAddProduct }) => {
  const [product, setProduct] = useState({ name: '', price: 0, description: '', category: '', stock: 0 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(product);
    setProduct({ name: '', price: 0, description: '', category: '', stock: 0 });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} required />
      <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} required />
      <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} required />
      <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} required />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;

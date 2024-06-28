import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductForm from './ProductForm';
import NotificationList from './NotificationList';
import UserDetails from './UserDetails';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  const handleAddProduct = async (product) => {
    const response = await axios.post('/api/products', product);
    setProducts([...products, response.data]);
  };

  const handleDeleteProduct = async (productId) => {
    await axios.delete(`/api/products/${productId}`);
    setProducts(products.filter(product => product._id !== productId));
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <ProductForm onAddProduct={handleAddProduct} />
      <ul>
        {products.map(product => (
          <li key={product._id}>
            {product.name} - ${product.price}
            <button onClick={() => handleDeleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <NotificationList />
      <div>
        <h2>User Management</h2>
        <input
          type="text"
          placeholder="Enter User ID"
          value={selectedUserId || ''}
          onChange={(e) => setSelectedUserId(e.target.value)}
        />
        {selectedUserId && <UserDetails userId={selectedUserId} />}
      </div>
    </div>
  );
};

export default AdminPage;

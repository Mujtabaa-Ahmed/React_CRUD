import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../style/View.css';

const View = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_URL = 'https://arsalan.fronxsolutions.com/';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Failed to fetch products');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        const response = await fetch(`${API_URL}${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) throw new Error('Failed to delete product');
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Product Inventory</h1>
        <Link to="/create" className="btn primary">
          Add New Product
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="no-items">No products found</div>
      ) : (
        <div className="table-responsive">
          <table className="products-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.description}</td>
                  <td className="actions">
                    <Link to={`/edit/${product.id}`} className="btn action-btn edit">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn action-btn delete"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default View;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, deleteProduct } from '../service/productService';

const View = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter states
  const [nameFilter, setNameFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [descFilter, setDescFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
      } catch (err) {
        setError('Failed to fetch products: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    const lowerName = nameFilter.toLowerCase();
    const lowerDesc = descFilter.toLowerCase();

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(lowerName) &&
      product.description.toLowerCase().includes(lowerDesc) &&
      (priceFilter === '' || product.price.toString().includes(priceFilter))
    );

    setFilteredProducts(filtered);
  }, [nameFilter, priceFilter, descFilter, products]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        const updated = products.filter((product) => product.id !== id);
        setProducts(updated);
        setFilteredProducts(updated);
      } catch (err) {
        setError('Failed to delete product: ' + err.message);
      }
    }
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading products...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Product Inventory</h1>
        <Link
          to="/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Product
        </Link>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Filter by Price"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Filter by Description"
          value={descFilter}
          onChange={(e) => setDescFilter(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center text-gray-500">No matching products found</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-200 rounded shadow-sm">
            <thead className="bg-gray-100 text-gray-700 text-sm sm:text-base">
              <tr>
                <th className="px-3 sm:px-4 py-3 text-left">#</th>
                <th className="px-3 sm:px-4 py-3 text-left">Name</th>
                <th className="px-3 sm:px-4 py-3 text-left">Price</th>
                <th className="px-3 sm:px-4 py-3 text-left">Description</th>
                <th className="px-3 sm:px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm sm:text-base">
              {filteredProducts.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-4 py-2">{index + 1}</td>
                  <td className="px-3 sm:px-4 py-2 font-medium">{product.name}</td>
                  <td className="px-3 sm:px-4 py-2">${product.price}</td>
                  <td className="px-3 sm:px-4 py-2 text-gray-600">{product.description}</td>
                  <td className="px-3 sm:px-4 py-2">
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Link
                        to={`/edit/${product.id}`}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-center"
                      >
                        Delete
                      </button>
                    </div>
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

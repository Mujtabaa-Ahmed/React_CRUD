import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../style/View.css';

const View = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://api.example.com/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://api.example.com/items/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete item');
        }

        // Remove item from state
        setItems(items.filter(item => item.id !== id));
      } catch (err) {
        console.error('Error deleting item:', err);
        alert('Failed to delete item');
      }
    }
  };

  // Sort items
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedItems = [...items].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>All Items</h1>
        <Link to="/create" className="btn primary">
          Add New Item
        </Link>
      </div>

      {items.length === 0 ? (
        <div className="no-items">
          <p>No items found. Create your first item!</p>
          <Link to="/create" className="btn primary">
            Create Item
          </Link>
        </div>
      ) : (
        <>
          <div className="table-responsive">
            <table className="items-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('id')}>
                    ID {sortConfig.key === 'id' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('title')}>
                    Title {sortConfig.key === 'title' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('category')}>
                    Category {sortConfig.key === 'category' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('status')}>
                    Status {sortConfig.key === 'status' && (
                      <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.category}</td>
                    <td>
                      <span className={`status-badge ${item.status}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="actions">
                      <Link
                        to={`/edit/${item.id}`}
                        className="btn action-btn edit"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(item.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={currentPage === number ? 'active' : ''}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default View;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Create.css';

const Create = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'active'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Replace with your actual API call
      const response = await fetch('https://api.example.com/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create item');

      // Show success message and redirect
      alert('Item created successfully!');
      navigate('/view');
    } catch (error) {
      console.error('Error creating item:', error);
      alert('An error occurred while creating the item');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-container">
      <div className="create-header">
        <h1>Create New Item</h1>
        <p>Fill out the form below to add a new item to your collection</p>
      </div>

      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={errors.title ? 'error' : ''}
            placeholder="Enter item title"
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={errors.description ? 'error' : ''}
            rows="4"
            placeholder="Enter detailed description"
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="category">Category *</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select a category</option>
              <option value="technology">Technology</option>
              <option value="books">Books</option>
              <option value="clothing">Clothing</option>
              <option value="other">Other</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label>Status</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === 'active'}
                  onChange={handleChange}
                />
                Active
              </label>
              <label>
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === 'inactive'}
                  onChange={handleChange}
                />
                Inactive
              </label>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="btn secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Item'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Create;
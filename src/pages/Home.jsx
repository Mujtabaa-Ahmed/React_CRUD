import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Your CRUD Application</h1>
          <p>Manage your data efficiently with our powerful CRUD operations</p>
          <div className="cta-buttons">
            <Link to="/create" className="btn primary">
              Create New Item
            </Link>
            <Link to="/view" className="btn secondary">
              View All Items
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <img src="https://i.pinimg.com/originals/21/9a/09/219a09d5c2d9e50e4c2d20c9a03e09af.gif" alt="CRUD Application" />
        </div>
      </section>

      <section className="features-section">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📝</div>
            <h3>Create</h3>
            <p>Easily add new records to your database with our intuitive form.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Read</h3>
            <p>View all your data in a clean, organized table format.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔄</div>
            <h3>Update</h3>
            <p>Edit existing records with just a few clicks.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">❌</div>
            <h3>Delete</h3>
            <p>Remove unwanted records safely and securely.</p>
          </div>
        </div>
      </section>

      <section className="getting-started">
        <h2>Getting Started</h2>
        <ol className="steps-list">
          <li>Click "Create New Item" to add your first record</li>
          <li>View all items in the "View All" section</li>
          <li>Edit or delete items as needed</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;
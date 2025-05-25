import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-4 py-12">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to my CRUD Application
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Hi, my name is{' '}
            <a
              href="https://www.linkedin.com/in/ahmed-mujtaba-dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Ahmed Mujtaba
            </a>. This is my first CRUD application in React.js.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/create"
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition font-medium text-center"
            >
              Create New Item
            </Link>
            <Link
              to="/view"
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition font-medium text-center"
            >
              View All Items
            </Link>
          </div>
        </div>
        <div className="md:w-1/2">
          <img
            src="https://i.pinimg.com/originals/21/9a/09/219a09d5c2d9e50e4c2d20c9a03e09af.gif"
            alt="CRUD Application"
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-10">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '📝', title: 'Create', desc: 'Easily add new records to your database with our intuitive form.' },
              { icon: '🔍', title: 'Read', desc: 'View all your data in a clean, organized table format.' },
              { icon: '🔄', title: 'Update', desc: 'Edit existing records with just a few clicks.' },
              { icon: '❌', title: 'Delete', desc: 'Remove unwanted records safely and securely.' },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-12 max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-6">Getting Started</h2>
        <ol className="list-decimal list-inside text-gray-700 space-y-2 text-lg">
          <li>Click "Create New Item" to add your first record</li>
          <li>View all items in the "View All" section</li>
          <li>Edit or delete items as needed</li>
        </ol>
      </section>
    </div>
  );
};

export default Home;

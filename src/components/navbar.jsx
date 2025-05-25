import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              to="/"
              className="text-blue-600 text-2xl font-bold tracking-wide hover:text-blue-500 transition-colors"
            >
              MyCRUD
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
            >
              Home
            </Link>
            <Link
              to="/create"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
            >
              Create
            </Link>
            <Link
              to="/view"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
            >
              View All
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
            >
              About
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-white shadow-md transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-3">
          <Link
            to="/"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Home
          </Link>
          <Link
            to="/create"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            Create
          </Link>
          <Link
            to="/view"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            View All
          </Link>
          <Link
            to="/about"
            onClick={toggleMenu}
            className="block text-gray-700 hover:text-blue-600 text-lg font-medium"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

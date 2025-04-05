// src/components/layout/Header.tsx
import { useState } from "react";
import { Link } from "react-router";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-myblue text-white py-4 sticky top-0 z-50">
      <div className="my-container flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/logo.svg" alt="Pharmix Logo" className="h-16 w-16" />
          <span className="font-semibold text-3xl md:hidden lg:block">PNM</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className="hover:text-sky-100 font-semibold transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-sky-100 font-semibold transition-colors duration-300"
          >
            About us
          </Link>
          <Link
            to="/products"
            className="hover:text-sky-100 font-semibold transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/contact"
            className="hover:text-sky-100 font-semibold transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-50 rounded-full py-2 px-4 text-sm w-[200px] focus:outline-none focus:ring-2 focus:ring-blue-100 border border-gray-200 placeholder:text-gray-500"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/signin"
              className="flex items-center gap-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Sign In</span>
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 transition-colors duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden bg-myblue border-t mt-4">
          <div className="my-container py-4 flex flex-col space-y-4">
            <Link to="/" className="transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="transition-colors duration-300">
              About us
            </Link>
            <Link to="/products" className="transition-colors duration-300">
              Products
            </Link>
            <Link to="/contact" className="transition-colors duration-300">
              Contact
            </Link>
            <div className="pt-4 border-t">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full bg-gray-50 rounded-full py-2 px-4 text-sm border border-gray-200 placeholder:text-gray-500"
              />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;

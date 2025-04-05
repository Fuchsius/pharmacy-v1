// src/components/layout/Footer.tsx
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t">
      <div className="my-container">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Company Info */}
          <div className="lg:w-1/3 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="PNM Logo" className="h-16 w-16" />
              <span className="text-2xl font-bold text-gray-900">PNM</span>
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md">
              Innovative medical solutions that transform patient care. We're
              dedicated to providing the highest quality healthcare products and
              services.
            </p>
            <div className="flex gap-4">
              {/* Social Icons */}
              <a
                href="https://facebook.com"
                className="bg-gray-100 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                className="bg-gray-100 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M23.44 4.83c-.8.37-1.5.38-2.22.02.93-.56.98-.96 1.32-2.02-.88.52-1.86.9-2.9 1.1-.82-.88-2-1.43-3.3-1.43-2.5 0-4.55 2.04-4.55 4.54 0 .36.03.7.1 1.04-3.77-.2-7.12-2-9.36-4.75-.4.67-.6 1.45-.6 2.3 0 1.56.8 2.95 2 3.77-.74-.03-1.44-.23-2.05-.57v.06c0 2.2 1.56 4.03 3.64 4.44-.67.2-1.37.2-2.06.08.58 1.8 2.26 3.12 4.25 3.16C5.78 18.1 3.37 18.74 1 18.46c2 1.3 4.4 2.04 6.97 2.04 8.35 0 12.92-6.92 12.92-12.93 0-.2 0-.4-.02-.6.9-.63 1.96-1.22 2.56-2.14z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                className="bg-gray-100 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                className="bg-gray-100 p-2 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex-1 gap-8 lg:gap-12">
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Products
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/products/household"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Household
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/sexual-wellbeing"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Sexual Wellbeing
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/pregnancy"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Pregnancy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/products/oral-care"
                    className="text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    Oral Care
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    <span>077 110 4103</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span>info@pharmix.com</span>
                  </div>
                </li>
                <li className="text-sm text-gray-600">
                  123 Business Street
                  <br />
                  New York, NY 10001
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-100">
          <div className="flex flex-col justify-between items-center gap-4">
            <p className="text-sm text-gray-600 text-center">
              © {new Date().getFullYear()} Copyright 2024, All Rights Reserved
              by{" "}
              <a
                href="https://fucsius.com"
                target="_blank"
                rel="noopener noreferrer"
                className=" text-fuchsia-500 font-semibold"
              >
                Fuchsius
              </a>{" "}
              (PVT) ltd.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

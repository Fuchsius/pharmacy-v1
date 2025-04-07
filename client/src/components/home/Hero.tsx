// src/components/home/Hero.tsx
import { Link } from "react-router";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] overflow-hidden">
      {/* Background Image Container */}
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute right-0 w-full md:w-1/2 h-full bg-bg1/80">
          <img
            src="/assets/images/doctor.png"
            alt="Medical Professional"
            className="w-full h-full object-contain object-right-top opacity-40 md:opacity-100"
          />
        </div>
      </div>

      {/* Content Container */}
      <div className="my-container relative py-12 md:py-20 z-10 ">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 ">
            <div className="hero-text bg-white/90 backdrop-blur-sm p-6 rounded-lg relative z-20 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-16">
                A NEW ERA IN <br />
                <span className="text-blue-600">MEDICINE</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Innovative medical solutions that transform patient care.
              </p>

              {/* Explore Products Button */}
              <div className="relative">
                <Link
                  to="/products"
                  className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Explore Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Contact Info Section */}
            <div className="flex flex-col sm:flex-row mt-8 gap-4 sm:gap-8 w-full sm:w-fit rounded-lg py-5 bg-white shadow-lg px-5 relative z-20">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600 mr-2"
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
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">Phone</span>
                  <span className="text-gray-700">077 110 4103</span>
                </div>
              </div>

              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600 mr-2"
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
                <div className="flex flex-col">
                  <span className="text-gray-800 font-semibold">Email</span>
                  <span className="text-gray-700">info@pharmix.com</span>
                </div>
              </div>

              <Link
                to="/contact"
                className="text-blue-600 hover:text-blue-700 transition-colors duration-300 font-medium hover:scale-105"
              >
                <span className="border-b-2 border-blue-600 pb-0.5">
                  Contact Us
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

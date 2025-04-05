// src/components/home/Hero.tsx

import { Link } from "react-router";

const Hero2 = () => {
  return (
    <div className=" w-full relative">
      <section className="bg-myblue overflow-hidden rounded-b-[150px] lg:rounded-b-[10000px] px-4">
        <div className="my-container border-white text-white flex !max-w-4xl">
          <div className=" w-full  pt-20 pb-40 md:pb-28 flex flex-col justify-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              A NEW ERA IN MEDICINE
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl">
              Innovative medical solutions that transform patient care.
            </p>
            <div className="relative">
              <Link
                to="/products"
                className="inline-flex items-center bg-white text-blue-950 px-6 py-3 rounded-lg font-medium hover:bg-sky-500 hover:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
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
          <div className="w-full hidden sm:block aspect-square">
            <img
              src="/assets/images/doctor.png"
              alt=""
              className=" object-cover w-full h-full"
            />
          </div>
        </div>
      </section>
      <div className="flex flex-col sm:flex-row mt-8 gap-6 sm:gap-12 w-fit rounded-lg py-5 bg-white shadow-md px-5 z-20 absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <span className="size-4 absolute -right-1 -top-1 hidden md:flex">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-myblue opacity-75"></span>
          <span className="relative inline-flex size-4 rounded-full bg-myblue"></span>
        </span>
        <div className="flex items-center gap-3">
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
            <span className="text-gray-700 text-nowrap">077 110 4103</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
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
          className="transition-colors duration-300 rounded-lg bg-myblue text-white font-medium hover:scale-105 flex items-center px-5 py-3 text-center"
        >
          <span className=" text-nowrap text-center w-full">Contact Us</span>
        </Link>
      </div>
    </div>
  );
};

export default Hero2;

// src/components/home/ProductDisplay.tsx
// import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import ProductCard from "../ProductCard";
// import { PRODUCT_DATA } from "@/data/productdata.data";
import { useEffect, useState } from "react";
import apiClient from "@/services/api";
import toast from "react-hot-toast";

gsap.registerPlugin(ScrollTrigger);

const ProductDisplay = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient.get<any[]>("/products-v2");
      setProducts(response);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="products-section py-16 lg:py-24 bg-white">
      <div className="my-container mx-auto">
        <h2 className="text-5xl text-myblue font-semibold text-center mb-5">
          Products
        </h2>
        <p className=" text-zinc-800 font-medium text-2xl text-center mb-14">
          Explore our wide range of health and wellness products tailored to
          meet your needs.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-md shadow-md p-4 space-y-4 animate-pulse"
                >
                  <div className="h-48 bg-gray-200 rounded-lg"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                  <div className="h-8 bg-gray-200 rounded"></div>
                  <div className="space-y-2">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))
          ) : products.length === 0 ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              No products found
            </div>
          ) : (
            products
              .slice(0, 4)
              .map((product, index) => (
                <ProductCard
                  id={product.id}
                  key={index}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  brand={product.brand}
                  description={product.description}
                  price={product.price}
                  currency={product.currency}
                  discount={product.discount}
                  inStock={0 < product.stockCount}
                  badges={product.badges}
                />
              ))
          )}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/products"
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 transform hover:scale-105"
          >
            View More Products
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
    </section>
  );
};

export default ProductDisplay;

// src/components/home/ProductDisplay.tsx
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router";
import ProductCard from "../ProductCard";
import { PRODUCT_DATA } from "@/data/productdata.data";

gsap.registerPlugin(ScrollTrigger);

// Sample product data
const products = [
  {
    id: 1,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 2,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 3,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 4,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 5,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 6,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 7,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
  {
    id: 8,
    name: "RESPIREFAST",
    image: "/assets/products/01.png",
    description:
      "Glucosamine, Methyl sulfonyl methane, Chondroitin sulphate, Collagen Peptide, Hyaluronic acid",
  },
];

const ProductDisplay = () => {
  useGSAP(() => {
    gsap.from(".product-card", {
      opacity: 0,
      y: 50,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".products-section",
        start: "top 80%",
      },
    });
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
          {PRODUCT_DATA.map((product, index) => (
            <ProductCard
              key={index}
              imageUrl={product.imageUrl}
              name={product.name}
              brand={product.brand}
              ingredients={product.ingredients}
              price={product.price}
              currency={product.currency}
              discount={product.discount}
              rating={product.rating}
              inStock={product.inStock}
              badges={product.badges}
            />
          ))}
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

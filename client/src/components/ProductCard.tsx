import { useState } from "react";
import { Link } from "react-router";

type ProductCardProps = {
  id: string;
  imageUrl: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  currency?: string;
  discount?: number; // discount percentage
  inStock?: boolean;
  badges?: string[];
};

const ProductCard = ({
  id,
  imageUrl,
  name,
  brand,
  description,
  price,
  currency = "LKR",
  discount = 0,
  inStock = true,
  badges = [],
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [quantity, setQuantity] = useState(0);

  // Calculate discounted price
  const discountedPrice = discount > 0 ? price * (1 - discount / 100) : price;

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${name} to cart`);
    // Here you would implement your actual cart logic
  };

  return (
    <div
      className="w-full max-w-xs mx-auto rounded-md overflow-hidden shadow-md bg-white hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative bg-gray-50 p-6 flex items-center justify-center h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={name}
          className={`max-h-full object-contain transform transition-transform duration-500 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
        />

        {/* Shopping Cart Icon */}
        {/* <div className="absolute top-2 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
        </div> */}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
            {discount}% OFF
          </div>
        )}

        {/* Product Badges */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h2 className="text-blue-600 font-bold text-lg mb-1">{name}</h2>

        {/* Brand */}
        <p className="text-gray-600 text-sm mb-2">{brand}</p>

        {/* Ingredients */}
        <p className="text-gray-700 text-xs mb-3 italic">({description})</p>

        {/* Rating */}
        {/* <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={i < Math.floor(rating) ? "#FFB800" : "none"}
              stroke="#FFB800"
              strokeWidth="2"
              className="mr-1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="text-xs text-gray-600 ml-1">
            {rating.toFixed(1)}
          </span>
        </div> */}

        {/* Availability */}
        <p
          className={`text-xs mb-3 ${
            inStock ? "text-green-600" : "text-red-600"
          }`}
        >
          {inStock ? "In Stock" : "Out of Stock"}
        </p>

        {/* Price */}
        <div className="flex items-center mb-4">
          <p
            className={`font-bold text-lg ${
              discount > 0 ? "text-green-500" : "text-green-500"
            }`}
          >
            {currency} {discountedPrice.toLocaleString()}
          </p>
          {discount > 0 && (
            <p className="text-gray-500 text-sm line-through ml-2">
              {currency} {price.toLocaleString()}
            </p>
          )}
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border rounded-md">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              -
            </button>
            <span className="px-3 py-1">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>
        </div>

        {/* View Product Button */}
        <Link to={`/products/${id}`}>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors mb-2">
            VIEW PRODUCT
          </button>
        </Link>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={!inStock}
          className={`w-full py-2 px-4 rounded-md font-medium transition-all duration-300 border-2 border-blue-600 
            ${
              inStock
                ? "text-blue-600 hover:bg-blue-50"
                : "text-gray-400 border-gray-300 cursor-not-allowed"
            }`}
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

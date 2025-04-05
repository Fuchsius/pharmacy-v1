import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { PRODUCT_DATA } from "@/data/productdata.data";

const SingleProductView = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "details" | "reviews"
  >("description");
  const [selectedImage, setSelectedImage] = useState(0);

  // Find product from data
  const product = PRODUCT_DATA.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === productId
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto py-4 px-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-blue-600">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-w-1 aspect-h-1 bg-white rounded-lg overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-center object-contain"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[
                product.imageUrl,
                product.imageUrl,
                product.imageUrl,
                product.imageUrl,
              ].map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden border-2 
                    ${
                      selectedImage === idx
                        ? "border-blue-600"
                        : "border-transparent"
                    }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-center object-contain"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
            </div>

            <div className="flex items-baseline space-x-4">
              <p className="text-4xl font-bold text-blue-600">
                {product.currency}{" "}
                {(
                  product.price *
                  (1 - (product.discount || 0) / 100)
                ).toLocaleString()}
              </p>
              {product.discount > 0 && (
                <p className="text-2xl text-gray-500 line-through">
                  {product.currency} {product.price.toLocaleString()}
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <label className="text-gray-700 font-medium">Quantity:</label>
              <div className="flex items-center border rounded-md">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all
                ${
                  product.inStock
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </button>

            {/* Info Tabs */}
            <div className="pt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {(["description", "details", "reviews"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-4 px-1 border-b-2 font-medium text-sm
                        ${
                          activeTab === tab
                            ? "border-blue-600 text-blue-600"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{product.ingredients}</p>
                  </div>
                )}
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Brand:</span>{" "}
                      {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Availability:</span>{" "}
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </p>
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No reviews yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductView;

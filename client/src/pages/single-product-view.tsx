import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import apiClient from "@/services/api";
import toast from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  brand: string;
  categoryId: number;
  stockCount: number;
  price: number;
  discount: number;
  description: string;
  category: {
    name: string;
  };
  imageUrl: string;
}

const SingleProductView = () => {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "details">(
    "description"
  );
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Find product from data
  const getProductById = async (id: string) => {
    try {
      setIsLoading(true);
      setError(null);
      const response: any = await apiClient.get(`/products-v2/${id}`);
      setProduct(response);
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to fetch product");
      toast.error("Failed to load product details");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (productId) {
      getProductById(productId);
    }
  }, [productId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="my-container py-8">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image skeleton */}
              <div className="bg-white rounded-lg aspect-square"></div>
              {/* Info skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                <div className="h-12 bg-gray-200 rounded"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {error || "Product Not Found"}
          </h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  // Modify quantity increment button to respect stock count
  const incrementQuantity = () => {
    if (product && quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  return (
    <div className=" bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="my-container py-4">
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

      <div className="my-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg p-8">
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain"
              />
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
                LKR{" "}
                {(
                  product.price *
                  (1 - (product.discount || 0) / 100)
                ).toLocaleString()}
              </p>
              {product.discount > 0 && (
                <p className="text-2xl text-gray-500 line-through">
                  LKR {product.price.toLocaleString()}
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
                  onClick={incrementQuantity}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100"
                  disabled={product && quantity >= product.stockCount}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              // onClick={handleAddToCart}
              disabled={!product?.stockCount || product.stockCount === 0}
              className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all
                ${
                  product?.stockCount && product.stockCount > 0
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
            >
              {product?.stockCount && product.stockCount > 0
                ? "Add to Cart"
                : "Out of Stock"}
            </button>

            {/* Info Tabs */}
            <div className="pt-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8">
                  {(["description", "details"] as const).map((tab) => (
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
                  ))}
                </nav>
              </div>

              <div className="py-6">
                {activeTab === "description" && (
                  <div className="prose max-w-none">
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )}
                {activeTab === "details" && (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Brand:</span>{" "}
                      {product.brand}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Category:</span>{" "}
                      {product.category.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Stock:</span>{" "}
                      {product.stockCount} units
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Availability:</span>{" "}
                      {product.stockCount > 0 ? "In Stock" : "Out of Stock"}
                    </p>
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

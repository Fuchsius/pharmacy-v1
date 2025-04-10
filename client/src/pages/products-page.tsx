import Categories from "@/components/home/Categories";
import ProductCard from "@/components/ProductCard";
import { useEffect, useState } from "react";
import apiClient from "@/services/api";
import toast from "react-hot-toast";
import { Product } from "@/types/product.types";

const ProductsPage = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProducts();
  }, []);

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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full overflow-x-hidden">
      <section className="bg-myblue overflow-hidden rounded-b-[150px] lg:rounded-b-[10000px] px-4">
        <div className="my-container border-white text-white flex !max-w-4xl">
          <div className="w-full pt-20 pb-28 flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
              Products
            </h1>
            <p className="text-lg text-blue-100 max-w-2xl text-center">
              Discover a wide selection of trusted health solutions, carefully
              chosen for your well-being.
            </p>
          </div>
        </div>
      </section>

      <Categories />

      <div className="my-container pt-24 flex items-center justify-center">
        <div className="w-full max-w-lg flex gap-x-3">
          <div className="w-full outline rounded-full outline-myblue overflow-hidden px-5 focus-within:outline-2">
            <input
              type="text"
              className="w-full h-full text-sm focus:outline-none"
              placeholder="Your medicine..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="rounded-full text-nowrap bg-myblue px-8 py-3 text-white cursor-pointer text-lg font-semibold hover:scale-105">
            Search
          </button>
        </div>
      </div>

      <section className="categories-section py-24">
        <div className="my-container">
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    imageUrl={product.imageUrl || ""}
                    name={product.name}
                    brand={product.brand}
                    description={product.description}
                    price={product.price}
                    currency="LKR"
                    discount={product.discount || 0}
                    inStock={0 < product.stockCount}
                    badges={[]}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-10 text-gray-500">
                  No products found
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

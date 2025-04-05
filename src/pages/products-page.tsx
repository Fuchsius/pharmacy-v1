import Categories from "@/components/home/Categories";
import ProductCard from "@/components/ProductCard";
import { PRODUCT_DATA } from "@/data/productdata.data";

const ProductsPage = () => {
  return (
    <div className=" w-full overflow-x-hidden">
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

      <div className=" my-container pt-24 flex items-center justify-center">
        <div className="w-full max-w-lg flex gap-x-3">
          <div className=" w-full outline rounded-full outline-myblue  overflow-hidden px-5 focus-within:outline-2">
            <input
              type="text"
              className=" w-full h-full text-sm focus:outline-none"
              placeholder="Your medicine..."
            />
          </div>
          <button className=" rounded-full text-nowrap bg-myblue px-8 py-3 text-white cursor-pointer text-lg font-semibold hover:scale-105">
            Search
          </button>
        </div>
      </div>

      <section className="categories-section py-24">
        <div className="my-container">
          <div className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
        </div>
      </section>
    </div>
  );
};

export default ProductsPage;

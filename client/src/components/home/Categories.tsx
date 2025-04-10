// src/components/home/Categories.tsx
import apiClient from "@/services/api";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";

const categories = [
  {
    id: 1,
    name: "Household",
    icon: "/assets/products/category1.png",
    path: "/products/household",
  },
  {
    id: 2,
    name: "Sexual well-being",
    icon: "/assets/products/category2.png",
    path: "/products/sexual-wellbeing",
  },
  {
    id: 3,
    name: "Pregnancy",
    icon: "/assets/products/category3.png",
    path: "/products/pregnancy",
  },
  {
    id: 4,
    name: "Oral Care",
    icon: "/assets/products/category4.png",
    path: "/products/oral-care",
  },
  {
    id: 5,
    name: "Proteins",
    icon: "/assets/products/category5.png",
    path: "/products/proteins",
  },
  {
    id: 6,
    name: "Personal hygiene",
    icon: "/assets/products/category6.png",
    path: "/products/personal-hygiene",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response: any = await apiClient.get<any[]>("/categories");
      setCategories(response);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to fetch categories");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section className="categories-section mt-24 py-16 bg-[#D5DEF6]">
      <div className="my-container">
        <h2 className="text-5xl text-myblue font-semibold text-center mb-5">
          Categories
        </h2>
        <p className="text-zinc-800 font-medium text-2xl text-center mb-14">
          Quality products for your health, wellness, and everyday needs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(6)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-sm p-6 animate-pulse"
                >
                  <div className="aspect-square w-full bg-gray-200 rounded-sm mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
                </div>
              ))
          ) : categories.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-8">
              <div className="text-gray-500 text-center mb-4">
                No categories found
              </div>
              <div className="text-sm text-gray-400">
                Check back later for updates
              </div>
            </div>
          ) : (
            categories.map((category: any) => (
              <Link to={category.path} key={category.id} className="group">
                <div className="bg-white rounded-sm hover:shadow-lg transition-shadow duration-300 p-6 text-center flex flex-col gap-4 items-center justify-center h-full">
                  <div className="w-full aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="object-cover w-full h-full object-center"
                    />
                  </div>
                  <h3 className="text-black font-bold text-sm group-hover:text-blue-600 transition-colors duration-300 mt-auto">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Categories;

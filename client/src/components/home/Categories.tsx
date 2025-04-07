// src/components/home/Categories.tsx
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
  return (
    <section className="categories-section mt-24 py-16 bg-[#D5DEF6]">
      <div className="my-container">
        <h2 className="text-5xl text-myblue font-semibold text-center mb-5">
          Categories
        </h2>
        <p className=" text-zinc-800 font-medium text-2xl text-center mb-14">
          Quality products for your health, wellness, and everyday needs.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link to={category.path} key={category.id} className="group">
              <div className="bg-white rounded-sm hover:shadow-lg transition-shadow duration-300 p-6 text-center flex flex-col gap-4 items-center justify-center h-full">
                <div className=" w-full aspect-square">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="object-cover w-full h-full object-center"
                  />
                </div>
                <h3 className="text-black font-bold text-sm group-hover:text-blue-600 transition-colors duration-300 mt-auto">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;

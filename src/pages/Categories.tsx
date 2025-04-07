import React, { useState } from "react";
import CategoryPopup from "../components/CategoryPopup";
import { Category } from "../types/category";
import { Button } from "../components/ui/button";

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleAddClick = () => {
    setSelectedCategory(null);
    setOpenPopup(true);
  };

  const handleEditClick = (category: Category) => {
    setSelectedCategory(category);
    setOpenPopup(true);
  };

  const handleSubmit = (categoryData: Partial<Category>) => {
    if (selectedCategory) {
      // Edit existing category
      setCategories(
        categories.map((cat) =>
          cat.id === selectedCategory.id ? { ...cat, ...categoryData } : cat
        )
      );
    } else {
      // Add new category
      const newCategory: Category = {
        id: Date.now(), // Simple way to generate unique id
        name: categoryData.name!,
        image: categoryData.image,
      };
      setCategories([...categories, newCategory]);
    }
  };

  return (
    <div className="p-5">
      <Button onClick={handleAddClick} className="mb-5">
        Add Category
      </Button>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {category.image && (
              <div className="h-36">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-3">{category.name}</h2>
              <Button
                variant="outline"
                onClick={() => handleEditClick(category)}
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      <CategoryPopup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        onSubmit={handleSubmit}
        initialData={selectedCategory || undefined}
        title={selectedCategory ? "Edit Category" : "Add Category"}
      />
    </div>
  );
};

export default Categories;

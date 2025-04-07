import { useState } from "react";
import toast from "react-hot-toast";

interface Category {
  id: string;
  name: string;
  image: string;
}

const initialCategories: Category[] = [
  {
    id: "1",
    name: "Prescription Drugs",
    image: "/images/categories/prescription.jpg",
  },
  {
    id: "2",
    name: "Over-the-Counter",
    image: "/images/categories/otc.jpg",
  },
];

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: "", image: "" });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingCategory.id ? { ...cat, ...formData } : cat
        )
      );
      toast.success("Category updated successfully!");
    } else {
      setCategories([
        ...categories,
        { id: Date.now().toString(), ...formData },
      ]);
      toast.success("Category added successfully!");
    }
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: "", image: "" });
    setPreviewUrl("");
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, image: category.image });
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    setCategories(categories.filter((cat) => cat.id !== id));
    toast.success("Category deleted successfully!");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewUrl(reader.result as string);
        setFormData((prev) => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Categories</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-white rounded-lg shadow-sm p-4 space-y-4"
          >
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-48 object-cover rounded-lg"
            />
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{category.name}</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(category)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Updated Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingCategory ? "Edit Category" : "Add New Category"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingCategory(null);
                  setFormData({ name: "", image: "" });
                  setPreviewUrl("");
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Image
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    {previewUrl ? (
                      <div className="relative">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="mx-auto h-32 w-auto rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setPreviewUrl("");
                            setSelectedFile(null);
                          }}
                          className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                            <span>Upload a file</span>
                            <input
                              type="file"
                              className="sr-only"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingCategory(null);
                    setFormData({ name: "", image: "" });
                    setPreviewUrl("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingCategory ? "Update Category" : "Add Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;

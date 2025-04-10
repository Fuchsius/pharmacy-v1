import { useRef, useState, useEffect } from "react";
import { Product, ProductFormData } from "@/types/product.types";
import apiClient from "@/services/api";
import toast from "react-hot-toast";

interface Category {
  id: number;
  name: string;
  description: string;
  image: string | null;
}

type ProductFormProps = {
  initialData?: Product;
  onSubmit: (data: ProductFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
};

const ProductForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price || 0,
    stockCount: initialData?.stockCount || 0,
    categoryId: initialData?.categoryId || 1,
    brand: initialData?.brand || "",
    discount: initialData?.discount || 0,
    imageUrl: initialData?.productImages?.[0]?.imageUrl || "",
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>(
    initialData?.productImages?.[0]?.imageUrl || ""
  );

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDeletingImage, setIsDeletingImage] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await apiClient.get<Category[]>("/categories");
        setCategories(response);
      } catch (error) {
        toast.error("Failed to load categories");
        console.error(error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await apiClient.postFormData<{ imageUrl: string }>(
        "/images/upload",
        formData
      );

      setPreviewImage(response.imageUrl);
      setFormData((prev) => ({ ...prev, imageUrl: response.imageUrl }));
      toast.success("Image uploaded successfully");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to upload image");
      resetImage();
    } finally {
      setIsUploadingImage(false);
    }
  };

  const resetImage = async () => {
    if (!formData.imageUrl) return;

    setIsDeletingImage(true);
    try {
      // Extract filename from imageUrl to match server expectations
      // const filename = formData.imageUrl.split("/").pop();

      await apiClient.delete("/images/delete", {
        imageUrl: formData.imageUrl,
      });

      setPreviewImage("");
      setFormData((prev) => ({ ...prev, imageUrl: "" }));
      if (fileInputRef.current) fileInputRef.current.value = "";
      toast.success("Image deleted successfully");
    } catch (error: any) {
      console.error("Error deleting image:", error);
      toast.error(error.response?.data?.error || "Failed to delete image");
    } finally {
      setIsDeletingImage(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.description || !formData.categoryId) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (formData.price <= 0 || formData.stockCount < 0) {
      toast.error(
        "Price must be greater than 0 and stock count cannot be negative"
      );
      return;
    }

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Form Fields in Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Product Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Brand
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) =>
              setFormData({ ...formData, categoryId: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            disabled={isLoadingCategories}
          >
            {isLoadingCategories ? (
              <option>Loading categories...</option>
            ) : (
              <>
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stock Count
          </label>
          <input
            type="number"
            value={formData.stockCount}
            onChange={(e) =>
              setFormData({ ...formData, stockCount: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (LKR)
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Discount (%)
          </label>
          <input
            type="number"
            value={formData.discount}
            onChange={(e) =>
              setFormData({ ...formData, discount: Number(e.target.value) })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0"
            max="100"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl bg-gray-50">
          <div className="space-y-1 text-center">
            {previewImage ? (
              <div className="relative inline-block">
                <img
                  src={previewImage}
                  alt="Preview"
                  className="max-h-64 rounded-lg"
                />
                <button
                  type="button"
                  onClick={resetImage}
                  disabled={isDeletingImage}
                  className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1.5 hover:bg-red-200 transition-colors disabled:opacity-50"
                >
                  {isDeletingImage ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-red-600" />
                  ) : (
                    <svg
                      className="w-5 h-5"
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
                  )}
                </button>
              </div>
            ) : (
              <div className="relative">
                <div className={`${isUploadingImage ? "opacity-50" : ""}`}>
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
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        disabled={isUploadingImage}
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                </div>
                {isUploadingImage && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
              <span>Saving...</span>
            </span>
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

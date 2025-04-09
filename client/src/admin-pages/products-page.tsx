import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { Product, ProductFormData } from "@/types/product.types";
import { PRODUCT_DATA } from "@/data/productdata.data";
import ProductForm from "@/components/admin/ProductForm";
import apiClient from "@/services/api";

const ProductsManagement = () => {
  const [products, setProducts] = useState<Product[]>(PRODUCT_DATA);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const itemsPerPage = 10;

  const initialFormData: ProductFormData = {
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    price: 0,
    currency: "LKR",
    discount: 0,
    stockCount: 0,
    badges: [],
    categoryId: 0,
  };

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isImageUploadStep, setIsImageUploadStep] = useState(false);
  const [currentProductId, setCurrentProductId] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
        setFormData((prev) => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setPreviewImage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
      toast.success("Product deleted successfully");
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      brand: product.brand,
      description: product.description,
      imageUrl: product.imageUrl,
      price: product.price,
      currency: product.currency,
      discount: product.discount,
      stockCount: product.stockCount,
      badges: product.badges,
      categoryId: product.categoryId,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (
    formData: ProductFormData,
    isImageStep = false
  ) => {
    setIsSubmitting(true);
    try {
      if (editingProduct) {
        setProducts(
          products.map((p) =>
            p.id === editingProduct.id ? { ...p, ...formData } : p
          )
        );
        toast.success("Product updated successfully");
      } else if (isImageStep && currentProductId) {
        const base64Data = formData.imageUrl?.split(",")[1];
        if (!base64Data) return;

        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);

        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        const imageFile = new File([byteArray], "product-image.jpg", {
          type: "image/jpeg",
        });

        const formDataObj = new FormData();
        formDataObj.append("image", imageFile);

        await apiClient.postFormData(
          `/products/image/${currentProductId}`,
          formDataObj
        );

        toast.success("Product created successfully");
        setIsModalOpen(false);
        setIsImageUploadStep(false);
        setCurrentProductId(null);
      } else {
        const productData = {
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          stockCount: Number(formData.stockCount),
          categoryId: Number(formData.categoryId),
          brand: formData.brand,
          discount: Number(formData.discount) || 0,
        };

        const newProduct = await apiClient.post<Product>(
          "/products",
          productData
        );
        setCurrentProductId(newProduct.id);
        setIsImageUploadStep(true);
        toast.success("Product details saved. Please add an image.");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to process request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className=" bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
        <button
          onClick={() => {
            setEditingProduct(null);
            resetForm();
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-sm text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center gap-2"
        >
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentProducts.map((product) => (
              <tr key={product.id}>
                <td className="px-6 py-4">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.brand}</td>
                <td className="px-6 py-4">
                  {product.currency} {product.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-nowrap text-xs ${
                      0 < product.stockCount
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {0 < product.stockCount
                      ? product.stockCount
                      : "Out of Stock"}
                  </span>
                </td>
                <td className="px-6 py-4 flex h-full my-auto gap-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="text-blue-600 hover:text-blue-900 cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="text-red-600 hover:text-red-900 cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium
                ${
                  currentPage === page
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
            >
              {page}
            </button>
          ))}
        </nav>
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
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

            <ProductForm
              initialData={editingProduct || undefined}
              onSubmit={handleSubmit}
              onCancel={() => setIsModalOpen(false)}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;

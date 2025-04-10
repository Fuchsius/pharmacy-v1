import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Product,
  ProductFormData,
  CreateProductDTO,
} from "@/types/product.types";
import { PRODUCT_DATA } from "@/data/productdata.data";
import ProductForm from "@/components/admin/ProductForm";
import apiClient from "@/services/api";

const ProductsManagement = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const itemsPerPage = 10;

  const initialFormData: ProductFormData = {
    name: "",
    brand: "",
    description: "",
    imageUrl: "",
    price: 0,
    discount: 0,
    stockCount: 0,
    categoryId: 0,
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = () => {
    setEditingProduct(null);
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        console.log(id);
        // Get product details first to get image URL
        const product: any = await apiClient.get(`/products-v2/${id}`);

        console.log(product);
        // Delete the product

        // If product had an image, delete it too
        if (product.imageUrl) {
          // const filename = product.imageUrl;
          await apiClient.delete("/images/delete", {
            imageUrl: product.imageUrl,
          });
        }

        await apiClient.delete(`/products-v2/${id}`);

        await fetchProducts();
        toast.success("Product deleted successfully");
      } catch (error: any) {
        toast.error(error.response?.data?.error || "Failed to delete product");
      }
    }
  };

  const handleEdit = (product: any) => {
    const formattedProduct = {
      ...product,
      imageUrl: product.imageUrl || product.productImages?.[0]?.imageUrl,
    };
    setEditingProduct(formattedProduct);
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      const productData: any = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        stockCount: Number(formData.stockCount),
        categoryId: Number(formData.categoryId),
        brand: formData.brand,
        discount: Number(formData.discount) || undefined,
        imageUrl: formData.imageUrl || undefined,
      };

      if (editingProduct) {
        await apiClient.put(`/products-v2/${editingProduct.id}`, productData);
        toast.success("Product updated successfully");
      } else {
        await apiClient.post("/products-v2", productData);
        toast.success("Product created successfully");
      }
      setIsModalOpen(false);
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to process request");
    } finally {
      setIsSubmitting(false);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

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
                ID
              </th>
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
            {isLoading
              ? // Loading skeleton rows
                Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="px-6 py-4">
                        <div className="h-12 w-12 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))
              : currentProducts.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">{product.id}</td>
                    <td className="px-6 py-4">
                      <img
                        src={product?.imageUrl || ""}
                        alt={product.name}
                        className="h-12 w-12 object-cover rounded"
                      />
                    </td>
                    <td className="px-6 py-4">{product.name}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4">
                      LKR {product.price.toLocaleString()}
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

      {/* Pagination - Only show when not loading */}
      {!isLoading && (
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
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-5 z-50">
          <div className="bg-white rounded-xl p-8 max-w-3xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h2>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 24 24"
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
              onCancel={() => {
                setIsModalOpen(false);
              }}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;

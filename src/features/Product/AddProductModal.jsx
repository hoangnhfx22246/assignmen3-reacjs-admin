import React, { useState } from "react";
import axios from "axios";
import { createProduct } from "../../api/products";

const AddProductModal = ({ isOpen, onClose, onAdd, categories }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    images: [],
    price: "",
    quantity: "",
    long_desc: "",
    short_desc: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [error, setError] = useState(""); // State to store validation errors

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    // Validate file count
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    setError(""); // Clear any previous errors
    setSelectedFiles(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate minimum file count
    if (selectedFiles.length < 1) {
      setError("You must upload at least 1 image.");
      return;
    }

    // Validate maximum file count
    if (selectedFiles.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }

    // Tạo FormData để gửi dữ liệu và file
    const formDataForUpload = new FormData();
    formDataForUpload.append("name", formData.name);
    formDataForUpload.append("category", formData.category);
    formDataForUpload.append("price", Number(formData.price)); // Chuyển đổi giá trị price sang số
    formDataForUpload.append("quantity", Number(formData.quantity)); // Chuyển đổi giá trị quantity sang số
    formDataForUpload.append("long_desc", formData.long_desc);
    formDataForUpload.append("short_desc", formData.short_desc);

    selectedFiles.forEach((file) => {
      formDataForUpload.append("images", file); // Thêm từng file vào FormData
    });

    // Gọi API để tạo sản phẩm
    console.log(formDataForUpload);

    const product = await createProduct(formDataForUpload);
    alert("Product added successfully!");
    onAdd(product); // Gọi callback để cập nhật danh sách sản phẩm
    onClose(); // Đóng modal
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Add New Product
          </h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Category
              </label>
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                required
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleFileChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Short Desc
              </label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.short_desc}
                onChange={(e) =>
                  setFormData({ ...formData, short_desc: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Long Desc
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.long_desc}
                onChange={(e) =>
                  setFormData({ ...formData, long_desc: e.target.value })
                }
                rows="3"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                step="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Quantity
              </label>
              <input
                type="number"
                min={0}
                max={1000}
                step="1"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;

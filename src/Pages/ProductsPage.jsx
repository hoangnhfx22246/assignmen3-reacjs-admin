import React, { useState } from "react";
import { FiPlus, FiSearch } from "react-icons/fi";
import ProductTable from "../Components/Product/ProductTable";
import AddProductModal from "../Components/Product/AddProductModal";
import EditProductModal from "../Components/Product/EditProductModal";
import DeleteConfirmationModal from "../Components/Product/DeleteConfirmationModal";
import { productApi } from "../api/products";
import { useEffect } from "react";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    try {
      const fetchProducts = async () => {
        const data = await productApi();
        setProducts(data);
      };
      fetchProducts();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const categories = [...new Set(products.map((product) => product.category))];

  // Filter the products based on the search term and selected category
  const filteredProducts = products.filter((product) => {
    // Check if the product name matches the search term (case-insensitive)
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    // Check if the product category matches the selected category
    // If no category is selected, it matches all categories
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    // Return true if both search term and category match
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = (newProduct) => {
    setProducts([...products, { ...newProduct, id: products.length + 1 }]);
    setIsAddModalOpen(false);
  };

  const handleEditProduct = (updatedProduct) => {
    setProducts(
      products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDeleteProduct = (productId) => {
    setProducts(products.filter((p) => p.id !== productId));
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Product Management
          </h1>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
          >
            <FiPlus /> Add Product
          </button>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="pl-10 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Products Table */}
        <ProductTable
          products={filteredProducts}
          onEdit={(product) => {
            setSelectedProduct(product);
            setIsEditModalOpen(true);
          }}
          onDelete={(product) => {
            setSelectedProduct(product);
            setIsDeleteModalOpen(true);
          }}
        />
      </div>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddProduct}
        categories={categories}
      />

      {selectedProduct && (
        <EditProductModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedProduct(null);
          }}
          onEdit={handleEditProduct}
          product={selectedProduct}
          categories={categories}
        />
      )}

      {selectedProduct && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedProduct(null);
          }}
          onDelete={() => handleDeleteProduct(selectedProduct.id)}
          productName={selectedProduct.name}
        />
      )}
    </div>
  );
};

export default ProductsPage;

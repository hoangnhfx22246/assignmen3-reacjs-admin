import React from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  productName,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Delete Product
          </h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete "{productName}"? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;

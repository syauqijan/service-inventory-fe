import React, { useState } from 'react';
import axios from 'axios';

interface AddApiFormProps {
  onClose: () => void;
}

const AddApiForm: React.FC<AddApiFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    method: '',
    endpoint: '',
    status: '',
    version: '',
    description: '',
    platform: '',
    serviceApiId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT_APIS}`, {
        ...formData,
        service_api: { id: formData.serviceApiId }
      });

      if (response.status === 201 || response.status === 200) {
        alert('API added successfully!');
        onClose();
      } else {
        alert('Failed to add API');
      }
    } catch (error) {
      console.error('Error adding API:', error);
      alert('An error occurred while adding the API.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="text-gray-500 hover:text-gray-700 float-right"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4">Add New API</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Method:</label>
            <input
              type="text"
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Endpoint:</label>
            <input
              type="text"
              name="endpoint"
              value={formData.endpoint}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Status:</label>
            <input
              type="text"
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Version:</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Platform:</label>
            <input
              type="text"
              name="platform"
              value={formData.platform}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Service API ID:</label>
            <input
              type="text"
              name="serviceApiId"
              value={formData.serviceApiId}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
          >
            Add API
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddApiForm;

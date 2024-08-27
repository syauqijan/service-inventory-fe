import React, { useEffect } from 'react';
import $ from 'jquery';
import 'datatables.net-dt/css/jquery.dataTables.css';
import 'datatables.net';

const ApiTable = () => {
  useEffect(() => {
    const table = $('#apiTable').DataTable({
      ajax: {
        url: process.env.NEXT_PUBLIC_API_ENDPOINT_APIS,
        dataSrc: ''
      },
      columns: [
        { data: 'id', title: 'ID' },
        { data: 'method', title: 'Method' },
        { data: 'endpoint', title: 'Endpoint' },
        { data: 'status', title: 'Status' },
        { data: 'version', title: 'Version' },
        { data: 'description', title: 'Description' },
        { data: 'platform', title: 'Platform' },
        { data: 'service_api.name', title: 'Service API' },
        { data: 'updatedAt', title: 'Updated At' },
        { data: 'createdAt', title: 'Created At' },
        {
          data: null,
          title: 'Actions',
          render: function (data, type, row) {
            return `
              <button class="edit-btn bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 transition duration-300" data-id="${data.id}">Edit</button>
              <button class="delete-btn bg-red-500 text-white py-1 px-2 rounded hover:bg-red-700 transition duration-300" data-id="${data.id}">Delete</button>
            `;
          },
        },
      ],
    });

    $('#apiTable').on('click', '.edit-btn', function () {
      const id = $(this).data('id');
      // Handle the edit action here, e.g., open a modal with the data
    });

    $('#apiTable').on('click', '.delete-btn', function () {
      const id = $(this).data('id');
      // Handle the delete action here
    });

    return () => {
      table.destroy(true);
    };
  }, []);

  return (
    <div className="mt-6">
      <table id="apiTable" className="display stripe hover min-w-full bg-white shadow-md rounded-lg" width="100%">
        <thead className="bg-gray-200">
          <tr>
            <th>ID</th>
            <th>Method</th>
            <th>Endpoint</th>
            <th>Status</th>
            <th>Version</th>
            <th>Description</th>
            <th>Platform</th>
            <th>Service API</th>
            <th>Updated At</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );
};

export default ApiTable;

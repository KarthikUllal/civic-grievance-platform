import React from "react";

export default function CitizenComplaintForm() {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Report a Grievance
      </h2>

      <form className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select Category
          </label>

          <select className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
            <option value="">Select a category</option>
            <option>Pothole</option>
            <option>Garbage</option>
            <option>Water Leak</option>
            <option>Broken Road</option>
            <option>Drainage</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>

          <textarea
            rows="4"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="Describe the issue..."
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Upload Photo
          </label>

          <input type="file" multiple className="w-full border p-3 rounded-lg" />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>

          <input
            type="text"
            placeholder="Enter location"
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

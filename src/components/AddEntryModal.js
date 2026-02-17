'use client';

import { useState } from 'react';
import { projects, workTypes } from '@/data/mockData';

export default function AddEntryModal({ timesheet, onClose, onSave }) {
  const [formData, setFormData] = useState({
    project: timesheet?.project || '',
    typeOfWork: timesheet?.typeOfWork || '',
    description: timesheet?.description || '',
    hours: timesheet?.hours || '',
    date: timesheet?.date || new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.project) newErrors.project = 'Project is required';
    if (!formData.typeOfWork) newErrors.typeOfWork = 'Type of work is required';
    if (!formData.description) newErrors.description = 'Description is required';
    if (!formData.hours) newErrors.hours = 'Hours are required';
    else if (formData.hours <= 0) newErrors.hours = 'Hours must be greater than 0';
    else if (formData.hours > 24) newErrors.hours = 'Hours cannot exceed 24';
    if (!formData.date) newErrors.date = 'Date is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {timesheet ? 'Edit Entry' : 'Add New Entry'}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 mb-1">
              Select Project
            </label>
            <select
              id="project"
              name="project"
              value={formData.project}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.project ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a project</option>
              {projects.map((project) => (
                <option key={project} value={project}>
                  {project}
                </option>
              ))}
            </select>
            {errors.project && (
              <p className="mt-1 text-sm text-red-600">{errors.project}</p>
            )}
          </div>

          <div>
            <label htmlFor="typeOfWork" className="block text-sm font-medium text-gray-700 mb-1">
              Type of Work
            </label>
            <select
              id="typeOfWork"
              name="typeOfWork"
              value={formData.typeOfWork}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.typeOfWork ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select type of work</option>
              {workTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            {errors.typeOfWork && (
              <p className="mt-1 text-sm text-red-600">{errors.typeOfWork}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Task description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Describe your task..."
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          <div>
            <label htmlFor="hours" className="block text-sm font-medium text-gray-700 mb-1">
              Hours
            </label>
            <input
              type="number"
              id="hours"
              name="hours"
              value={formData.hours}
              onChange={handleChange}
              step="0.5"
              min="0.5"
              max="24"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.hours ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Number of hours"
            />
            {errors.hours && (
              <p className="mt-1 text-sm text-red-600">{errors.hours}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
                errors.date ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-red-600">{errors.date}</p>
            )}
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {timesheet ? 'Update entry' : 'Add entry'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

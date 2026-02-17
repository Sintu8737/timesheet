'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import TimesheetTable from '@/components/TimesheetTable';
import AddEntryModal from '@/components/AddEntryModal';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [timesheets, setTimesheets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTimesheet, setSelectedTimesheet] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchTimesheets();
    }
  }, [status]);

  const fetchTimesheets = async () => {
    try {
      const response = await fetch('/api/timesheets');
      const data = await response.json();
      setTimesheets(data);
    } catch (error) {
      console.error('Failed to fetch timesheets:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddEntry = () => {
    setSelectedTimesheet(null);
    setIsModalOpen(true);
  };

  const handleEditEntry = (timesheet) => {
    setSelectedTimesheet(timesheet);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTimesheet(null);
  };

  const handleSaveEntry = async (entryData) => {
    try {
      const response = await fetch('/api/timesheets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(entryData),
      });

      if (response.ok) {
        fetchTimesheets();
        handleModalClose();
      }
    } catch (error) {
      console.error('Failed to save entry:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">ticktock</h1>
              <span className="ml-4 text-gray-600">Timesheets</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">{session.user?.name}</span>
              <button
                onClick={() => signOut()}
                className="text-gray-500 hover:text-gray-700"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Timesheets</h2>
          <button
            onClick={handleAddEntry}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add New Entry
          </button>
        </div>

        <TimesheetTable 
          timesheets={timesheets} 
          onEdit={handleEditEntry}
        />

        {/* Info Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">Statuses</h3>
            <ul className="space-y-2 text-sm text-yellow-700">
              <li><strong>COMPLETED:</strong> All required hours logged</li>
              <li><strong>INCOMPLETE:</strong> Some hours logged but not all</li>
              <li><strong>MISSING:</strong> No hours logged for the week</li>
            </ul>
          </div>
          
          <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
            <h3 className="font-semibold text-yellow-800 mb-3">Filters</h3>
            <div className="space-y-2 text-sm text-yellow-700">
              <p><strong>Date Range:</strong> Filter by specific date periods</p>
              <p><strong>Status:</strong> Filter by completion status</p>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <AddEntryModal
          timesheet={selectedTimesheet}
          onClose={handleModalClose}
          onSave={handleSaveEntry}
        />
      )}
    </div>
  );
}

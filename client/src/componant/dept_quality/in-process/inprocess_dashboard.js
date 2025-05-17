import React, { useState } from 'react';
import './inprocess_dashboard.css';
import InprocessSidebar from './inprocess_sidebar';

const dummyData = [
  { id: 1, item: 'Generator Frame', status: 'pending' },
  { id: 2, item: 'Engine Plate', status: 'pending' },
  { id: 3, item: 'Canopy Panel', status: 'pending' },
];

const currentStepIndex = 0; // Example: 0 = Sheet-Cutting
const completedSteps = [];  // Steps with approved checks

export default function InProcessDashboard() {
  const [items, setItems] = useState(dummyData);

  const handleApproval = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'approved' } : item
      )
    );
  };

  const handleRejection = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: 'rejected' } : item
      )
    );
  };

  return (
    <div className="dashboard-container">
      <InprocessSidebar
        currentStep={currentStepIndex}
        completedSteps={completedSteps}
      />

      <div className="dashboard-content">
        <h2>In-Process Quality Check: Sheet-Cutting</h2>

        <table className="qc-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map(({ id, item, status }) => (
              <tr key={id}>
                <td>{id}</td>
                <td>{item}</td>
                <td className={`status ${status}`}>{status}</td>
                <td>
                  <button
                    className="approve-btn"
                    onClick={() => handleApproval(id)}
                    disabled={status !== 'pending'}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleRejection(id)}
                    disabled={status !== 'pending'}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

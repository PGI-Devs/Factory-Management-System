import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa'; // Removed FaLock since we don’t need it
import './in-process.css';

function InprocessSidebar({ currentStep, completedSteps }) {
  const steps = [
    { name: 'Sheet-Cutting', path: '/production/sheet-cutting' },
    { name: 'Punching', path: '/production/punching' },
    { name: 'Fabrication', path: '/production/fabrication' },
    { name: 'Welding', path: '/production/welding' },
    { name: 'Grinding', path: '/production/grinding' },
    { name: 'Powder-Coating', path: '/production/powder-coating' },
    { name: 'Heat-Treatment', path: '/production/heat-treatment' },
    { name: 'Engine-Assembly', path: '/production/engine-assembly' },
    { name: 'Canopy Assessment', path: '/production/canopy-assessment' },
    { name: 'PDI (Pre-Delivery Inspection)', path: '/production/pdi' },
    { name: 'Quantity Check', path: '/production/quantity-check' },
  ];

  return (
    <div className="sidebar">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.includes(index);
        const isCurrent = currentStep === index;

        // Determine CSS class
        let itemClass = 'sidebar-link';
        if (isCompleted) itemClass += ' completed';
        else if (isCurrent) itemClass += ' current';

        return (
          <NavLink
            key={step.name}
            to={step.path}
            className={itemClass}
          >
            <span className="icon">
              {isCompleted && <FaCheckCircle />}
            </span>
            {step.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default InprocessSidebar;

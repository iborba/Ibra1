import React, { useEffect, useState } from 'react';

function Toast({ message, onClose }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExiting(true);
      setTimeout(onClose, 300);
    }, 2200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${exiting ? 'exit' : ''}`}>
      <span className="toast__icon">&#10003;</span>
      {message}
    </div>
  );
}

export default Toast;

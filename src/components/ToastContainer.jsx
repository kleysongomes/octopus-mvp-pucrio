import React, { useContext } from 'react';
import { IntegrationContext } from '../context/IntegrationContext';
import './Toast.css';

const ToastContainer = () => {
  const { toasts, removeToast } = useContext(IntegrationContext);

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type} slide-in`}>
          <div className="toast-icon">
            {toast.type === 'success' && '✅'}
            {toast.type === 'error' && '❌'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.type === 'warning' && '⚠️'}
          </div>
          <div className="toast-message">
            {toast.message}
          </div>
          <button className="toast-close" onClick={() => removeToast(toast.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
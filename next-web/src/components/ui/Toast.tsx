'use client';

import { useEffect } from 'react';
import '../../styles/toast.css';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'info', duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'fa-circle-check';
      case 'error':
        return 'fa-circle-xmark';
      case 'warning':
        return 'fa-triangle-exclamation';
      case 'info':
      default:
        return 'fa-circle-info';
    }
  };

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        <i className={`fa-solid ${getIcon()}`}></i>
      </div>
      <div className="toast-message">{message}</div>
      <button className="toast-close" onClick={onClose} aria-label="ปิด">
        <i className="fa-solid fa-xmark"></i>
      </button>
    </div>
  );
}

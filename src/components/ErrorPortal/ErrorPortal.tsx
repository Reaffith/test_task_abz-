"use client";
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import "./ErrorPortal.scss";

interface ErrorPortalProps {
  message: string;
  onClose: () => void;
}

export const ErrorPortal: React.FC<ErrorPortalProps> = ({
  message,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return createPortal(
    <div className="error-notification">
      <div className="error-content">
        <p>{message}</p>
        <button onClick={onClose} className="close-button">
          ×
        </button>
      </div>
    </div>,
    document.getElementById("portal-root")!
  );
};

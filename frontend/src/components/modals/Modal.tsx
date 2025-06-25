"use client";

import { ReactNode } from "react";
import { LuX } from "react-icons/lu";
import ReactModal from "react-modal";

interface IModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  title: string;
  contentLabel?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  disableClose?: boolean;
}

const sizeConfig = {
  sm: { minWidth: "400px", maxWidth: "500px" },
  md: { minWidth: "500px", maxWidth: "600px" },
  lg: { minWidth: "600px", maxWidth: "800px" },
};

export function Modal({
  isOpen,
  onRequestClose,
  title,
  contentLabel,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
  disableClose = false,
}: IModalProps) {
  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      border: "none",
      borderRadius: "12px",
      ...sizeConfig[size],
      maxHeight: "90vh",
      overflow: "visible",
    },
  };

  const handleClose = () => {
    if (!disableClose) onRequestClose();
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeOnOverlayClick ? handleClose : undefined}
      style={customStyles}
      contentLabel={contentLabel || title}
      ariaHideApp={false}
    >
      <div className="bg-white rounded-lg shadow-lg">
        <div className="flex items-center justify-between p-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {showCloseButton && (
            <button
              onClick={handleClose}
              disabled={disableClose}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              <LuX className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-6">{children}</div>
      </div>
    </ReactModal>
  );
}

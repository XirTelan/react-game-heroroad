import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export const ModalView = ({ children }: ModalViewProps) => {
  return createPortal(
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-80">
      {children}
    </div>,
    document.getElementById('modal') as HTMLElement
  );
};

type ModalViewProps = {
  children: ReactNode;
};

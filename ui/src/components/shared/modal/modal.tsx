"use client";

import { Cross1Icon } from "@radix-ui/react-icons";
import React, { ReactNode } from "react";

interface ModalProps {
  title: string;
  content: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  customFooter?: ReactNode;
}

const Modal = ({
  title,
  onClose,
  content,
  customFooter,
  onSubmit = () => {},
}: ModalProps) => {
  return (
    <>
      <div className='fixed top-0 left-0 z-50 justify-center items-center w-screen h-screen flex bg-neutral-500 opacity-80' />

      <div
        id='default-modal'
        tabIndex={-1}
        aria-hidden='true'
        className='overflow-y-auto overflow-x-hidden fixed top-0 left-0 z-50 justify-center items-center w-screen h-screen flex'
      >
        <div className='relative p-4 w-full max-w-2xl max-h-full'>
          <div className='relative bg-white rounded-lg shadow'>
            <div className='flex items-center justify-between p-4 md:p-5 rounded-t'>
              <h3 className='text-xl font-semibold text-gray-900'>{title}</h3>

              <button
                type='button'
                className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center'
                onClick={onClose}
              >
                <span className='sr-only'>Close modal</span>
                <Cross1Icon className='w-3 h-3' />
              </button>
            </div>

            <div className='p-4 md:p-5 space-y-4'>{content}</div>

            {customFooter ? (
              customFooter
            ) : (
              <div className='flex items-center p-4 md:p-5 border-gray-200 rounded-b'>
                <button
                  type='button'
                  className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  onClick={onSubmit}
                >
                  Submit
                </button>

                <button
                  type='button'
                  className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100'
                  onClick={onClose}
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;

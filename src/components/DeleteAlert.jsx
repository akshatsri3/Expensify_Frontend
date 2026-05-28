import React from 'react';
import { LuTriangleAlert } from 'react-icons/lu';

const DeleteAlert = ({ content, onDelete, onClose }) => {
    return (
        <div>
            {/* Warning Icon + Message */}
            <div className="flex flex-col items-center gap-4 text-center">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-50">
                    <LuTriangleAlert className="text-red-500 text-3xl" />
                </div>
                <div>
                    <h5 className="text-base font-semibold text-gray-800">Are you sure?</h5>
                    <p className="text-sm text-gray-500 mt-1">{content}</p>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center gap-3 mt-6">
                <button
                    type="button"
                    className="px-5 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                    onClick={onClose}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className="px-5 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
                    onClick={onDelete}
                >
                    Yes, Delete
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;

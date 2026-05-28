import React, { useRef } from 'react';
import { LuUser, LuUpload, LuX } from 'react-icons/lu';

const ProfilePicSelector = ({ image, setImage }) => {
    const fileInputRef = useRef(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            // Pass the raw File object so it can be sent via FormData for upload
            setImage(file);
        }
    };

    const onChooseFile = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            {!image ? (
                <button
                    type="button"
                    className="w-24 h-24 flex items-center justify-center bg-slate-100 rounded-full relative group transition-all duration-200 hover:bg-slate-200 border-2 border-dashed border-slate-300"
                    onClick={onChooseFile}
                >
                    <LuUser className="text-3xl text-slate-400 group-hover:text-slate-500" />
                    <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full text-white shadow-md">
                        <LuUpload className="text-xs" />
                    </div>
                </button>
            ) : (
                <div className="relative group">
                    <img
                        src={URL.createObjectURL(image)}
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border-2 border-primary/20 shadow-md"
                    />
                    <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={handleRemoveImage}
                    >
                        <LuX className="text-xs" />
                    </button>
                </div>
            )}

            <p className="text-[11px] text-slate-500 mt-2 font-medium">
                {image ? "Profile Photo" : "Upload Photo"}
            </p>
        </div>
    );
};

export default ProfilePicSelector;

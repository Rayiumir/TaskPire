import React, {useRef, useState} from "react";
import {FaTrash, FaUpload, FaUser} from "react-icons/fa6";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const preview = URL.createObjectURL(file);
            setPreviewImage(preview);
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setPreviewImage(null);
    };

    const onChooseFile = () => {
        inputRef.current.click();
    };

    return <div>
        <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{display: "none"}}
        />
        {!image ? (
            <div>
                <FaUser size={80} className="mx-auto"/>
                <button type="button" className="flex mx-auto justify-center rounded-full bg-indigo-600 mt-4 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" onClick={onChooseFile}>
                    <FaUpload/>
                    آپلود عکس
                </button>
            </div>
        ) : (
            <div>
                <img src={previewImage} alt="Profile Pic" className="mx-auto h-32 w-32 rounded-full"/>
                <button type="button" className="text-primary" onClick={handleRemoveImage}>
                    <FaTrash/>
                </button>
            </div>
        )}
    </div>
};

export default ProfilePhotoSelector
import React, { useRef, useState } from "react";
import { FaTrash, FaUpload, FaUser } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

const ProfilePhotoSelector = ({ image: externalImage, setImage: externalSetImage }) => {
    const { t } = useTranslation();
    const inputRef = useRef(null);
    const [internalImage, setInternalImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

    // If there is no image from the outside, we use the inside.
    const image = externalImage ?? internalImage;
    const setImage = externalSetImage ?? setInternalImage;

    const handleImageChange = (event) => {
        const file = event.target.files[0];
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
        inputRef.current?.click();
    };

    return (
        <div>
            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
            />
            {!image ? (
                <div>
                    <FaUser size={80} className="mx-auto" />
                    <button
                        type="button"
                        className="flex mx-auto justify-center rounded-full bg-indigo-600 mt-4 px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={onChooseFile}
                    >
                        <FaUpload className="ml-2"/>

                        <span className="ml-2">{t("Upload Image")}</span>
                    </button>
                </div>
            ) : (
                <div className="text-center">
                    <img
                        src={previewImage}
                        alt="Profile Pic"
                        className="mx-auto h-32 w-32 rounded-full object-cover"
                    />
                    <button
                        type="button"
                        className="mt-2 text-red-600 hover:text-red-800"
                        onClick={handleRemoveImage}
                    >
                        <FaTrash />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfilePhotoSelector;

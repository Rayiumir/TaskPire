import axiosInstance from "./axiosInstance.js";
import {API_PATHS} from "./apiPaths.js";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type':'multipart/form-data'
            }
        });

        return response.data;
    }catch (error) {
        console.error("Error uploading image:", error);
        throw error;
    }
};

const updateProfileImage = async (imageURL) => {
    try {
        const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE_IMAGE, {
            profileImageURL: imageURL
        });

        return response.data;
    } catch (error) {
        console.error("Error updating profile image:", error);
        throw error;
    }
};

export { uploadImage, updateProfileImage };
export default uploadImage;
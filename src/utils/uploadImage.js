import { API_PATHS } from './apiPaths';
import axiosInstance from './axiosInstance';

//upload image
const uploadImage = async (imageFile) => {
    //Create form data and append image file
    const formData = new FormData();
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        console.log('Image upload failed', error);
        throw error; //Rethrow error for handling
    }
};

export default uploadImage;

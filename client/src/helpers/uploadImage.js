import axios from 'axios';

import { API } from '../constants/api';

export const uploadImage = async (photoURL) => {
  // Create the form to be sent to the API
  const formData = new FormData();
  formData.append('file', photoURL);
  formData.append('upload_preset', 'badges_user');

  try {
    // Upload the image and return the secure_url
    const {
      data: { secure_url },
    } = await axios({
      url: API.CLOUDINARY.IMAGE_UPLOAD,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });

    return secure_url;
  } catch (error) {
    console.log(error);
  }
};

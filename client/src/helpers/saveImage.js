import axios from 'axios';

import { API } from '../constants/api';

export const saveImage = async (photoURL) => {
  console.log('Hi ====================');
  console.log(photoURL);

  const formData = new FormData();
  formData.append('file', photoURL);
  formData.append('upload_preset', 'badges_user');

  try {
    const {
      data: { secure_url },
    } = await axios({
      url: API.CLOUDINARY,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: formData,
    });

    console.log('==========================', secure_url);
  } catch (error) {
    console.log(error);
  }
};

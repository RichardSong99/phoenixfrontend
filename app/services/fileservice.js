import axios from 'axios';
import Cookies from 'js-cookie';

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

class FileService {
  async uploadFile(file) {
    let token;
    try {
      token = Cookies.get('token');
    } catch (error) {
      console.error('Could not get token:', error);
    }

    // Extract the file extension
    const fileExtension = file.name.split('.').pop();

    const formData = new FormData();
    formData.append('image', file);  // Changed form key to 'image'
    formData.append('fileExtension', fileExtension);  // Append the file extension

    const requestOptions = {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post(`${apiUrl}/upload`, formData, requestOptions);

    if (response.status === 200) {
      return response.data.url;
    } else {
      throw new Error('File upload failed');
    }
  }
}

export default new FileService();
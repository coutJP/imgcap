import React, { useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [photo, setPhoto] = useState(null);
  const [caption, setCaption] = useState('');

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('photo', photo);
      formData.append('caption', caption);

      await axios.post('http://localhost:5000/api/photos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPhoto(null);
      setCaption('');
      alert('Photo submitted successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Admin Page</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Photo:
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
        </label>
        <br />
        <label>
          Caption:
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminPage;

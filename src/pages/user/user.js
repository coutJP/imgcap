import React, { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/photos');
        setPhotos(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      <h2>Photos:</h2>
      {photos.map((photo) => (
        <div key={photo._id}>
          <img src={`http://localhost:5000/${photo.photo}`} alt="User submitted" />
          <p>{photo.caption}</p>
        </div>
      ))}
    </div>
  );
};

export default User;

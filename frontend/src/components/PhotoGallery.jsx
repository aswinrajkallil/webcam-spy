import { useEffect, useState } from "react";
import "./PhotoGallery.css";


function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const getPhotos = () => {
      const token = localStorage.getItem("accessToken");

      fetch(`${import.meta.env.VITE_API_URL}/api/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setPhotos(data);
        })
        .catch((error) => {
          console.error("Error fetching photos:", error);
        });
    };

    getPhotos();

    const interval = setInterval(getPhotos, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="gallery-page">
      <h1>Captured Photos</h1>
      
      <div className="gallery">
        {photos.map((photo) => (
          <div className="photo-card" key={photo._id}>
            <img
              src={`${import.meta.env.VITE_API_URL}/${photo.path.replace(/\\/g, "/")}`}         alt="Captured"
              className="captured-photo"
            />
            <p>
              Captured:{" "}
              {new Date(photo.createdAt).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PhotoGallery;
import React, { useState, useEffect } from 'react';

import image1 from '../assets/image/cadre-photo-vue.jpg';
import image2 from '../assets/image/fournitures-scolaires-avec-calculatrice.jpg';
import image3 from '../assets/image/materiel-de-papeterie-scolaire.jpg';
import image4 from '../assets/image/stationery-set-icons-png.png';
import image5 from '../assets/image/vue-de-face-differents-crayons-et-peintures.jpg';

const initialSlides = [
  { id: 1, url: image1, text: 'Beautiful Mountain' },
  { id: 2, url: image2, text: 'Calm Lake' },
  { id: 3, url: image3, text: 'Forest Path' },
  { id: 4, url: image4, text: 'City Skyline' },
  { id: 5, url: image5, text: 'Sunset Beach' },
];

function Home() {
  const [slides, setSlides] = useState(initialSlides);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const selectSlide = (index) => {
    setCurrentIndex(index);
  };

  const handleTextChange = (e) => {
    const newSlides = [...slides];
    newSlides[currentIndex].text = e.target.value;
    setSlides(newSlides);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>Welcome to StockApp Home Page</h2> */}

      {/* Fullscreen Carousel */}
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '80vh',
          overflow: 'hidden',
          borderRadius: '8px',
          marginBottom: '1rem',
        }}
      >
        <img
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.5s ease-in-out',
          }}
          key={slides[currentIndex].id}
        />

        {/* Text Overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '30px',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            padding: '10px 15px',
            borderRadius: '6px',
            fontSize: '1.5rem',
            maxWidth: '70%',
            userSelect: 'none',
          }}
        >
          {slides[currentIndex].text}
        </div>
      </div>

      {/* Editable Text Input
      <div style={{ maxWidth: 800, margin: '0 auto 2rem' }}>
        <input
          type="text"
          value={slides[currentIndex].text}
          onChange={handleTextChange}
          placeholder="Edit text on image..."
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '1.2rem',
            borderRadius: '6px',
            border: '1px solid #ccc',
            boxSizing: 'border-box',
          }}
        />
      </div> */}

      {/* Thumbnails */}
      {/* <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          maxWidth: 800,
          margin: '0 auto 3rem',
        }}
      >
        {slides.map((slide, index) => (
          <img
            key={slide.id}
            src={slide.url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => selectSlide(index)}
            style={{
              width: 120,
              height: 70,
              objectFit: 'cover',
              cursor: 'pointer',
              borderRadius: '6px',
              border: currentIndex === index ? '4px solid #3498db' : '2px solid #ccc',
              opacity: currentIndex === index ? 1 : 0.6,
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div> */}
    </div>
  );
}

export default Home;

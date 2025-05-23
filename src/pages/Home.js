import React, { useState, useEffect } from 'react';
import './Home.css';

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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="home-container">
      <div className="carousel">
        <img
          src={slides[currentIndex].url}
          alt={`Slide ${currentIndex + 1}`}
          key={slides[currentIndex].id}
        />
        <div className="carousel-text">
          {slides[currentIndex].text}
        </div>
      </div>
    </div>
  );
}

export default Home;

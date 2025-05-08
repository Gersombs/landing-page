'use client';

import { motion } from 'framer-motion';
import React from 'react';

const Hero = () => {
  const handleScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;

    // Scroll suave
    section.scrollIntoView({ behavior: 'smooth' });

    // Quitar el hash de la URL sin recargar la página
    window.history.replaceState(null, '', window.location.pathname);
  };

  return (
    <motion.div
      id="hero"
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="relative h-screen bg-cover bg-center"
    >
      {/* Fondo con opacidad */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      ></div>

      {/* Contenido centrado */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">GamerCo 2025</h1>
        <p className="text-lg md:text-2xl mb-8">
          ¡Únete a la convención de videojuegos más grande del año!
        </p>
        <a
          href="#register"
          onClick={(e) => handleScroll(e, 'register')}
          className="inline-block button-contact text-white font-medium py-2 px-4 rounded transition duration-300 animate-pulse"
        >
          Regístrate ahora
        </a>
      </div>
    </motion.div>
  );
};

export default Hero;

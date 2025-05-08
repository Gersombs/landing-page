'use client';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleScroll = (e, sectionId) => {
    e.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
      // Scroll suave
      section.scrollIntoView({ behavior: 'smooth' });

      // Quitar el hash de la URL sin recargar la página
      router.replace(router.pathname, undefined, { shallow: true });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 fixed w-full top-0 left-0 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo o Título */}
          <div className="flex items-center">
            <a href="#" onClick={(e) => handleScroll(e, 'hero')} className="text-2xl font-bold text-gray-100">
              GamerCo™
            </a>
          </div>
          {/* Menú de escritorio */}
          <div className="hidden md:flex items-center space-x-8 text-lg">
            <a href="#hero" onClick={(e) => handleScroll(e, 'hero')} className="text-gray-100 hover:text-gray-300">
              Inicio
            </a>
            <a href="#info" onClick={(e) => handleScroll(e, 'info')} className="text-gray-100 hover:text-gray-300">
              Información
            </a>
            <a href="#register" onClick={(e) => handleScroll(e, 'register')} className="text-gray-100 hover:text-gray-300">
              Registro
            </a>
          </div>
          {/* Botón hamburguesa para móvil */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-100 hover:text-blue-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {/* Icono hamburguesa / cerrar */}
              {!isOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden px-2 pt-2 pb-3 space-y-1">
          <a
            href="#hero"
            onClick={(e) => {
              handleScroll(e, 'hero');
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-blue-500"
          >
            Inicio
          </a>
          <a
            href="#info"
            onClick={(e) => {
              handleScroll(e, 'info');
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-blue-500"
          >
            Información
          </a>
          <a
            href="#register"
            onClick={(e) => {
              handleScroll(e, 'register');
              setIsOpen(false);
            }}
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-100 hover:bg-blue-500"
          >
            Registro
          </a>
        </div>
      )}
    </nav>
  );
}

import React from 'react';
import Image from 'next/image';

export default function EventInfo() {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-purple-800 to-indigo-900 rounded-r-3xl text-gray-200 overflow-hidden">
      {/* Columna Izquierda: Información del Evento */}
      <div className="flex-1 flex flex-col justify-center p-8 lg:w-1/3  text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">GamerCo 2025</h1>
        <p className="text-lg md:text-xl mb-2">Fecha: 20 de Junio de 2025</p>
        <p className="text-lg md:text-xl mb-6">Lugar: Centro de convenciones WTC</p>
        <p className="text-gray-100 mb-8 max-w-prose">
          Breve descripción del evento. Lorem ipsum dolor sit amet, consectetur adipiscing elit. <br/>
          Proin sodales, mauris nec interdum facilisis, magna lorem bibendum elit, vitae porta ante eros ut est.
        </p>
      </div>

      {/* Columna Derecha: Galería de Imágenes */}
      <div className="lg:w-2/3 flex items-center justify-center py-12 lg:py-0 lg:h-screen">
        <div className="banner w-full h-[400px] lg:h-auto">
          <div className="slider" style={{ "--quantity": 5 }}>
            <div className="item" style={{ "--position": 1 }}>
              <Image src="/images/1.webp" alt="GamerCo1" width={200} height={250} className="object-contain"/>
            </div>
            <div className="item" style={{ "--position": 2 }}>
              <Image src="/images/2.webp" alt="GamerCo2" width={200} height={250} className="object-contain"/>
            </div>
            <div className="item" style={{ "--position": 3 }}>
              <Image src="/images/3.webp" alt="GamerCo3" width={200} height={250} className="object-contain"/>
            </div>
            <div className="item" style={{ "--position": 4 }}>
              <Image src="/images/4.webp" alt="GamerCo4" width={200} height={250} className="object-contain"/>
            </div>
            <div className="item" style={{ "--position": 5 }}>
              <Image src="/images/5.webp" alt="GamerCo5" width={200} height={250} className="object-contain"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


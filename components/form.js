"use client";
import { useState, useEffect, useRef } from 'react';

export default function RegisterSection() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutos en segundos
  const [submitted, setSubmitted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const timerRef = useRef(null);

  // Estados controlados para los campos del formulario
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Inicia el temporizador solo una vez al primer interacto
  const startTimer = () => {
    if (submitted || timerStarted) return;
    setTimerStarted(true);
    setCountdown(300);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Reinicia el temporizador si aún no se ha enviado el formulario
  const resetTimer = () => {
    if (submitted) return;
    setVisible(true);
    setTimerStarted(false);
    setCountdown(300);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startTimer();
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // evita que el formulario recargue la página

    try {
      const res = await fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }) // enviamos los valores del estado
      });

      if (res.ok) {
        // Limpiar formulario y mostrar mensaje de éxito
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(true);
        alert('Mensaje enviado exitosamente');
      } else {
        throw new Error('Error en la petición');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error de conexión');
    }
  };

  // Limpieza al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Formatea el tiempo (mm:ss)
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="register" className="min-h-screen flex items-center justify-center py-16 text-white">
      <div className="max-w-md w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Registro</h2>
        {visible ? (
          <form
            className="space-y-6"
            onFocusCapture={startTimer}
            onClick={startTimer}
            onSubmit={handleSubmit}
          >
            {/* Temporizador */}
            {!submitted && (
              <div className="text-center text-lg font-medium">
                Tiempo restante: {formatTime(countdown)}
              </div>
            )}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Mensaje (opcional)
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={submitted}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 disabled:opacity-50"
            >
              Enviar registro
            </button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-red-600 mb-4">
              ⏳ El tiempo para registrarse ha expirado
            </p>
            {!submitted && (
              <button
                onClick={resetTimer}
                className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Reiniciar temporizador
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}


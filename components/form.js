"use client";
import { useState, useEffect, useRef } from 'react';

export default function RegisterSection() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutos en segundos
  const [submitted, setSubmitted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [loading, setLoading] = useState(false);
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
    clearInterval(timerRef.current);
    setTimerStarted(false);
    setCountdown(300);
    setVisible(true);
    startTimer();
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Por favor completa todos los campos.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: name, email, mensaje: message }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(`Error: ${data.error}`);
        return;
      }
      setSubmitted(true);
      alert('¡Mensaje enviado correctamente!');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Error de conexión:', err);
      alert('Error de conexión. Intenta de nuevo más tarde.');
    } finally {
      setLoading(false);
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
                id="name"
                type="text"
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
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                Mensaje
              </label>
              <textarea
                id="message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={submitted || loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar registro'}
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


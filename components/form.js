"use client";
import { useState, useEffect, useRef } from 'react';

export default function RegisterSection() {
  const [visible, setVisible] = useState(true);
  const [countdown, setCountdown] = useState(300); // 5 minutos en segundos
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const timerRef = useRef(null);

  // Campos controlados
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // Inicia el temporizador al primer interacto
  const startTimer = () => {
    if (submitted || timerRef.current) return;
    timerRef.current = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setVisible(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      // Validación antes de enviar
      setShowPopup(true);
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
        // Mostrar error del servidor en popup
        setShowPopup(true);
        return;
      }
      // Registro exitoso
      setSubmitted(true);
      setShowPopup(true);
      setName('');
      setEmail('');
      setMessage('');
      clearInterval(timerRef.current);
    } catch (err) {
      console.error('Error de conexión:', err);
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  // Limpieza
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const formatTime = (sec) => {
    const m = String(Math.floor(sec / 60)).padStart(2, '0');
    const s = String(sec % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <section id="register" className="min-h-screen flex items-center justify-center py-16 text-white">
      <div className="max-w-md w-full px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Registro</h2>

        {/* Formulario oculto tras envío */}
        {!submitted && visible && (
          <form
            className="space-y-6"
            onFocusCapture={startTimer}
            onClick={startTimer}
            onSubmit={handleSubmit}
          >
            <div className="text-center text-lg font-medium">
              Tiempo restante: {formatTime(countdown)}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
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
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
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
                onChange={e => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-3 rounded-lg text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Enviando...' : 'Enviar registro'}
            </button>
          </form>
        )}

        {/* Mensaje cuando expira el tiempo (antes de enviar) */}
        {!submitted && !visible && (
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold text-red-600">⏳ El tiempo ha expirado</p>
            <button
              onClick={() => { setVisible(true); setCountdown(300); startTimer(); }}
              className="bg-blue-600 py-2 px-6 rounded-lg text-white hover:bg-blue-700"
            >
              Reiniciar temporizador
            </button>
          </div>
        )}
      </div>

      {/* Popup genérico */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xs text-center">
            <h3 className="text-xl font-semibold mb-4">
              {submitted ? '¡Registro exitoso!' : 'Aviso'}
            </h3>
            <p className="mb-6">
              {submitted
                ? 'Tu mensaje ha sido enviado correctamente.'
                : 'Por favor completa todos los campos.'}
            </p>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

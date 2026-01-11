'use client';

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Descubre los consumibles de líneas de hemodiálisis",
      image: "🩺",
      cta: "Ver catálogo",
    },
    {
      title: "Equipos médicos de alta calidad",
      image: "💊",
      cta: "Explorar",
    },
    {
      title: "Salud al alcance de todos",
      image: "❤️",
      cta: "Comprar",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-400 to-teal-300 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold text-gray-800">
            🏥 Dafa Medic ERL
          </div>
          <p className="text-sm text-gray-700">Equipos médicos de calidad</p>
        </div>
        <nav className="hidden md:flex gap-8 items-center text-gray-800 font-medium">
          <Link href="/" className="hover:text-gray-900">
            Inicio
          </Link>
          <Link href="/productos" className="hover:text-gray-900">
            Catálogo
          </Link>
          <Link href="/" className="hover:text-gray-900">
            Nosotros
          </Link>
          <Link
            href="/cart"
            className="bg-teal-600 text-white px-6 py-2 rounded-full hover:bg-teal-700 transition-colors font-semibold"
          >
            Solicitar cotización
          </Link>
        </nav>
      </header>

      {/* Hero Slider */}
      <section className="flex-1 bg-gradient-to-br from-teal-200 to-teal-100 px-6 py-16 md:py-24">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {slides[currentSlide].title}
            </h1>
            <Link
              href="/productos"
              className="inline-block w-fit bg-teal-600 text-white px-8 py-3 rounded-full hover:bg-teal-700 transition-colors font-semibold text-lg"
            >
              {slides[currentSlide].cta}
            </Link>
          </div>

          {/* Right Image - Carousel */}
          <div className="flex justify-center items-center">
            <div className="text-8xl animate-bounce">
              {slides[currentSlide].image}
            </div>
          </div>
        </div>

        {/* Slider Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-teal-600 w-8"
                  : "bg-gray-400 w-3 hover:bg-gray-500"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Qué más tenemos para ofrecerte?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Envío Rápido
              </h3>
              <p className="text-gray-700">
                Entrega en toda la región con productos en perfectas condiciones
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Calidad Garantizada
              </h3>
              <p className="text-gray-700">
                Todos nuestros productos cumplen con normas internacionales
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Asesoría Personalizada
              </h3>
              <p className="text-gray-700">
                Nuestro equipo está listo para ayudarte en tu compra
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-teal-600 to-teal-500 px-6 py-16 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            ¿Listo para comenzar?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Explora nuestro catálogo completo de equipos y consumibles médicos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/productos"
              className="inline-block bg-white text-teal-600 px-8 py-3 rounded-full hover:bg-gray-100 transition-colors font-semibold text-lg"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/cart"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-teal-600 transition-colors font-semibold text-lg"
            >
              Ir al Carrito
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 px-6 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="mb-2">
            © 2026 Dafa Medic ERL. Todos los derechos reservados.
          </p>
          <p className="text-sm">
            Equipos médicos de calidad para profesionales de la salud
          </p>
        </div>
      </footer>
    </div>
  );
}
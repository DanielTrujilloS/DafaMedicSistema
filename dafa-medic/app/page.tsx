'use client';

import Hero from '@/components/Hero';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Features Section - Productos Destacados */}
      <section className="px-6 py-16" style={{ background: '#91E7CB' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            ¿Qué mas tenemos para ofrecerte?
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Product Card 1 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/estetoscopio1.png" alt="Estetoscopio" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/glucometro1.png" alt="Glucometro" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/oximetro1.png" alt="Oximetro" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 4 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/hemoglobi.png" alt="Hemoglobi" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 5 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/refri.png" alt="Refrigerador" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card 6 */}
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-sm transition-shadow border border-gray-100 group">
              <div className="relative w-full h-48 bg-white rounded-lg flex items-center justify-center mb-4 overflow-hidden">
                <img src="/tubos.png" alt="Tubos" className="h-40 w-auto object-contain" />
                <div className="absolute inset-0 bg-white bg-opacity-15 backdrop-blur-md rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors">
                    Ver más
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Cotizar Button */}
          <div className="flex justify-center">
            <button className="bg-teal-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition-colors text-lg">
              Cotizar ahora
            </button>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="px-6 py-16" style={{ background: 'linear-gradient(to bottom, #91E7CB, white)' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Los que han <span className="font-black">confiado</span> en nosotros...
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Brand 1 - I.N.C.N */}
            <div className="bg-teal-50 p-12 rounded-2xl flex items-center justify-center h-40 hover:shadow-lg transition-shadow">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-600 mb-2">I</div>
                <p className="text-red-600 font-bold text-lg">I.N.C.N</p>
              </div>
            </div>

            {/* Brand 2 */}
            <div className="bg-teal-50 p-12 rounded-2xl flex items-center justify-center h-40 hover:shadow-lg transition-shadow">
              <div className="text-center text-gray-400">
                <p className="text-lg font-semibold">Logo Cliente</p>
              </div>
            </div>

            {/* Brand 3 */}
            <div className="bg-teal-50 p-12 rounded-2xl flex items-center justify-center h-40 hover:shadow-lg transition-shadow">
              <div className="text-center text-gray-400">
                <p className="text-lg font-semibold">Logo Cliente</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="bg-gradient-to-b from-white to-teal-50 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Blog Posts
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Blog Post 1 */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Blog Post 2 */}
            <div className="bg-white p-8 rounded-3xl shadow-md hover:shadow-lg transition-shadow">
              <p className="text-gray-700 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisl ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
      <footer className="bg-gray-900 text-gray-300 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="mb-4">
                <img src="/logonegro.png" alt="Dafa Medic Logo" className="h-16 w-auto mb-2" />
              </div>
              <h3 className="text-white font-bold text-lg mb-4">Dafa Medic Eirl</h3>
              <p className="text-sm text-gray-400 mb-4">
                Tecnología médica al servicio del Perú desde 2009
              </p>
              <p className="text-sm text-gray-400 mb-2">
                RUC: 20123456789
              </p>
              <p className="text-sm text-gray-400">
                Razón Social: Dafa Medic S.A.C.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Enlaces rápidos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Inicio
                  </Link>
                </li>
                <li>
                  <Link href="/productos" className="text-gray-400 hover:text-white transition-colors">
                    Productos
                  </Link>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Instituciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Certificaciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Contacto</h4>
              <p className="text-sm text-gray-400 mb-3">
                📍 Av. Javier Prado Este 123<br />
                San Isidro, Lima - Perú
              </p>
              <p className="text-sm text-gray-400 mb-2">
                📞 (01) 234-5678
              </p>
              <p className="text-sm text-gray-400">
                📧 ventas@dafamedic.com
              </p>
            </div>

            {/* Social & Legal */}
            <div>
              <h4 className="text-white font-bold text-lg mb-4">Síguenos</h4>
              <div className="flex gap-4 mb-8">
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                  f
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                  📷
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors text-xl">
                  🎵
                </a>
              </div>

              <h4 className="text-white font-bold text-lg mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Política de privacidad
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Términos y condiciones
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">
                    Política de cookies
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© 2025 Dafa Medic S.A.C. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
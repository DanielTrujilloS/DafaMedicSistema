'use client';

import { useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCube, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Link from 'next/link';
import './hero.css';
import 'swiper/css';
import 'swiper/css/effect-cube';

const products = [
  {
    id: 1,
    title: 'Líneas de Hemodiálisis',
    description:
      'Líneas de hemodiálisis de alta calidad diseñadas para procedimientos seguros y eficientes. Compatibles con todos los sistemas estándar.',
    price: 'Desde $45 por unidad',
    image: '/tubos.png',
    reviews: 128,
    rating: 5,
  },
  {
    id: 2,
    title: 'Estetoscopios Profesionales',
    description:
      'Estetoscopios de precisión médica con tecnología de aislamiento acústico avanzado. Ideal para consultas y diagnósticos.',
    price: 'Desde $85 por unidad',
    image: '/estetoscopio1.png',
    reviews: 307,
    rating: 5,
  },
  {
    id: 3,
    title: 'Oxímetros de Pulso',
    description:
      'Dispositivos de monitoreo de oxígeno en sangre de última generación con lecturas precisas en tiempo real. Portátil y fácil de usar.',
    price: 'Desde $120 por unidad',
    image: '/oximetro1.png',
    reviews: 1152,
    rating: 4.5,
  },
  {
    id: 4,
    title: 'Glucómetros Instant',
    description:
      'Glucómetros instantáneos para monitoreo de glucosa con resultados en segundos. Sistema integrado de lancetas incluidas.',
    price: 'Desde $65 por unidad',
    image: '/glucometro1.png',
    reviews: 619,
    rating: 4,
  },
];

export default function Hero() {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span
        key={i}
        className={i < Math.floor(rating) ? 'star filled' : 'star'}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="hero-section">
      <section className="hero-container">
        <div className="content">
          <h1>Soluciones Médicas de Calidad</h1>
          <p>
            Ofrecemos equipos y consumibles médicos de alta calidad diseñados para
            proporcionar soluciones integradas en salud. Cada producto está
            seleccionado con rigor para garantizar seguridad y eficiencia en
            procedimientos médicos críticos.
          </p>
          <Link href="/productos" className="btn-explore">
            Explorar Catálogo
          </Link>
        </div>

        <div className="swiper-container">
          <Swiper
            effect={'cube'}
            grabCursor={true}
            loop={true}
            speed={1000}
            cubeEffect={{
              shadow: false,
              slideShadows: true,
              shadowOffset: 10,
              shadowScale: 0.94,
            }}
            autoplay={{
              delay: 2600,
              pauseOnMouseEnter: true,
            }}
            modules={[EffectCube, Autoplay]}
            className="swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="swiper-slide">
                <div className="slide-content">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="slide-image"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="cost-badge">{product.price}</div>
                  <div className="overlay">
                    <h2>{product.title}</h2>
                    <p>{product.description}</p>
                    <div className="ratings">
                      <div className="stars">
                        {renderStars(product.rating)}
                      </div>
                      <span>{product.reviews} reseñas</span>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </div>
  );
}

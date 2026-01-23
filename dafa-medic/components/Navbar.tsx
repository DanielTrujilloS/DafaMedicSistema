'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import './navbar.css';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Categorías de productos médicos
  const navItems = [
    { label: 'Inicio', href: '/' },
    {
      label: 'Productos',
      href: '#',
      submenu: {
        columns: [
          {
            title: 'Consumibles',
            links: [
              { label: 'Jeringuillas', href: '/productos' },
              { label: 'Agujas', href: '/productos' },
              { label: 'Vendajes', href: '/productos' },
              { label: 'Guantes Médicos', href: '/productos' },
            ],
          },
          {
            title: 'Equipos Médicos',
            links: [
              { label: 'Tensiómetros', href: '/productos' },
              { label: 'Estetoscopios', href: '/productos' },
              { label: 'Termómetros', href: '/productos' },
            ],
          },
          {
            title: 'Dispositivos Especializados',
            links: [
              { label: 'Líneas de Hemodiálisis', href: '/productos' },
              { label: 'Refrigeradores Médicos', href: '/productos' },
              { label: 'Oxímetros', href: '/productos' },
            ],
          },
          {
            title: 'Accesorios',
            links: [
              { label: 'Tubos y Conectores', href: '/productos' },
              { label: 'Soportes', href: '/productos' },
              { label: 'Bolsas Médicas', href: '/productos' },
            ],
          },
        ],
      },
    },
    {
      label: 'Servicios',
      href: '#',
      submenu: {
        columns: [
          {
            title: 'Consultoría',
            links: [
              { label: 'Asesoramiento Técnico', href: '#' },
              { label: 'Capacitación Personal', href: '#' },
              { label: 'Auditoría Médica', href: '#' },
            ],
          },
          {
            title: 'Soporte',
            links: [
              { label: 'Mantenimiento Equipos', href: '#' },
              { label: 'Reparación', href: '#' },
              { label: 'Calibración', href: '#' },
            ],
          },
        ],
      },
    },
    { label: 'Ubicaciones', href: '#' },
    { label: 'Equipo', href: '#' },
    { label: 'Contacto', href: '#' },
  ];

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar con Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropdown();
        setMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <header id="nav-menu" aria-label="navigation bar">
      <div className="navbar-container">
        <div className="nav-start">
          <Link href="/" className="logo">
            <Image
              src="/logoprincipal.png"
              alt="DafaMedic - Soluciones Médicas Integradas"
              width={180}
              height={50}
              priority
              style={{ height: 'auto' }}
            />
          </Link>
        </div>

        <nav className={`menu ${menuOpen ? 'show' : ''}`}>
          <ul className="menu-bar">
            {navItems.map((item) => (
              <li key={item.label}>
                {item.submenu ? (
                  <div ref={dropdownRef} className="dropdown-wrapper">
                    <button
                      className="nav-link dropdown-btn"
                      onClick={() => toggleDropdown(item.label)}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === item.label}
                      aria-label={`Explorar ${item.label}`}
                    >
                      {item.label}
                      <ChevronDown
                        size={18}
                        className={`chevron ${openDropdown === item.label ? 'rotate' : ''}`}
                      />
                    </button>

                    <div
                      className={`dropdown ${openDropdown === item.label ? 'active' : ''}`}
                      role="menu"
                    >
                      {item.submenu.columns.map((column, idx) => (
                        <ul key={idx} role="menu">
                          <li role="menuitem">
                            <a className="menu-heading" href={column.links[0].href}>
                              {column.title}
                            </a>
                            {column.links.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                className="menu-sub-link"
                                onClick={() => {
                                  closeDropdown();
                                  setMenuOpen(false);
                                }}
                              >
                                {link.label}
                              </Link>
                            ))}
                          </li>
                        </ul>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className="nav-link"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-end">
          <button
            id="hamburger"
            aria-label="menú hamburguesa"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

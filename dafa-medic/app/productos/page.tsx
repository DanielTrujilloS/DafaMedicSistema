'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/lib/store/CartStore';
import Link from 'next/link';
import { Search } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  priceCents: number;
  stock: number;
  description: string;
  images: string[];
  isActive: boolean;
}

interface Filters {
  brands: string[];
  categories: string[];
  searchQuery: string;
}

export default function StorePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    categories: [],
    searchQuery: '',
  });
  const addItem = useCartStore((state) => state.addItem);
  const items = useCartStore((state) => state.items);

  // Extraer marcas y categorías únicas de los productos
  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand)));
  const uniqueCategories = ['Consumibles', 'Equipos', 'Accesorios', 'Dispositivos'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/productos');
        if (!response.ok) throw new Error('Error al cargar productos');
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrar productos según los filtros seleccionados
  useEffect(() => {
    let filtered = products;

    // Filtrar por búsqueda
    if (filters.searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filtrar por marca
    if (filters.brands.length > 0) {
      filtered = filtered.filter((p) => filters.brands.includes(p.brand));
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  const handleFilterChange = (type: 'brands' | 'categories', value: string) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((item) => item !== value)
        : [...prev[type], value],
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, searchQuery: e.target.value }));
  };

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      priceCents: product.priceCents,
      quantity: 1,
      image: product.images[0],
      brand: product.brand,
    });
    alert(`✅ ${product.name} agregado al carrito`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando catálogo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-teal-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-teal-400 to-teal-300 px-8 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
          <div className="text-3xl font-bold text-teal-900">🏥</div>
          <div>
            <h1 className="text-xl font-bold text-teal-900">Dafa Medic Eirl</h1>
            <p className="text-xs text-teal-800">Integrated Medical Solutions</p>
          </div>
        </div>
        <nav className="flex gap-6 items-center">
          <Link href="/" className="text-teal-900 font-medium hover:text-teal-700">
            Inicio
          </Link>
          <Link href="/productos" className="text-teal-900 font-medium hover:text-teal-700">
            Catálogo
          </Link>
          <a href="#" className="text-teal-900 font-medium hover:text-teal-700">
            Nosotros
          </a>
          <button className="bg-teal-500 text-white px-6 py-2 rounded-full font-medium hover:bg-teal-600 transition-colors">
            Solicitar cotización
          </button>
          <Link 
            href="/cart"
            className="relative flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-full font-medium hover:bg-teal-50 transition-colors"
          >
            🛒 Carrito
            {items.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>
        </nav>
      </header>

      {/* Breadcrumb y Título */}
      <section className="bg-gradient-to-r from-teal-400 to-teal-300 px-8 py-6">
        <p className="text-teal-900 text-sm font-medium mb-2">
          <Link href="/" className="hover:underline">Inicio</Link> | <span className="ml-2">Catálogo</span>
        </p>
        <h2 className="text-white text-xl font-medium">Nuestros productos</h2>
      </section>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar Filtros */}
        <aside className="w-64 bg-teal-200 p-8 min-h-screen">
          {/* Filtro Marcas */}
          <div className="mb-8">
            <h3 className="text-lg font-bold text-teal-900 mb-4">Marcas</h3>
            <div className="space-y-3">
              {uniqueBrands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.brands.includes(brand)}
                    onChange={() => handleFilterChange('brands', brand)}
                    className="w-5 h-5 accent-teal-600 cursor-pointer"
                  />
                  <span className="text-teal-900 font-medium">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Filtro Categorías */}
          <div>
            <h3 className="text-lg font-bold text-teal-900 mb-4">Filtrar por:</h3>
            <p className="text-sm font-semibold text-teal-800 mb-3">Categorías</p>
            <div className="space-y-3">
              {uniqueCategories.map((category) => (
                <label key={category} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-5 h-5 accent-teal-600 cursor-pointer"
                  />
                  <span className="text-teal-900 font-medium">{category}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Contenido Principal */}
        <main className="flex-1 p-8">
          {/* Barra de búsqueda */}
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-md relative">
              <input
                type="text"
                placeholder="Buscar"
                value={filters.searchQuery}
                onChange={handleSearchChange}
                className="w-full px-6 py-3 rounded-full border-none shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-black placeholder-gray-400"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Grid de Productos */}
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
              ❌ {error}
            </div>
          )}

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-lg">
                {products.length === 0 ? 'No hay productos disponibles' : 'No se encontraron productos que coincidan'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow h-full flex flex-col"
                >
                  {/* Imagen del producto */}
                  <div className="h-64 bg-gray-200 flex items-center justify-center overflow-hidden">
                    {product.images[0] ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-gray-400 text-center">
                        <p>Sin imagen</p>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-2">
                      {product.brand}
                    </p>
                    <h3 className="text-base font-bold text-gray-900 mb-2 line-clamp-2 h-14">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                      {product.description}
                    </p>

                    {/* Precio y Stock */}
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-2xl font-bold text-blue-600">
                        S/ {(product.priceCents / 100).toFixed(2)}
                      </p>
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${
                          product.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.stock > 0 ? `${product.stock} stock` : 'Agotado'}
                      </span>
                    </div>

                    {/* Botón Ver más / Agregar */}
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full bg-teal-500 text-white py-2 rounded-full font-semibold hover:bg-teal-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                      {product.stock > 0 ? 'Ver más' : 'Agotado'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
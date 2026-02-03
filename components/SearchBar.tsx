
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { products } from '../data/products';
import type { Product } from '../types';
import { FiSearch } from 'react-icons/fi';

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const lowercasedQuery = query.toLowerCase();
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercasedQuery) ||
        product.description.toLowerCase().includes(lowercasedQuery) ||
        product.category.toLowerCase().includes(lowercasedQuery) ||
        (product.brand && product.brand.toLowerCase().includes(lowercasedQuery))
    );
    setResults(filteredProducts);
    setIsOpen(true);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div className="relative w-full md:w-72" ref={searchRef}>
      <div className="relative">
        <FiSearch className="absolute top-1/2 left-3.5 -translate-y-1/2 text-gray-500/60 pointer-events-none" size={18} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.trim() && setIsOpen(true)}
          placeholder="Search fabrics..."
          className="w-full pl-11 pr-4 py-2.5 text-sm bg-white/90 backdrop-blur-sm border border-gray-300/60 rounded-full focus:ring-2 focus:ring-primary-blue/50 focus:border-primary-blue transition-all duration-300 ease-out hover:border-gray-400/60 placeholder-gray-500/50"
        />
      </div>
      {isOpen && results.length > 0 && (
        <div className="absolute top-full mt-3 w-full md:w-96 bg-white rounded-xl shadow-xl border border-gray-200/80 z-50 max-h-96 overflow-y-auto animate-slide-down">
          <ul className="divide-y divide-gray-100">
            {results.map((product) => (
              <li key={product.id}>
                <Link
                  to={`/product/${product.id}`}
                  onClick={handleLinkClick}
                  className="flex items-center p-3.5 hover:bg-blue-50/70 transition-colors duration-200 ease-out group"
                >
                  <img src={product.images[0]} alt={product.name} className="w-14 h-14 object-cover rounded-lg mr-3.5 shadow-sm group-hover:shadow-md transition-shadow duration-300"/>
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-gray-800 group-hover:text-primary-blue transition-colors duration-300">{product.name}</p>
                    <p className="text-xs text-gray-500 group-hover:text-gray-700 transition-colors duration-300">₹{product.price.toLocaleString()}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {isOpen && results.length === 0 && query.trim() !== '' && (
         <div className="absolute top-full mt-3 w-full bg-white rounded-xl shadow-xl border border-gray-200/80 z-50 p-6 text-center animate-slide-down">
            <p className="text-sm text-gray-600">No results found for "<span className="font-semibold text-primary-blue">{query}</span>"</p>
         </div>
      )}
    </div>
  );
};

export default SearchBar;

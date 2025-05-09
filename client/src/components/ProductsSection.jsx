import React from 'react';
import { FaPlug } from 'react-icons/fa';
import generator1 from '../assets/generator1.png';
import generator2 from '../assets/generator2.png';

const ProductsSection = () => {
  return (
    <section className="w-full bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold">
            <span className="text-green-800">OUR </span>
            <span className="text-green-500">PRODUCTS</span>
          </h1>
          <p className="mt-2 text-base text-green-800 max-w-2xl mx-auto">
            India's Largest Selling And Most Trusted DG Set Manufacturer in India For Over A Decade.
          </p>
          <div className="mt-2 text-green-600 text-2xl flex justify-center">
            <FaPlug />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Product Card 1 */}
          <div className="group flex flex-col md:flex-row bg-green-50 rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all duration-200 active:scale-[0.98] hover:-translate-y-2">
            {/* Image with strong hover effect */}
            <div className="md:w-1/2 flex justify-center items-center p-4 relative">
              <div className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-30 blur-lg scale-90 group-hover:scale-110 transition-all duration-300"></div>
              <img
                src={generator1}
                alt="3.5-5 kVA Generator"
                className="h-48 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300 rounded-3xl group-active:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-800 mb-1 group-hover:text-green-600 transition-colors duration-200 group-hover:scale-105 transform origin-left">Diesel Generator</h2>
              <p className="text-green-600 font-semibold mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">3.5 kVA - 5 kVA</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200">
                Kirloskar Portable Diesel Genesis come from the house of Kirloskar, having more than
                seven decades of experience. Kirloskar Green and Kirloskar Chhota Chilli have over 1
                million Genesis in service across the globe.
              </p>
              <button className="self-start px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 group-hover:animate-pulse group-hover:shadow-md">
                Learn More <span className="inline-block ml-1 group-hover:translate-x-2 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="group flex flex-col md:flex-row bg-green-50 rounded-2xl shadow-xl overflow-hidden border-2 border-green-200 hover:border-green-400 hover:shadow-2xl transition-all duration-200 active:scale-[0.98] hover:-translate-y-2">
            {/* Image with strong hover effect */}
            <div className="md:w-1/2 flex justify-center items-center p-4 relative">
              <div className="absolute inset-0 bg-green-200 rounded-full opacity-0 group-hover:opacity-30 blur-lg scale-90 group-hover:scale-110 transition-all duration-300"></div>
              <img
                src={generator2}
                alt="5-12.5 kVA Generator"
                className="h-48 w-auto object-contain transform group-hover:scale-110 transition-transform duration-300 rounded-3xl group-active:scale-105"
              />
            </div>
            <div className="md:w-1/2 p-6 flex flex-col justify-center">
              <h2 className="text-xl font-bold text-green-800 mb-1 group-hover:text-green-600 transition-colors duration-200 group-hover:scale-105 transform origin-left">Diesel Generator</h2>
              <p className="text-green-600 font-semibold mb-2 group-hover:scale-110 transition-transform duration-200 inline-block">5 kVA - 12.5 kVA</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 group-hover:text-gray-700 transition-colors duration-200">
                Unmatched space efficiency and best in class fuel efficiency with O2E technology. It
                offers Lowest maintenance and trouble free product with Kirloskar Air Cooled Engines.
              </p>
              <button className="self-start px-4 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 group-hover:animate-pulse group-hover:shadow-md">
                Learn More <span className="inline-block ml-1 group-hover:translate-x-2 transition-transform duration-200">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
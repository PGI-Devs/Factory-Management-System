import React from 'react';
import icon1 from '../assets/icon1.png';
import icon2 from '../assets/icon2.jpg';

const PurposeSection = () => {
  const features = [
    {
      icon: icon1,
      title: 'Powering Progress',
      description:
        'Reliable Kirloskar-backed solutions, delivered fast from our advanced facilities.',
    },
    {
      icon: icon2,
      title: 'Innovation That Thinks',
      description:
        'Our i-Green gensets offer remote monitoring, AMF panels, and smart design features.',
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-16 px-4 sm:px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Heading text */}
          <div>
  <p className="text-sm text-green-700 font-semibold mb-2 uppercase tracking-wide">About Us</p>
  <h2 className="text-3xl md:text-4xl font-extrabold leading-tight">
    <span className="block text-green-900">Powerline Group of Industries</span>
    <span className="block text-green-600">Trusted Power, Built for You</span>
  </h2>
</div>

          {/* Feature 1 */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 md:space-x-6 group transition-transform duration-300"
            >
              {/* Icon */}
              <div className="w-50 h-50 rounded-full overflow-hidden flex-shrink-0 bg-white shadow-md p-2 group-hover:scale-105 transition-transform duration-300">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Text */}
              <div className="group-hover:scale-105 transition-transform duration-300">
                <h3 className="text-xl font-bold text-green-900 mb-1">{feature.title}</h3>
                <p className="text-green-800 text-sm leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;

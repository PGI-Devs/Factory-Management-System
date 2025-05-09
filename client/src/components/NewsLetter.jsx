import React from 'react';
import { HiArrowRight } from 'react-icons/hi'; // Importing right arrow icon

const NewsLetter = () => {
  // Theme object to centralize styles and make it easier to modify colors and UI elements
  const theme = {
    primary: {
      bg: 'bg-emerald-600', // Background color for primary elements
      darkerBg: 'bg-emerald-800', // Darker background for hover or focus effects
      lightText: 'text-emerald-50', // Light text color for better contrast
      button: 'bg-emerald-500', // Button background color
      buttonHover: 'hover:bg-emerald-600', // Button hover background color
      focusRing: 'focus:ring-emerald-300' // Focus ring color when input or button is focused
    },
    accent: {
      gradientFrom: 'from-emerald-500', // Gradient starting color
      gradientVia: 'via-emerald-600', // Gradient middle color
      gradientTo: 'to-emerald-700' // Gradient ending color
    },
    white: 'text-white' // White text color
  };

  return (
    <section className='container mx-auto px-4 py-10'>
      {/* Main container with gradient background, rounded corners, shadow, and transition for hover effects */}
      <div className={`${theme.primary.bg} rounded-xl overflow-hidden relative group shadow-md transition-shadow duration-300`}>
        {/* Gradient background layer */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient effect for larger screens with transition for opacity */}
          <div className={`absolute inset-0 bg-gradient-to-r ${theme.accent.gradientFrom} ${theme.accent.gradientTo} opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500`}></div>
          {/* Slanted background shape for larger screens */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-800 clip-path-slant hidden md:block"></div>
        </div>

        {/* Main content section */}
        <div className='relative md:px-12 px-6 py-12 z-10'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-6'>
            {/* Text section with a heading and description */}
            <div className={`${theme.white} text-center md:text-left max-w-lg`}>
              <h2 className='text-2xl sm:text-3xl font-bold mb-2'>Stay Updated</h2>
              <p className={`${theme.primary.lightText} text-sm sm:text-base`}>
                Join our community for exclusive insights and offers.
              </p>
            </div>

            {/* Form section for email input */}
            <form className='w-full max-w-md'>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-0'>
                {/* Email input field */}
                <input 
                  id="email"  // Associating the label with this input field
                  type="email" // Setting input type to email for proper validation
                  placeholder="Your email address" // Placeholder text
                  className="w-full sm:w-auto md:w-72 px-4 py-3 rounded-md sm:rounded-l-md sm:rounded-r-none bg-white/90 text-emerald-900 placeholder-emerald-400/70 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-300 transition-all duration-200"
                  required // Marking this field as required
                  aria-required="true" // Accessibility attribute to specify the input is required
                />
                {/* Submit button for subscribing */}
                <button
                  type="submit"  // The button will trigger form submission
                  className={`${theme.primary.button} ${theme.white} ${theme.primary.buttonHover} w-full sm:w-auto px-6 py-3 rounded-md sm:rounded-l-none sm:rounded-r-md flex items-center justify-center gap-2 font-medium transition-all duration-200`}
                >
                  <span>Subscribe</span>  {/* Button label */}
                  <HiArrowRight className="size-5" aria-hidden="true" />  {/* Arrow icon */}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;

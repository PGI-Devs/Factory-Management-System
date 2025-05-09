import React from 'react';
import heroImage from "../assets/gen2.png"

const Hero = () => {
    return (
        <section id="home" className="w-full bg-white pt-32 pb-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center md:text-left md:flex-row md:justify-between md:items-center space-y-10 md:space-y-0">

                {/* Left Column */}
                <div className="w-full md:w-1/2 flex flex-col items-center md:items-start space-y-6">
                    {/* Badge */}
                    <div className="flex items-center gap-2 bg-green-50 text-green-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition cursor-pointer">
                        <span className="text-green-600">★</span>
                        North East India's Leading Kirloskar Generator Distributor
                    </div>

                    {/* Heading */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-900 leading-tight">
                        Powering Progress Across Sectors —
                        <br />
                        <span className="text-green-600 inline-block">
                            From Shops to Smart
                        </span>
                        <br />
                        Industries <span className="inline-block ml-2 animate-pulse">⚡</span>
                    </h1>

                    {/* Subtext */}
                    <p className="text-green-900 text-lg">
                        At Powerline Group of Industries, we deliver reliable, intelligent,
                        and eco-compliant generator solutions.
                    </p>
                    <div className="flex gap-3 max-w-md">
                        <input
                            type="text"
                            name=""
                            placeholder="send a message"
                            className="flex-1 px-6 py-4 border border-green-500 rounded-xl focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100 transition-alt hover:border-green-600 hover:ring-2 hover:ring-green-300"
                        />

                        <button className='bg-green-600 text-white px-8 py-4 rounded-xl hover:bg-green-800 cursor-pointer transition-all hover:shadow-lg hover:shadow-green-300'>➱</button>
                    </div>
                </div>

                {/* Right Column */}
                <div className="w-full md:w-1/2 mt-16 md:mt-0 pl-0 md:pl-12 flex justify-center">
                    <div className="relative">
                    <img 
                        src={heroImage}
                        alt="hero image"
                         className="rounded-lg relative z-10 animate-float hover:scale-[1.09] transition-transform duration-300"
/>

                    </div>
                </div>

            </div>
        </section>

    );
};

export default Hero;

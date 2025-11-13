import React from 'react';

const SplashScreen: React.FC = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-[#FFF8E1] z-[200] flex flex-col justify-center items-center transition-opacity duration-1000 ease-out overflow-hidden">
            <i className="fas fa-mug-hot text-8xl text-amber-900 mug-animation"></i>
            <h1 
                className="text-5xl md:text-7xl font-bold mb-4 font-script text-amber-900 mt-6 animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}
            >
                Chaaye Junction
            </h1>
            <p 
                className="text-xl md:text-2xl font-light tracking-widest uppercase animate-fade-in-up"
                style={{ animationDelay: '0.8s' }}
            >
                Freshness in Every Sip
            </p>
        </div>
    );
};

export default SplashScreen;
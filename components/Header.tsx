
import React, { useState, useEffect, useRef } from 'react';

interface HeaderProps {
    cartCount: number;
    onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick }) => {
    const [isCartPulsing, setIsCartPulsing] = useState(false);
    const prevCartCountRef = useRef(cartCount);

    useEffect(() => {
        // Only pulse if the new count is greater than the previous count
        if (cartCount > prevCartCountRef.current) {
            setIsCartPulsing(true);
            const timer = setTimeout(() => setIsCartPulsing(false), 500); // Animation duration
            return () => clearTimeout(timer);
        }
        // Update the ref to the current count for the next render
        prevCartCountRef.current = cartCount;
    }, [cartCount]);


    const handleCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        onCartClick();
    };

    return (
        <>
            <nav className="bg-amber-900 text-white shadow-lg sticky top-0 z-50">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <a href="#" className="flex items-center gap-2">
                        <i className="fas fa-mug-hot text-orange-400 text-2xl"></i>
                        <span className="font-bold text-xl tracking-wider">CHAAYE JUNCTION</span>
                    </a>
                    <div className="flex items-center gap-4">
                        <button onClick={handleCartClick} className="relative p-2">
                            <i className="fas fa-shopping-basket text-xl"></i>
                            {cartCount > 0 && (
                                <span className={`absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${isCartPulsing ? 'pulse' : ''}`}>
                                    {cartCount}
                                </span>
                            )}
                        </button>
                    </div>
                </div>
            </nav>

            <header className="chai-bg text-white py-24 text-center px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 font-script text-orange-400">Chaaye Junction</h1>
                <p className="text-xl md:text-2xl font-light tracking-widest uppercase mb-8">Freshness in Every Sip</p>
                <a href="#menu" className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 inline-block shadow-lg animate-bounce">
                    View Menu
                </a>
            </header>
        </>
    );
};

export default Header;
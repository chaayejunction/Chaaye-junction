
import React, { useState } from 'react';
import { MenuItem } from '../types';

interface MenuItemCardProps {
    item: MenuItem;
    onAddToCart: (item: { name: string; price: number }) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, onAddToCart }) => {
    const [added, setAdded] = useState(false);

    const handleAddClick = () => {
        onAddToCart(item);
        setAdded(true);
        setTimeout(() => setAdded(false), 1000);
    };

    return (
        <div className={`bg-white rounded-xl shadow-md p-5 card-hover border border-amber-50 transition duration-300 flex justify-between items-center relative overflow-hidden ${added ? 'flash-animation' : ''}`}>
            <div>
                <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.desc}</p>
                <span className="text-amber-700 font-bold">Rs. {item.price}</span>
            </div>
            <div className="flex flex-col items-end gap-2 z-10">
                <i className={`fas fa-${item.icon} text-amber-200 text-5xl absolute -right-3 -bottom-3 opacity-20 pointer-events-none`}></i>
                <button 
                    onClick={handleAddClick} 
                    disabled={added}
                    className={`text-sm px-4 py-2 rounded-lg font-semibold transition w-24 ${
                        added
                            ? 'bg-green-100 text-green-800'
                            : 'bg-amber-100 hover:bg-amber-200 text-amber-900'
                    }`}
                >
                    {added ? 'Added!' : 'Add +'}
                </button>
            </div>
        </div>
    );
};

export default MenuItemCard;

import React, { useState, useMemo } from 'react';
import { MenuData, MenuItem } from '../types';
import MenuItemCard from './MenuItemCard';

interface MenuProps {
    menuData: MenuData;
    onAddToCart: (item: { name: string; price: number }) => void;
}

const Menu: React.FC<MenuProps> = ({ menuData, onAddToCart }) => {
    const [searchQuery, setSearchQuery] = useState('');

    const allItems = useMemo(() => [
        ...menuData.chai,
        ...menuData.coffee,
        ...menuData.snacks
    ], [menuData]);

    const filteredItems = useMemo(() => {
        if (searchQuery.length < 2) return [];
        const query = searchQuery.toLowerCase().trim();
        return allItems.filter(item =>
            item.name.toLowerCase().includes(query) ||
            item.desc.toLowerCase().includes(query)
        );
    }, [searchQuery, allItems]);

    const showSearchResults = searchQuery.length >= 2;

    return (
        <>
            <div className="relative mb-8 md:w-1/2 mx-auto">
                 <input 
                    type="text" 
                    id="search-input" 
                    placeholder="Search menu..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white text-gray-800 placeholder-gray-400 rounded-full py-3 px-6 w-full focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-md"
                />
                <i className="fas fa-search absolute right-5 top-3.5 text-gray-400"></i>
            </div>

            {showSearchResults && (
                <div id="search-results" className="mb-12">
                    <div className="flex items-center gap-3 mb-6 border-b-2 border-amber-200 pb-2">
                        <i className="fas fa-search text-amber-700 text-3xl"></i>
                        <h2 className="text-3xl font-bold text-amber-900">Search Results</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredItems.length > 0 ? (
                            filteredItems.map(item => <MenuItemCard key={item.name} item={item} onAddToCart={onAddToCart} />)
                        ) : (
                            <p className="text-gray-500 col-span-3 text-center py-8">No items found matching your search.</p>
                        )}
                    </div>
                </div>
            )}
            
            <div className={`${showSearchResults ? 'hidden' : 'block'}`}>
                <MenuCategory title="Chaaye Variants" icon="mug-hot" items={menuData.chai} onAddToCart={onAddToCart} />
                <MenuCategory title="Coffee" icon="coffee" items={menuData.coffee} onAddToCart={onAddToCart} />
                <MenuCategory title="Desserts & Snacks" icon="cookie-bite" items={menuData.snacks} onAddToCart={onAddToCart} />
            </div>
        </>
    );
};

interface MenuCategoryProps {
    title: string;
    icon: string;
    items: MenuItem[];
    onAddToCart: (item: { name: string; price: number }) => void;
}

const ITEMS_PER_PAGE = 6;

const MenuCategory: React.FC<MenuCategoryProps> = ({ title, icon, items, onAddToCart }) => {
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
    };

    const visibleItems = items.slice(0, visibleCount);
    const hasMoreItems = items.length > visibleCount;

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3 mb-6 border-b-2 border-amber-200 pb-2">
                <i className={`fas fa-${icon} text-amber-700 text-3xl`}></i>
                <h2 className="text-3xl font-bold text-amber-900">{title}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleItems.map(item => (
                    <MenuItemCard key={item.name} item={item} onAddToCart={onAddToCart} />
                ))}
            </div>
            {hasMoreItems && (
                 <div className="text-center mt-8">
                    <button 
                        onClick={handleLoadMore}
                        className="bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold py-3 px-8 rounded-full transition duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
};


export default Menu;
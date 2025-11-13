
import React from 'react';
import { restaurantPhone, creatorInfo } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer className="bg-amber-900 text-amber-100 py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl font-script mb-2">Chaaye Junction</h2>
                <p className="mb-4 text-sm opacity-80">Freshness in Every Sip</p>
                <div className="flex justify-center gap-4 mb-4">
                    <a href={`tel:${restaurantPhone.replace(/\s/g, '')}`} className="hover:text-white transition">
                        <i className="fas fa-phone"></i> {restaurantPhone}
                    </a>
                </div>
                <hr className="border-t border-amber-700 w-1/4 mx-auto my-4"/>
                <div className="text-xs opacity-70">
                    <p>Created By: <strong>{creatorInfo.name}</strong></p>
                    <p>Contact: <strong>{creatorInfo.contact}</strong></p>
                </div>
                <div className="text-xs opacity-50 mt-4">
                    &copy; {new Date().getFullYear()} Chaaye Junction. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;

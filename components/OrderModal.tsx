import React, { useState } from 'react';
import { CustomerDetails } from '../types';

interface OrderModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (details: CustomerDetails) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, onConfirm }) => {
    const [details, setDetails] = useState<CustomerDetails>({ name: '', address: '', phone: '', instructions: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setDetails({ ...details, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!details.name || !details.address || !details.phone) {
            // A simple alert for now, could be replaced with a more elegant message
            alert("Please fill in all required fields.");
            return;
        }
        onConfirm(details);
        setDetails({ name: '', address: '', phone: '', instructions: '' }); // Reset form
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-amber-900">Delivery Details</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
                </div>
                <form id="order-form" onSubmit={handleSubmit}>
                    <div className="mb-4 animate-scale-in" style={{ animationDelay: '0.1s' }}>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name*</label>
                        <input type="text" id="name" value={details.name} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900" required />
                    </div>
                    <div className="mb-4 animate-scale-in" style={{ animationDelay: '0.2s' }}>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">Delivery Address*</label>
                        <textarea id="address" rows={3} value={details.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900" required></textarea>
                    </div>
                    <div className="mb-4 animate-scale-in" style={{ animationDelay: '0.3s' }}>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number*</label>
                        <input type="tel" id="phone" value={details.phone} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900" required />
                    </div>
                    <div className="mb-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
                        <label htmlFor="instructions" className="block text-sm font-medium text-gray-700">Special Instructions (Optional)</label>
                        <input type="text" id="instructions" value={details.instructions} onChange={handleChange} placeholder="e.g., less sugar, extra spicy" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500 bg-white text-gray-900" />
                    </div>
                    <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition animate-scale-in" style={{ animationDelay: '0.5s' }}>
                        <i className="fab fa-whatsapp text-xl"></i> Confirm & Send Order
                    </button>
                </form>
            </div>
        </div>
    );
};

export default OrderModal;
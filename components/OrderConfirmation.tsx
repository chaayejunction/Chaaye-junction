
import React from 'react';
import { creatorInfo } from '../constants';

const OrderConfirmation: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-[199] flex justify-center items-center flex-col transition-opacity duration-500">
            <i className="fas fa-check-circle text-green-500 text-8xl mb-4 checkmark-pop"></i>
            <h2 className="text-3xl font-bold text-gray-800">Order Confirmed!</h2>
            <p className="text-lg text-gray-600 mb-6">Your order is on its way.</p>
            <div className="bg-gray-100 p-4 rounded text-center text-sm text-gray-500">
                <p>Created By: {creatorInfo.name}</p>
                <p>Contact: {creatorInfo.contact}</p>
            </div>
        </div>
    );
};

export default OrderConfirmation;

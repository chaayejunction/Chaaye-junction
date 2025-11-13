
import React from 'react';
import { Cart } from '../types';

interface CartSheetProps {
    isOpen: boolean;
    cart: Cart;
    onToggle: () => void;
    onUpdateQuantity: (name: string, newQty: number) => void;
    onOpenOrderModal: () => void;
    onDownloadPdf: () => void;
}

const CartSheet: React.FC<CartSheetProps> = ({ isOpen, cart, onToggle, onUpdateQuantity, onOpenOrderModal, onDownloadPdf }) => {
    // FIX: Use Object.keys to ensure proper type inference for cart items.
    const cartItemNames = Object.keys(cart);
    const total = cartItemNames.reduce((sum, name) => sum + cart[name].price * cart[name].qty, 0);

    return (
        <div className={`fixed bottom-0 left-0 w-full bg-white shadow-[0_-5px_20px_rgba(0,0,0,0.2)] transform transition-transform duration-300 z-40 rounded-t-2xl ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
            <div className="p-4 max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-amber-900">Your Order</h3>
                    <button onClick={onToggle} className="text-gray-500 hover:text-red-500 flex items-center gap-1">
                        <i className="fas fa-chevron-down"></i> Close
                    </button>
                </div>
                
                <div id="cart-items" className="max-h-60 overflow-y-auto mb-4 text-sm">
                    {cartItemNames.length === 0 ? (
                        <p className="text-gray-400 italic text-center py-2">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-3">
                            {/* FIX: Iterate using Object.keys to ensure proper type inference for cart items. */}
                            {cartItemNames.map((name) => {
                                const item = cart[name];
                                return (
                                <li key={name} className="flex justify-between items-center border-b border-dashed border-gray-200 pb-2">
                                    <div className="flex-1">
                                        <span className="text-gray-700 font-medium">{name}</span>
                                        <span className="text-xs text-gray-500 block">Rs. {item.price} each</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => onUpdateQuantity(name, item.qty - 1)} className="text-gray-500 hover:text-red-500 text-sm px-2 border border-gray-300 rounded"><i className="fas fa-minus"></i></button>
                                        <span className="text-gray-900 font-bold mx-1">{item.qty}</span>
                                        <button onClick={() => onUpdateQuantity(name, item.qty + 1)} className="text-gray-500 hover:text-green-500 text-sm px-2 border border-gray-300 rounded"><i className="fas fa-plus"></i></button>
                                        <span className="text-gray-900 font-bold ml-2 w-16 text-right">Rs. {item.price * item.qty}</span>
                                    </div>
                                </li>
                                );
                            })}
                        </ul>
                    )}
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-center border-t pt-4 gap-4">
                    <div className="flex gap-4 items-center">
                         <span className="text-gray-600">Total:</span>
                         <span id="cart-total" className="text-2xl font-bold text-amber-900">Rs. {total}</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                         <button onClick={onDownloadPdf} className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition flex-1 sm:flex-none">
                            <i className="fas fa-file-pdf"></i> Bill PDF
                        </button>
                        <button onClick={onOpenOrderModal} className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transition flex-1 sm:flex-none">
                            <i className="fab fa-whatsapp text-xl"></i> Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartSheet;

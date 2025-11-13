
import React, { useState, useEffect, useCallback } from 'react';
import { menuData, phoneNumber, restaurantPhone, creatorInfo } from './constants';
import { Cart, CustomerDetails, Message } from './types';
import SplashScreen from './components/SplashScreen';
import Header from './components/Header';
import Menu from './components/Menu';
import CartSheet from './components/CartSheet';
import OrderModal from './components/OrderModal';
import OrderConfirmation from './components/OrderConfirmation';
import MessageBox from './components/MessageBox';
import Footer from './components/Footer';

// Extend the Window interface to include jspdf for TypeScript
declare global {
    interface Window {
        jspdf: any;
    }
}

const App: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState<Cart>({});
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
    const [showOrderConfirmed, setShowOrderConfirmed] = useState(false);
    const [message, setMessage] = useState<Message | null>(null);
    const [customerDetails, setCustomerDetails] = useState<CustomerDetails>({ name: '', address: '', phone: '', instructions: '' });

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2500);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('chaayeJunctionCart');
            if (savedCart) {
                setCart(JSON.parse(savedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, []);

    useEffect(() => {
        try {
            localStorage.setItem('chaayeJunctionCart', JSON.stringify(cart));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [cart]);

    const showMessage = useCallback((text: string, isError: boolean = false) => {
        setMessage({ text, isError });
        setTimeout(() => setMessage(null), 3000);
    }, []);

    const handleAddToCart = (item: { name: string; price: number }) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newCart[item.name]) {
                newCart[item.name].qty += 1;
            } else {
                newCart[item.name] = { price: item.price, qty: 1 };
            }
            return newCart;
        });
        // Removed setIsCartOpen(true) to stop the cart from auto-opening.
    };

    const handleUpdateQuantity = (name: string, newQty: number) => {
        setCart(prevCart => {
            const newCart = { ...prevCart };
            if (newQty <= 0) {
                delete newCart[name];
            } else {
                newCart[name].qty = newQty;
            }
            return newCart;
        });
    };
    
    const handleConfirmOrder = (details: CustomerDetails) => {
        setCustomerDetails(details);
        
        let total = 0;
        
        const itemsList = Object.keys(cart).map(itemName => {
            const item = cart[itemName];
            const itemTotal = item.price * item.qty;
            total += itemTotal;
            return `• ${item.qty}x ${itemName}\n  (Rs. ${item.price} × ${item.qty} = *Rs. ${itemTotal}*)`;
        }).join('\n');
        
        const instructions = details.instructions ? details.instructions : "None";
        const separator = '────────────────';

        // Rebuilding the message string to exactly match the user's provided format.
        let messageText = `☕ *CHAAYE JUNCTION ORDER* ☕\n\n`;
        
        messageText += `*Order Details:*\n`;
        messageText += `${separator}\n`;
        messageText += `${itemsList}\n\n`;
        
        messageText += `${separator}\n`;
        messageText += `*Grand Total: Rs. ${total}*\n\n`;
        
        messageText += `*Customer Information:*\n`;
        messageText += `🧑 Name: ${details.name}\n`;
        messageText += `📞 Phone: ${details.phone}\n`;
        messageText += `🏠 Address: ${details.address}\n`;
        messageText += `📝 Instructions: ${instructions}\n\n`;
        
        messageText += `⏰ *Delivery Instructions:*\n`;
        messageText += `Please confirm order and delivery time.\n\n`;
        
        messageText += `Thank you! ☺\n`;
        messageText += `${separator}\n`;
        messageText += `_Digital Menu by ${creatorInfo.name} (${creatorInfo.contact})_`;

        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(messageText)}`;
        window.open(url, '_blank');

        setShowOrderConfirmed(true);
        setTimeout(() => setShowOrderConfirmed(false), 3000);

        setCart({});
        setIsOrderModalOpen(false);
        setIsCartOpen(false);
    };

    const handleDownloadPdf = useCallback(() => {
        if (Object.keys(cart).length === 0) {
            showMessage("Please add items to your cart first!", true);
            return;
        }

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            const customerName = customerDetails.name || "Guest User";
            const orderId = `CJ-${Math.floor(100000 + Math.random() * 900000)}`;
            const date = new Date().toLocaleString('en-US', {
                year: 'numeric', month: '2-digit', day: '2-digit',
                hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
            });
            let total = 0;
            let y = 75; // Starting y position for the table header

            // --- WATERMARK ---
            doc.saveGraphicsState();
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(50);
            doc.setTextColor(235, 235, 235); // Light grey color
            doc.text("Chaaye Junction", 105, 180, { angle: -30, align: 'center' });
            doc.restoreGraphicsState();
            
            // --- HEADER ---
            const headerColor = '#6D4C41'; // A dark brown color
            doc.setFillColor(headerColor);
            doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(18);
            doc.text("CJ CHAAYE JUNCTION", 20, 18);
            
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text("Freshness in Every Sip", 190, 15, { align: 'right' });
            doc.text(restaurantPhone, 190, 21, { align: 'right' });

            // --- INVOICE INFO ---
            doc.setTextColor(0, 0, 0);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(16);
            doc.text("INVOICE", 20, 50);

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            doc.text(`Order ID: ${orderId}`, 20, 58);
            doc.text(`Bill To: ${customerName}`, 20, 63);
            
            doc.text(`Date: ${date}`, 190, 58, { align: 'right' });

            // --- TABLE HEADER ---
            doc.setFillColor('#F3F4F6'); // Light gray background
            doc.rect(20, y - 5, 170, 8, 'F');
            
            doc.setFont('helvetica', 'bold');
            doc.text("Item", 25, y);
            doc.text("Qty", 120, y, { align: 'right' });
            doc.text("Price", 155, y, { align: 'right' });
            doc.text("Total", 190, y, { align: 'right' });
            y += 10;

            // --- TABLE ITEMS ---
            doc.setFont('helvetica', 'normal');
            for (const name of Object.keys(cart)) {
                const item = cart[name];
                const itemTotal = item.price * item.qty;
                total += itemTotal;
                
                doc.text(name, 25, y);
                doc.text(item.qty.toString(), 120, y, { align: 'right' });
                doc.text(`Rs. ${item.price}`, 155, y, { align: 'right' });
                doc.text(`Rs. ${itemTotal}`, 190, y, { align: 'right' });
                y += 7;
                
                if (y > 250) { // Page break logic
                    doc.addPage();
                    y = 30; 
                    doc.saveGraphicsState();
                    doc.setFont('helvetica', 'bold');
                    doc.setFontSize(50);
                    doc.setTextColor(235, 235, 235);
                    doc.text("Chaaye Junction", 105, 180, { angle: -30, align: 'center' });
                    doc.restoreGraphicsState();
                }
            }

            // --- TOTAL ---
            y += 5;
            doc.setDrawColor(0, 0, 0);
            doc.line(125, y, 190, y);
            y += 7;
            
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(12);
            doc.text("GRAND TOTAL", 125, y);
            doc.text(`Rs. ${total}`, 190, y, { align: 'right' });
            
            // --- FOOTER ---
            const pageHeight = doc.internal.pageSize.height;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8);
            const footerY = pageHeight - 15;
            doc.text("Thank you for your order! Payment is due upon delivery.", 105, footerY, { align: 'center' });
            doc.text(`Created By: ${creatorInfo.name} | Contact: ${creatorInfo.contact}`, 105, footerY + 5, { align: 'center' });

            doc.save(`ChaayeJunction_Invoice_${orderId}.pdf`);
            showMessage("PDF Invoice download started.");

        } catch (e) {
            showMessage("Failed to generate PDF. See console for details.", true);
            console.error("PDF Generation Error:", e);
        }
    }, [cart, customerDetails.name, showMessage]);

    // FIX: Use Object.keys to ensure proper type inference when calculating cart count.
    const cartCount = Object.keys(cart).reduce((sum, itemName) => sum + cart[itemName].qty, 0);

    if (isLoading) {
        return <SplashScreen />;
    }

    return (
        <div className="text-gray-800 flex flex-col min-h-screen">
            <Header cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
            
            <main id="menu" className="container mx-auto px-4 py-12 flex-grow">
                <Menu menuData={menuData} onAddToCart={handleAddToCart} />
            </main>

            <CartSheet 
                isOpen={isCartOpen}
                cart={cart}
                onToggle={() => setIsCartOpen(prev => !prev)}
                onUpdateQuantity={handleUpdateQuantity}
                onOpenOrderModal={() => {
                    if (Object.keys(cart).length === 0) {
                        showMessage("Please add items to your cart first!", true);
                        return;
                    }
                    setIsOrderModalOpen(true);
                    setIsCartOpen(false);
                }}
                onDownloadPdf={handleDownloadPdf}
            />

            <OrderModal 
                isOpen={isOrderModalOpen}
                onClose={() => setIsOrderModalOpen(false)}
                onConfirm={handleConfirmOrder}
            />

            {showOrderConfirmed && <OrderConfirmation />}
            
            {message && <MessageBox message={message.text} isError={message.isError} />}

            <Footer />
        </div>
    );
};

export default App;


import React, { useState, useEffect } from 'react';

interface MessageBoxProps {
    message: string;
    isError?: boolean;
}

const MessageBox: React.FC<MessageBoxProps> = ({ message, isError }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 2700); // Slightly shorter than App's timeout
            return () => clearTimeout(timer);
        }
    }, [message]);

    return (
        <div 
            className={`fixed top-4 right-4 text-white py-3 px-6 rounded-lg shadow-xl z-[200] transition-opacity duration-300 ease-in-out ${
                isError ? 'bg-red-500' : 'bg-green-500'
            } ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
            {message}
        </div>
    );
};

export default MessageBox;


export interface MenuItem {
    name: string;
    price: number;
    desc: string;
    icon: string;
}

export interface MenuCategory {
    title: string;
    icon: string;
    items: MenuItem[];
}

export interface MenuData {
    chai: MenuItem[];
    coffee: MenuItem[];
    snacks: MenuItem[];
}

export interface CartItem {
    price: number;
    qty: number;
}

export interface Cart {
    [name: string]: CartItem;
}

export interface CustomerDetails {
    name: string;
    address: string;
    phone: string;
    instructions?: string;
}

export interface Message {
    text: string;
    isError: boolean;
}

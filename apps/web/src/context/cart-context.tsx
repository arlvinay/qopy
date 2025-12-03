"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGuestId } from '@/lib/guest-auth';
import { v4 as uuidv4 } from 'uuid';
import { getPdfPageCount } from '@/lib/pdf-utils';

export type PrintOptions = {
    copies: number;
    sides: 'single' | 'double';
    density: 'light' | 'normal' | 'dark';
    pagesPerPage: 1 | 2 | 4;
    binding: boolean;
};

export type FileItem = {
    id: string;
    file: File;
    preview?: string;
    pageCount: number;
    status: 'uploading' | 'ready' | 'error';
    progress: number;
    options: PrintOptions;
};

type CartContextType = {
    files: FileItem[];
    addFiles: (newFiles: File[]) => Promise<void>;
    removeFile: (id: string) => void;
    updateFileOptions: (id: string, options: Partial<PrintOptions>) => void;
    totalPrice: number;
    clearCart: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_OPTIONS: PrintOptions = {
    copies: 1,
    sides: 'single',
    density: 'normal',
    pagesPerPage: 1,
    binding: false,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<FileItem[]>([]);

    useEffect(() => {
        getGuestId();
    }, []);

    const addFiles = async (newFiles: File[]) => {
        const newItems: FileItem[] = [];

        for (const file of newFiles) {
            let pageCount = 1;
            if (file.type === 'application/pdf') {
                pageCount = await getPdfPageCount(file);
            }

            newItems.push({
                id: uuidv4(),
                file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
                pageCount,
                status: 'ready',
                progress: 100,
                options: { ...DEFAULT_OPTIONS },
            });
        }

        setFiles(prev => [...prev, ...newItems]);
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const updateFileOptions = (id: string, newOptions: Partial<PrintOptions>) => {
        setFiles(prev => prev.map(f =>
            f.id === id ? { ...f, options: { ...f.options, ...newOptions } } : f
        ));
    };

    const clearCart = () => setFiles([]);

    const calculateItemPrice = (item: FileItem) => {
        const { pageCount, options } = item;
        const { copies, sides, binding } = options;

        // Calculate sheets needed
        // Single side: 1 page = 1 sheet
        // Double side: 2 pages = 1 sheet
        const sheets = sides === 'double' ? Math.ceil(pageCount / 2) : pageCount;

        // Base cost: ₹2 per sheet
        const printingCost = sheets * 2 * copies;

        // Binding cost: ₹15 per copy (if selected)
        const bindingCost = binding ? 15 * copies : 0;

        return printingCost + bindingCost;
    };

    const totalPrice = files.reduce((acc, curr) => acc + calculateItemPrice(curr), 0);

    return (
        <CartContext.Provider value={{ files, addFiles, removeFile, updateFileOptions, totalPrice, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}

"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getGuestId } from '@/lib/guest-auth';
import { v4 as uuidv4 } from 'uuid';
import { getPdfPageCount } from '@/lib/pdf-utils';
import { getDocxPageCount } from '@/lib/docx-utils';

export type PrintOptions = {
    copies: number;
    sides: 'single' | 'double';
    density: 'lighter' | 'normal' | 'dark';
    pagesPerPage: 1 | 2 | 4 | 6 | 8;
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
    bindingKits: number;
    setBindingKits: (count: number) => void;
    guestId: string | null;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const DEFAULT_OPTIONS: PrintOptions = {
    copies: 1,
    sides: 'single',
    density: 'normal',
    pagesPerPage: 1,
};

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [files, setFiles] = useState<FileItem[]>([]);
    const [bindingKits, setBindingKits] = useState(0);
    const [guestId, setGuestIdState] = useState<string | null>(null);

    useEffect(() => {
        const id = getGuestId();
        setGuestIdState(id);
    }, []);

    const addFiles = async (newFiles: File[]) => {
        const newItems: FileItem[] = [];

        for (const file of newFiles) {
            let pageCount = 1;
            if (file.type === 'application/pdf') {
                pageCount = await getPdfPageCount(file);
            } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                pageCount = await getDocxPageCount(file);
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

    const clearCart = () => {
        setFiles([]);
        setBindingKits(0);
    };

    const calculateItemPrice = (item: FileItem) => {
        const { pageCount, options } = item;
        const { copies, sides, pagesPerPage } = options;

        // Calculate effective pages (pages per sheet)
        const effectivePages = Math.ceil(pageCount / pagesPerPage);

        // Calculate sheets needed
        // Single side: 1 page = 1 sheet
        // Double side: 2 pages = 1 sheet
        const sheets = sides === 'double' ? Math.ceil(effectivePages / 2) : effectivePages;

        // Base cost: ₹2 per sheet (regardless of single/double side as per user request)
        const printingCost = sheets * 2 * copies;

        return printingCost;
    };

    const totalPrice = files.reduce((total, item) => total + calculateItemPrice(item), 0) + (bindingKits * 15);

    return (
        <CartContext.Provider value={{
            files,
            addFiles,
            removeFile,
            updateFileOptions,
            totalPrice,
            clearCart,
            bindingKits,
            setBindingKits,
            guestId
        }}>
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

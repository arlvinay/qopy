"use client"

import React from 'react'
import { CartProvider } from '@/context/cart-context'
import { UploadInterface } from '@/components/upload-interface'

export default function DashboardPage() {
    return (
        <CartProvider>
            <UploadInterface />
        </CartProvider>
    )
}

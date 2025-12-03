"use client"

import React from 'react'
import { CartProvider } from '@/context/cart-context'
import { UploadInterface } from '@/components/upload-interface'
import { useParams } from 'next/navigation'

export default function PrinterUploadPage() {
    const params = useParams()
    const printerId = params.printerId as string

    // Mock data for now
    const printerStatus = 'online'
    const pagesLeft = 850

    return (
        <CartProvider>
            <UploadInterface
                headline="Upload Documents"
                subtext="Select files to print. We support PDF, DOCX, and Images."
                printerLocation={printerId}
                printerStatus={printerStatus}
                pagesLeft={pagesLeft}
            />
        </CartProvider>
    )
}

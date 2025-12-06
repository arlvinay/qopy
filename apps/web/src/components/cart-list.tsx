"use client"

import React, { useState } from 'react'
import { truncateFileName } from '@/lib/utils'
import { useCart } from '@/context/cart-context'
import { FileText, Trash2, CreditCard, Settings2, Plus, Minus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { PrintSettingsDialog } from "@/components/print-settings-dialog"
import Script from 'next/script'
import Image from "next/image"

export function CartList() {
    const { files, removeFile, totalPrice, updateFileOptions, bindingKits, setBindingKits, guestId } = useCart()
    const [editingFile, setEditingFile] = useState<string | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    // Calculate breakdown
    const bindingCost = bindingKits * 15
    const printingCost = totalPrice - bindingCost
    const totalSheets = Math.ceil(printingCost / 2)
    const totalCopies = files.reduce((acc, item) => acc + item.options.copies, 0)

    const handlePayment = async () => {
        if (!guestId) {
            alert("Guest ID not found. Please try refreshing the page.")
            return
        }

        setIsProcessing(true)
        try {
            // 1. Create Order
            const res = await fetch('http://localhost:3001/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: totalPrice, userId: guestId }),
            })

            if (!res.ok) throw new Error('Failed to create order')

            const data = await res.json()

            // 2. Open Razorpay
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder', // Replace with env var
                amount: data.amount,
                currency: data.currency,
                name: "Quick Copy Printing Service",
                description: "Print Job Payment",
                order_id: data.id,
                handler: function (response: any) {
                    alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`)
                    // TODO: Redirect to success page or clear cart
                },
                prefill: {
                    name: "Guest User",
                    email: "guest@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#10B981"
                }
            }

            const rzp1 = new (window as any).Razorpay(options)
            rzp1.open()
        } catch (error) {
            console.error('Payment failed:', error)
            alert('Payment failed. Please try again.')
        } finally {
            setIsProcessing(false)
        }
    }

    if (files.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                <p className="text-zinc-500">Your cart is empty. Upload files to get started.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-24 lg:pb-0">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="space-y-3">
                {files.map((item) => (
                    <div key={item.id} className="group flex items-center gap-4 p-4 bg-white rounded-xl border border-zinc-100 shadow-sm hover:shadow-md transition-all">
                        <div className="h-12 w-12 flex-shrink-0 rounded-lg bg-zinc-100 flex items-center justify-center overflow-hidden">
                            {item.preview ? (
                                <img src={item.preview} alt="Preview" className="h-full w-full object-cover" />
                            ) : (
                                <FileText className="h-6 w-6 text-zinc-400" />
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium text-zinc-900 truncate">{truncateFileName(item.file.name, 25)}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1">
                                <span>{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{item.pageCount} Pages</span>
                                <span className="hidden sm:inline">•</span>
                                <button
                                    onClick={() => updateFileOptions(item.id, { sides: item.options.sides === 'single' ? 'double' : 'single' })}
                                    className="hover:text-emerald-600 hover:underline transition-colors capitalize font-medium"
                                    title="Click to toggle sides"
                                >
                                    {item.options.sides} Side
                                </button>
                                <span className="hidden sm:inline">•</span>
                                <span>{item.options.pagesPerPage} on 1</span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 shrink-0"
                            onClick={() => setEditingFile(item.id)}
                        >
                            <Settings2 className="h-4 w-4" />
                        </Button>

                        <div className="text-right min-w-[50px] sm:min-w-[60px]">
                            <p className="text-sm font-medium text-zinc-900">
                                ₹{
                                    ((item.options.sides === 'double' ? Math.ceil(Math.ceil(item.pageCount / item.options.pagesPerPage) / 2) : Math.ceil(item.pageCount / item.options.pagesPerPage)) * 2 * item.options.copies)
                                }
                            </p>
                        </div>
                        <button
                            onClick={() => removeFile(item.id)}
                            className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        >
                            <Trash2 className="h-4 w-4" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Spiral Binding Kit Option (Moved to Scrollable Area) */}
            <div className="p-4 rounded-xl border-2 border-yellow-400 bg-yellow-50/50">
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 relative shrink-0 overflow-hidden rounded-lg">
                        <Image
                            src="/spiral-binding.png"
                            alt="Spiral Binding"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-zinc-900 text-sm">Add Spiral Binding Kit</h4>
                        <p className="text-xs text-zinc-600">₹15 per kit</p>
                    </div>
                    <div className="flex items-center gap-3 bg-white rounded-lg border border-yellow-200 p-1">
                        <button
                            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-yellow-50 text-yellow-700 disabled:opacity-50"
                            onClick={() => setBindingKits(Math.max(0, bindingKits - 1))}
                            disabled={bindingKits <= 0}
                        >
                            <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-zinc-900 w-4 text-center">{bindingKits}</span>
                        <button
                            className="h-8 w-8 flex items-center justify-center rounded-md bg-yellow-400 text-white hover:bg-yellow-500"
                            onClick={() => setBindingKits(bindingKits + 1)}
                        >
                            <Plus className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Sticky Footer for Mobile / Sidebar Content */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 lg:static lg:bg-transparent lg:border-none z-50">
                <div className="lg:bg-zinc-900 lg:text-white lg:rounded-2xl lg:shadow-lg lg:p-6 p-3 safe-area-bottom">

                    {/* Breakdown Section - Vertical Stack */}
                    <div className="mb-3 pb-3 border-b border-zinc-100 lg:border-zinc-700 flex flex-col gap-2 text-xs lg:text-sm">
                        <div className="flex justify-between text-zinc-600 lg:text-zinc-400">
                            <span>Sheets</span>
                            <span className="font-medium text-zinc-900 lg:text-white">{totalSheets}</span>
                        </div>
                        <div className="flex justify-between text-zinc-600 lg:text-zinc-400">
                            <span>Copies</span>
                            <span className="font-medium text-zinc-900 lg:text-white">{totalCopies}</span>
                        </div>
                        {bindingKits > 0 && (
                            <div className="flex justify-between text-zinc-600 lg:text-zinc-400">
                                <span>Binding</span>
                                <span className="font-medium text-zinc-900 lg:text-white">₹{bindingCost}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-zinc-600 lg:text-zinc-400">
                            <span>Print</span>
                            <span className="font-medium text-zinc-900 lg:text-white">₹{printingCost}</span>
                        </div>
                    </div>

                    <div className="container mx-auto flex items-center justify-between lg:block">
                        <div className="lg:mb-4 flex flex-col justify-center">
                            <p className="text-zinc-500 text-[10px] lg:text-zinc-400 lg:text-sm leading-tight">Total Amount</p>
                            <p className="text-lg font-bold text-zinc-900 lg:text-white lg:text-2xl leading-tight">₹{totalPrice}</p>
                        </div>
                        <button
                            onClick={handlePayment}
                            disabled={isProcessing}
                            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20 lg:w-full lg:justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <CreditCard className="h-4 w-4" />
                            <span className="hidden sm:inline">{isProcessing ? 'Processing...' : 'Pay & Print'}</span>
                            <span className="sm:hidden">{isProcessing ? '...' : 'Pay'}</span>
                        </button>
                    </div>
                </div>
            </div>
            {/* Print Settings Dialog */}
            {editingFile && (
                <PrintSettingsDialog
                    file={files.find(f => f.id === editingFile)!}
                    open={!!editingFile}
                    onOpenChange={(open) => !open && setEditingFile(null)}
                />
            )}
        </div>
    )
}

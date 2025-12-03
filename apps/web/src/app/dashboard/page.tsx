"use client"

import React from 'react'
import { FileUpload } from '@/components/file-upload'
import { useCart, CartProvider, PrintOptions } from '@/context/cart-context'
import { FileText, Trash2, Printer, CreditCard, Settings2, BookOpen, Copy, Layers } from 'lucide-react'
import Link from 'next/link'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

function PrintOptionsForm({ itemId, options }: { itemId: string, options: PrintOptions }) {
    const { updateFileOptions } = useCart()

    return (
        <div className="grid gap-4">
            <div className="space-y-2">
                <h4 className="font-medium leading-none">Print Settings</h4>
                <p className="text-sm text-muted-foreground">
                    Customize your print job.
                </p>
            </div>
            <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="copies">Copies</Label>
                    <Input
                        id="copies"
                        type="number"
                        min="1"
                        className="col-span-2 h-8"
                        value={options.copies}
                        onChange={(e) => updateFileOptions(itemId, { copies: parseInt(e.target.value) || 1 })}
                    />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="sides">Sides</Label>
                    <Select
                        value={options.sides}
                        onValueChange={(val: any) => updateFileOptions(itemId, { sides: val })}
                    >
                        <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Select sides" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="single">Single Side</SelectItem>
                            <SelectItem value="double">Double Side</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                    <Label htmlFor="density">Density</Label>
                    <Select
                        value={options.density}
                        onValueChange={(val: any) => updateFileOptions(itemId, { density: val })}
                    >
                        <SelectTrigger className="col-span-2 h-8">
                            <SelectValue placeholder="Select density" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between">
                    <Label htmlFor="binding" className="flex flex-col gap-1">
                        <span>Spiral Binding</span>
                        <span className="font-normal text-xs text-muted-foreground">+₹15/copy</span>
                    </Label>
                    <Switch
                        id="binding"
                        checked={options.binding}
                        onCheckedChange={(checked) => updateFileOptions(itemId, { binding: checked })}
                    />
                </div>
            </div>
        </div>
    )
}

function CartList() {
    const { files, removeFile, totalPrice } = useCart()

    if (files.length === 0) {
        return (
            <div className="text-center py-12 bg-zinc-50/50 rounded-xl border border-dashed border-zinc-200">
                <p className="text-zinc-500">Your cart is empty. Upload files to get started.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6 pb-24 lg:pb-0">
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
                            <h4 className="text-sm font-medium text-zinc-900 truncate">{item.file.name}</h4>
                            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500 mt-1">
                                <span>{(item.file.size / 1024 / 1024).toFixed(2)} MB</span>
                                <span className="hidden sm:inline">•</span>
                                <span>{item.pageCount} Pages</span>
                                <span className="hidden sm:inline">•</span>
                                <span className="capitalize">{item.options.sides} Side</span>
                                {item.options.binding && <span>• Binding</span>}
                            </div>
                        </div>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8 shrink-0">
                                    <Settings2 className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80" align="end">
                                <PrintOptionsForm itemId={item.id} options={item.options} />
                            </PopoverContent>
                        </Popover>

                        <div className="text-right min-w-[50px] sm:min-w-[60px]">
                            <p className="text-sm font-medium text-zinc-900">
                                ₹{
                                    ((item.options.sides === 'double' ? Math.ceil(item.pageCount / 2) : item.pageCount) * 2 * item.options.copies) +
                                    (item.options.binding ? 15 * item.options.copies : 0)
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

            {/* Sticky Footer for Mobile */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-200 lg:static lg:bg-zinc-900 lg:text-white lg:rounded-2xl lg:shadow-lg lg:p-6 lg:border-none z-40">
                <div className="container mx-auto flex items-center justify-between lg:block">
                    <div className="lg:mb-4">
                        <p className="text-zinc-500 text-xs lg:text-zinc-400 lg:text-sm">Total Amount</p>
                        <p className="text-xl font-bold text-zinc-900 lg:text-white lg:text-2xl">₹{totalPrice}</p>
                    </div>
                    <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-emerald-500/20 lg:w-full lg:justify-center">
                        <CreditCard className="h-4 w-4" />
                        <span className="hidden sm:inline">Pay & Print</span>
                        <span className="sm:hidden">Pay</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default function DashboardPage() {
    return (
        <CartProvider>
            <div className="min-h-screen bg-zinc-50 font-sans">
                <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <div className="flex items-center gap-2">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                                    <Printer className="h-5 w-5 text-white" />
                                </div>
                                <span className="text-xl font-bold tracking-tight text-zinc-900">Qopy</span>
                            </Link>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center border border-zinc-200">
                                <span className="text-xs font-medium text-zinc-600">G</span>
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 md:px-6 py-8 pb-32 lg:pb-8">
                    <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-2xl font-bold text-zinc-900">Upload Documents</h1>
                                <p className="text-zinc-500">Select files to print. We support PDF, DOCX, and Images.</p>
                            </div>
                            <FileUpload />
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h2 className="text-xl font-bold text-zinc-900">Print Queue</h2>
                                <p className="text-zinc-500">Review your files before payment.</p>
                            </div>
                            <CartList />
                        </div>
                    </div>
                </main>
            </div>
        </CartProvider>
    )
}

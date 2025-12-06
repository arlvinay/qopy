"use client"

import React from 'react'
import { FileItem, useCart, PrintOptions } from '@/context/cart-context'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Minus, Plus, FileText, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface PrintSettingsDialogProps {
    file: FileItem
    open: boolean
    onOpenChange: (open: boolean) => void
}

export function PrintSettingsDialog({ file, open, onOpenChange }: PrintSettingsDialogProps) {
    const { updateFileOptions } = useCart()
    const { options } = file

    // Helper to calculate price (duplicated logic for display, ideally shared)
    const calculatePrice = () => {
        const { pageCount, options } = file
        const { copies, sides, pagesPerPage } = options
        const effectivePages = Math.ceil(pageCount / pagesPerPage)
        const sheets = sides === 'double' ? Math.ceil(effectivePages / 2) : effectivePages
        const printingCost = sheets * 2 * copies
        return {
            sheets,
            printingCost,
            total: printingCost
        }
    }

    const price = calculatePrice()

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-zinc-50 gap-0 h-auto max-h-[100dvh] flex flex-col sm:block">
                <div className="flex flex-col lg:flex-row h-full lg:h-auto">
                    {/* Main Content */}
                    <div className="flex-1 p-4 overflow-y-auto lg:max-h-[80vh]">
                        <DialogHeader className="mb-2">
                            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                                <FileText className="h-6 w-6 text-emerald-600" />
                                Customize Your Print
                            </DialogTitle>
                            <p className="text-zinc-500 text-sm">
                                {file.file.name} • {file.pageCount} pages
                            </p>
                        </DialogHeader>

                        <div className="space-y-6">
                            {/* Paper Layout */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-zinc-900 text-sm">Paper Layout</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => updateFileOptions(file.id, { sides: 'single' })}
                                        className={cn(
                                            "relative p-3 rounded-xl border-2 text-left transition-all",
                                            options.sides === 'single'
                                                ? "border-emerald-600 bg-emerald-50/50"
                                                : "border-zinc-200 bg-white hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="font-medium text-zinc-900">Single Sided</div>
                                        <div className="text-sm text-zinc-500 mt-1">₹2/sheet</div>
                                        {options.sides === 'single' && (
                                            <div className="absolute top-4 right-4 text-emerald-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => updateFileOptions(file.id, { sides: 'double' })}
                                        className={cn(
                                            "relative p-3 rounded-xl border-2 text-left transition-all",
                                            options.sides === 'double'
                                                ? "border-emerald-600 bg-emerald-50/50"
                                                : "border-zinc-200 bg-white hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="font-medium text-zinc-900">Double Sided</div>
                                        <div className="text-sm text-zinc-500 mt-1">₹2/sheet</div>
                                        {options.sides === 'double' && (
                                            <div className="absolute top-4 right-4 text-emerald-600">
                                                <CheckCircle2 className="h-5 w-5" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Print Density */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-zinc-900 text-sm">Print Density</h3>
                                <div className="grid grid-cols-3 gap-2">
                                    <button
                                        onClick={() => updateFileOptions(file.id, { density: 'lighter' })}
                                        className={cn(
                                            "relative p-2 sm:p-3 rounded-xl border-2 text-left transition-all",
                                            options.density === 'lighter'
                                                ? "border-emerald-600 bg-emerald-50/50"
                                                : "border-zinc-200 bg-white hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="font-medium text-zinc-900 text-xs sm:text-base">Lighter</div>
                                        <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Save ink</div>
                                        {options.density === 'lighter' && (
                                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-emerald-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => updateFileOptions(file.id, { density: 'normal' })}
                                        className={cn(
                                            "relative p-2 sm:p-3 rounded-xl border-2 text-left transition-all",
                                            options.density === 'normal'
                                                ? "border-emerald-600 bg-emerald-50/50"
                                                : "border-zinc-200 bg-white hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="font-medium text-zinc-900 text-xs sm:text-base">Normal</div>
                                        <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Standard</div>
                                        {options.density === 'normal' && (
                                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-emerald-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => updateFileOptions(file.id, { density: 'dark' })}
                                        className={cn(
                                            "relative p-2 sm:p-3 rounded-xl border-2 text-left transition-all",
                                            options.density === 'dark'
                                                ? "border-emerald-600 bg-emerald-50/50"
                                                : "border-zinc-200 bg-white hover:border-zinc-300"
                                        )}
                                    >
                                        <div className="font-medium text-zinc-900 text-xs sm:text-base">Dark</div>
                                        <div className="text-[10px] sm:text-xs text-zinc-500 mt-0.5">Best quality</div>
                                        {options.density === 'dark' && (
                                            <div className="absolute top-1 right-1 sm:top-2 sm:right-2 text-emerald-600">
                                                <CheckCircle2 className="h-4 w-4" />
                                            </div>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Pages Per Sheet */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-zinc-900 text-sm">Pages Per Sheet (N-Up)</h3>
                                <div className="grid grid-cols-5 gap-2">
                                    {[1, 2, 4, 6, 8].map((num) => (
                                        <button
                                            key={num}
                                            onClick={() => updateFileOptions(file.id, { pagesPerPage: num as 1 | 2 | 4 | 6 | 8 })}
                                            className={cn(
                                                "relative p-1 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-center h-12 sm:h-14",
                                                options.pagesPerPage === num
                                                    ? "border-emerald-600 bg-emerald-50/50"
                                                    : "border-zinc-200 bg-white hover:border-zinc-300"
                                            )}
                                        >
                                            <div className="font-medium text-zinc-900 text-base sm:text-lg">{num}</div>
                                            <div className="text-[8px] sm:text-[10px] text-zinc-500 leading-none">{num === 1 ? 'Page' : `Pages`}</div>
                                            {options.pagesPerPage === num && (
                                                <div className="absolute top-0.5 right-0.5 text-emerald-600">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Number of Copies */}
                            <div className="space-y-2">
                                <h3 className="font-semibold text-zinc-900 text-sm">Number of Copies</h3>
                                <div className="flex items-center justify-between p-2 bg-white rounded-xl border border-zinc-200">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-lg bg-zinc-100 hover:bg-zinc-200"
                                        onClick={() => updateFileOptions(file.id, { copies: Math.max(1, options.copies - 1) })}
                                        disabled={options.copies <= 1}
                                    >
                                        <Minus className="h-4 w-4" />
                                    </Button>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-zinc-900">{options.copies}</div>
                                        <div className="text-xs text-zinc-500">copy</div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-10 w-10 rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
                                        onClick={() => updateFileOptions(file.id, { copies: options.copies + 1 })}
                                    >
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Footer */}
                    <div className="w-full lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-zinc-200 p-4 flex flex-col justify-between shrink-0">
                        <div className="space-y-3 sm:space-y-6">
                            <h3 className="font-bold text-zinc-900 text-sm sm:text-lg pt-2 sm:pt-4 border-t border-zinc-100">Price Summary</h3>

                            {/* Mobile: Horizontal Grid, Desktop: Vertical Stack */}
                            {/* Price Summary - Vertical Stack for all screens as per user request */}
                            <div className="flex flex-col gap-2 text-sm">
                                <div className="flex justify-between text-zinc-600">
                                    <span>Sheets</span>
                                    <span className="font-medium text-zinc-900">{price.sheets}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600">
                                    <span>Copies</span>
                                    <span className="font-medium text-zinc-900">{options.copies}</span>
                                </div>
                                <div className="flex justify-between text-zinc-600">
                                    <span>Cost</span>
                                    <span className="font-medium text-zinc-900">₹{price.printingCost}</span>
                                </div>
                            </div>

                            <div className="pt-2 sm:pt-3 border-t border-zinc-100 flex justify-between items-center">
                                <span className="font-bold text-zinc-900 text-sm sm:text-base">Total</span>
                                <span className="text-xl sm:text-3xl font-bold text-zinc-900">₹{price.total}</span>
                            </div>
                        </div>

                        <div className="mt-3 sm:mt-8">
                            <Button
                                className="w-full h-10 sm:h-12 text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200"
                                onClick={() => onOpenChange(false)}
                            >
                                Proceed
                            </Button>
                        </div>
                        <div className="hidden sm:flex mt-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100 items-center gap-2 text-xs text-emerald-700">
                            <CheckCircle2 className="h-4 w-4 shrink-0" />
                            Instant printing after payment
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
